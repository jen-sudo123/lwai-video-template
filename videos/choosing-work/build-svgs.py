# Builds src/compositions/choosing-work-svgs.ts from the user's SVGs in public/choosing-work/images/.
# Those files are dumping/all-svg-image-codes.txt split per slide, one element per line, with every
# base64 payload replaced by DATA (two embedded fonts + one shared lime texture, now public/choosing-work/pigment.jpg).
# Wraps source-line runs in <g data-r="key"> so the composition can reveal them on VO cues.
# Line numbers refer to those files (1-based). Usage: python3 build-svgs.py <images dir> <out.ts>
import json, os, re, sys
src_dir = sys.argv[1]; out = sys.argv[2]

FILES = ['01_start-with-a-workflow.svg', '02_post-meeting-follow-up.svg', '03_agentic-fit-check.svg', '04_smallest-workflow-worth-proving.svg']
LABELS = ['START WITH A WORKFLOW', 'AN EXAMPLE WORKFLOW', 'THE AGENTIC FIT CHECK', 'START SMALL']

# (start, end, key). key None drops the run: footers that only repeat on-slide text, and slide 3's
# bottom summary line + rule (user request).
SPECS = [
  [(21,21,'role'),(22,22,'q1'),(23,23,'q2'),(24,24,'broad'),(25,25,'wf'),(26,27,'c1'),(28,29,'c2'),(30,31,'c3'),(32,33,'cont'),
   (34,34,'cloud'),(35,35,'arr'),(36,36,'box'),(37,37,'c1'),(38,38,'c2'),(39,39,'c3'),(40,40,'ar1'),(41,41,'ar2'),(43,46,None)],
  [(17,17,'sub'),(21,21,'n1'),(22,23,'n2'),(24,25,'n3'),(26,27,'n4'),(28,30,'n5'),(31,31,'bl1'),(32,32,'bl2'),(33,33,'box'),
   (34,38,'n1'),(39,43,'n2'),(44,48,'n3'),(49,52,'n4'),(53,53,'a1'),(54,54,'a2'),(55,55,'a3'),(56,56,'dia'),(57,57,'a4'),
   (58,58,'dia'),(59,59,'dn'),(60,63,'person'),(65,68,None)],
  [(17,17,'sub'),(21,21,'top'),(22,22,'g'),(23,23,'e'),(24,24,'d'),(25,25,'r'),(26,26,'t'),(27,27,'three'),(28,28,'b1'),(29,31,'b1t'),
   (32,32,'t1'),(33,35,'t1t'),(36,36,'f1'),(37,38,'f1t'),(39,39,None),(40,40,'g'),(41,41,'e'),(42,42,'d'),(43,43,'r'),(44,44,'t'),
   (45,45,'arr'),(46,46,None),(48,51,None)],
  [(21,21,'bw'),(22,22,'mcr'),(23,23,'sm'),(24,24,'spec'),(25,25,'doc1'),(26,26,'chk'),(27,27,'doc2'),(28,29,'tm'),(30,31,'pass'),
   (32,42,'graph'),(43,43,'arr'),(44,44,'box'),(45,49,'doc1'),(50,50,'ar1'),(51,52,'chk'),(53,53,'ar2'),(54,58,'doc2'),(59,59,'loop'),
   (61,64,'tag')],
]

# The GED-RT circles on slide 3 are drawn empty; put each initial inside its circle.
GEDRT = {'167': 'G', '473': 'E', '779': 'D', '1085': 'R', '1391': 'T'}

result = []
for idx, (name, runs) in enumerate(zip(FILES, SPECS), 1):
    L = open(os.path.join(src_dir, name)).read().rstrip('\n').split('\n')
    starts = {s: (e, k) for s, e, k in runs}
    parts, n = [], 1
    while n <= len(L):
        if n in starts:
            e, k = starts[n]
            if k is not None:
                parts.append(f'<g data-r="{k}">' + '\n'.join(L[n - 1:e]) + '</g>')
            n = e + 1
        else:
            parts.append(L[n - 1]); n += 1
    s = '\n'.join(parts)
    s = re.sub(r'<title[^>]*>.*?</title>\n?|<desc[^>]*>.*?</desc>\n?', '', s)
    s = re.sub(r' role="img"| aria-labelledby="[^"]*"| data-text="true"', '', s)
    s = re.sub(r'<g id="(header|diagram|footer)">', '<g>', s)
    # 1600×1000 slide centred in the 1920×1080 frame (scale 1.08), white side bands
    s = s.replace('width="1600" height="1000" viewBox="0 0 1600 1000"', 'width="1920" height="1080" viewBox="-88.89 0 1777.78 1000"', 1)
    s = s.replace('<rect width="1600" height="1000" fill="white"/>', '<rect x="-89" width="1778" height="1000" fill="white"/>')
    # Brand fonts come from @remotion/google-fonts, so the embedded copies go; selectors are scoped to this slide
    s = re.sub(r"@font-face\{[^}]*\}", '', s)
    s = re.sub(r'(^|\})(text|\.body|\.serif|\.muted|\.ink|\.paint)\{', lambda m: f'{m.group(1)}.cw-s{idx} {m.group(2)}{{', s, flags=re.M)
    s = s.replace('<style>text{', f'<style>.cw-s{idx} text{{')
    s = s.replace('xlink:href="DATA"', 'xlink:href="__PIGMENT__"')
    s = s.replace('id="arrow"', f'id="s{idx}-arrow"').replace('id="pigment"', f'id="s{idx}-pigment"')
    s = s.replace('url(#arrow)', f'url(#s{idx}-arrow)').replace('url(#pigment)', f'url(#s{idx}-pigment)')
    assert 'DATA' not in s, idx
    # Template chrome: tracked grey top label, and the kept footer tagline sits right-aligned,
    # level with the LWAI logo (LogoFooter); the drawn footer rule goes.
    s = s.replace('<g>\n<text x="64" y="150"',
                  f'<text x="64" y="58" font-size="21" font-weight="600" letter-spacing="2.6" class="body" style="fill:#888888">{LABELS[idx - 1]}</text>\n<g>\n<text x="64" y="150"', 1)
    s = re.sub(r'<text x="64" y="963" font-size="23" class="muted" text-anchor="start">', '<text x="1536" y="934" font-size="23" class="muted" text-anchor="end">', s)
    s = s.replace('<path d="M64 916H1536" stroke="#ddd"/>\n', '')
    if idx == 3:
        s = re.sub(r'<circle cx="(\d+)" cy="385" r="35" class="paint"/>',
                   lambda m: m.group(0) + f'<text x="{m.group(1)}" y="397" font-size="34" class="serif" text-anchor="middle">{GEDRT[m.group(1)]}</text>', s)
    assert s.count('<g') == s.count('</g>'), idx
    result.append(s)

# Slide 3 first pass (index 4, scope cw-s5): the GED-RT row alone, enlarged and centred in the space below
# the header so the half-empty slide reads balanced (user request). Same reveal keys as slide 3.
s3 = result[2]
head = s3[:s3.index('<g data-r="top">')].replace('cw-s3', 'cw-s5').replace('s3-', 's5-')
row = ['<g data-r="top"><text x="800" y="420" font-size="44" class="serif" text-anchor="middle">start with a strong GED-RT workflow</text></g>']
for (cx, letter), label, key in zip(GEDRT.items(), ['General', 'Error-friendly', 'Digital', 'Repetitive', 'Toil'], 'gedrt'):
    row.append(f'<g data-r="{key}"><circle cx="{cx}" cy="580" r="62" class="paint"/>'
               f'<text x="{cx}" y="599" font-size="54" class="serif" text-anchor="middle">{letter}</text>'
               f'<text x="{cx}" y="704" font-size="34" class="body" text-anchor="middle">{label}</text></g>')
result.append(head + '\n'.join(row) + '\n</g>\n</svg>')
assert result[4].count('<g') == result[4].count('</g>')

with open(out, 'w') as f:
    f.write('// Generated by videos/choosing-work/build-svgs.py from the user-supplied SVGs (dumping/all-svg-image-codes.txt).\n')
    f.write('// Reveal groups are <g data-r="key"> wrappers; __PIGMENT__ is swapped for the texture URL at runtime. Do not hand-edit.\n\n')
    f.write('export const CHOOSING_WORK_SVGS: string[] = ' + json.dumps(result, indent=2) + ';\n')
print('ok', [r.count('data-r') for r in result])
