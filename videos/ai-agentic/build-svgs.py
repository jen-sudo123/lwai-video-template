# Builds src/compositions/ai-agentic-svgs.ts from dumping/all-svg-codes.txt.
# Wraps contiguous source-line runs in <g data-r="key"> so the composition can reveal them on VO cues.
# Line numbers refer to dumping/all-svg-codes.txt (1-based).
import json, os, re, sys
src = sys.argv[1]; out = sys.argv[2]
L = open(src).read().split('\n')
line = lambda n: L[n - 1]

SPECS = [
  (11, 68, [(25,28,'h'),(29,33,'ins'),(34,38,'files'),(39,44,'skills'),(45,45,'ins'),(46,46,'files'),(47,47,'skills'),
            (48,56,'ai'),(57,57,'aiout'),(58,59,'o1'),(60,61,'o2'),(62,63,'o3'),(64,64,'o4'),(65,66,'h'),(67,67,'tag')]),
  (74, 117, [(88,91,'h'),(92,94,'n1'),(95,97,'n2'),(98,100,'n3'),(101,103,'n4'),(104,104,'n2'),(105,105,'n3'),(106,106,'n4'),
             (107,107,'loop'),(108,113,'you'),(114,115,'h'),(116,116,'tag')]),
  (123, 184, [(137,140,'h'),(141,147,'you'),(148,150,'box'),(151,159,'plan'),(160,163,'act'),(164,167,'check'),(168,168,'act'),
              (169,169,'check'),(170,170,'plan'),(171,171,'act'),(172,172,'check'),(173,173,'cycle'),(174,180,'result'),(181,182,'h'),(183,183,'tag')]),
  (190, 252, [(203,206,'h'),(207,207,'as'),(208,211,'a1'),(212,216,'a2'),(217,217,'a1'),(218,218,'a2'),(219,220,'atext'),(221,222,'ag'),
              (223,226,'g1'),(227,231,'g2'),(232,236,'g3'),(237,242,'g4'),(243,243,'g1'),(244,244,'g2'),(245,245,'g3'),(246,246,'g4'),
              (247,248,'gtext'),(249,250,'h'),(251,251,'tag')]),
  (258, 350, [(271,274,'h'),(275,282,'s1'),(283,291,'s2'),(292,300,'s3'),(301,309,'s4'),(310,317,'s5'),(318,326,'s6'),(327,335,'s7'),
              (336,345,'s8'),(346,346,'s5'),(347,348,'h'),(349,349,'tag')]),
  (356, 415, [(369,372,'h'),(373,373,'ctx'),(374,374,'ctx1'),(375,375,'ctx2'),(376,379,'ctx'),(380,380,'d'),(382,382,'d'),(383,383,'a'),
              (384,384,'o'),(386,386,'d'),(387,387,'a'),(388,388,'o'),(389,391,'d'),(392,394,'a'),(395,397,'o'),(398,398,'a'),(399,399,'o'),
              (400,400,'br'),(401,401,'cont'),(402,402,'adj'),(403,403,'stop'),(404,405,'cont'),(406,407,'adj'),(408,409,'stop'),
              (410,411,'again'),(412,413,'h'),(414,414,'tag')]),
  (421, 480, [(434,437,'h'),(438,449,'c1'),(450,450,'div1'),(451,451,'c2'),(452,465,'c2i'),(466,467,'c2t'),(468,468,'div2'),
              (469,474,'c3'),(475,475,'c3t1'),(476,476,'c3t2'),(477,478,'h'),(479,479,'tag')]),
]

PAINT = 'fill="url(#paint)" stroke="#111" stroke-width="3"'
result = []
for idx, (a, b, runs) in enumerate(SPECS, 1):
    starts = {s: (e, k) for s, e, k in runs}
    parts, n = [], a
    while n <= b:
        if n in starts:
            e, k = starts[n]
            parts.append(f'<g data-r="{k}">' + '\n'.join(line(i) for i in range(n, e + 1)) + '</g>')
            n = e + 1
        else:
            parts.append(line(n)); n += 1
    s = '\n'.join(parts)
    if idx == 6:  # split the shared-fill group of the three loop circles so each can reveal on its own cue
        s = s.replace('<g fill="url(#paint)" stroke="#111" stroke-width="3">\n', '').replace('<circle cx="1195" cy="478" r="55"/></g>\n</g>', '<circle cx="1195" cy="478" r="55"/></g>')
        s = re.sub(r'<circle cx="(\d+)" cy="478" r="55"/>', lambda m: f'<circle cx="{m.group(1)}" cy="478" r="55" {PAINT}/>', s)
    s = re.sub(r'<title[^>]*>.*?</title>\n?|<desc[^>]*>.*?</desc>\n?', '', s)
    if idx == 6:  # "Start with context" becomes step 1 of a 1-4 loop (user request): circle replaces the doc icon
        SANS, SERIF = 'font-family="Arial, DejaVu Sans, sans-serif"', 'font-family="Georgia, DejaVu Serif, serif"'
        swaps = [
            ('<text x="103" y="303" ' + SERIF + ' font-size="30" fill="#111" text-anchor="start">Start with context</text>',
             '<text x="195" y="325" ' + SERIF + ' font-size="30" fill="#111" text-anchor="middle">Start with context</text>'),
            ('<text x="103" y="354" ' + SANS + ' font-size="23" fill="#111" text-anchor="start">',
             '<text x="195" y="365" ' + SANS + ' font-size="23" fill="#111" text-anchor="middle">'),
            ('<text x="103" y="386.2" ' + SANS + ' font-size="23" fill="#111" text-anchor="start">',
             '<text x="195" y="397.2" ' + SANS + ' font-size="23" fill="#111" text-anchor="middle">'),
            ('<g transform="translate(114 427) scale(0.7)">\n<path d="M0 0H62L84 22V104H0Z" fill="url(#paint)" stroke="#111" stroke-width="3"/>\n'
             '<path d="M62 0V22H84M16 43H65M16 62H65M16 81H50" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />\n</g>',
             '<circle cx="195" cy="478" r="55" fill="url(#paint)" stroke="#111" stroke-width="3"/>\n'
             '<text x="195" y="490" ' + SANS + ' font-size="32" fill="#111" text-anchor="middle">1</text>'),
            ('<path d="M275 487H385"', '<path d="M265 478H395"'),
        ]
        for i, n in ((1195, 4), (840, 3), (485, 2)):
            swaps.append((f'<text x="{i}" y="490" {SANS} font-size="32" fill="#111" text-anchor="middle">{n - 1}</text>',
                          f'<text x="{i}" y="490" {SANS} font-size="32" fill="#111" text-anchor="middle">{n}</text>'))
        for a_, b_ in swaps:
            assert a_ in s, a_[:60]
            s = s.replace(a_, b_)
    if idx == 6:  # loop-back line joins the context arrow instead of drawing a second arrowhead (user request)
        old = '<path d="M1195 751V774H366V478H403" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" marker-end="url(#arrow)"/>'
        assert old in s
        s = s.replace(old, '<path d="M1195 751V774H366V478" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')
    if idx == 7:  # its tagline became its own text scene in AiAgentic.tsx (user request)
        s = re.sub(r'<g data-r="tag">.*?</g>\n?', '', s, flags=re.S)
    s = re.sub(r' role="img"| aria-labelledby="[^"]*"', '', s)
    s = s.replace('width="1600" height="900" viewBox', 'width="1920" height="1080" viewBox', 1)
    s = s.replace('Arial, DejaVu Sans, sans-serif', "'Public Sans', sans-serif").replace('Georgia, DejaVu Serif, serif', "'IBM Plex Serif', serif")
    s = s.replace('id="arrow"', f'id="s{idx}-arrow"').replace('id="paint"', f'id="s{idx}-paint"')
    s = s.replace('url(#arrow)', f'url(#s{idx}-arrow)').replace('url(#paint)', f'url(#s{idx}-paint)')
    # Template chrome: the LWAI logo (LogoFooter) replaces the drawn footer rule + "Lead with AI" text,
    # the tagline moves up to sit level with the logo, and the top label uses the template label style.
    s = re.sub(r'<path d="M70 81[56]H1530"[^>]*/>\n?', '', s)
    s = re.sub(r'<text [^>]*>Lead with AI</text>\n?', '', s)
    s = s.replace('y="864"', 'y="838"')
    s = re.sub(r'<text x="70" y="6[24]" font-family="([^"]*)" font-size="22"([^>]*?)fill="#111"',
               r'<text x="70" y="62" font-family="\1" font-size="19" font-weight="600" letter-spacing="2.3"\2fill="#888888"', s)
    assert s.count('<g') == s.count('</g>'), idx
    result.append(s)

# Slide 4 + 5 were merged into one scene (user request): public/ai-agentic/images/04-meeting-follow-up-combined.svg
# already carries its own data-r groups; it gets the same font/id treatment and replaces SVGs 4 and 5.
_c = [os.path.join(os.path.dirname(__file__), f'../../{d}/ai-agentic/images/04-meeting-follow-up-combined.svg') for d in ('public', 'public-full')]
combined = open(next(c for c in _c if os.path.exists(c))).read()  # public-full/ once the render's assets are archived
combined = combined.replace('width="1600" height="900" viewBox', 'width="1920" height="1080" viewBox', 1)
combined = combined.replace('Arial, DejaVu Sans, sans-serif', "'Public Sans', sans-serif").replace('Georgia, DejaVu Serif, serif', "'IBM Plex Serif', serif")
combined = re.sub(r'<text x="70" y="62" font-family="([^"]*)" font-size="22"([^>]*?)fill="#111"',
                  r'<text x="70" y="62" font-family="\1" font-size="19" font-weight="600" letter-spacing="2.3"\2fill="#888888"', combined)
combined = combined.replace('id="arrow"', 'id="s4-arrow"').replace('id="paint"', 'id="s4-paint"')
combined = combined.replace('url(#arrow)', 'url(#s4-arrow)').replace('url(#paint)', 'url(#s4-paint)')
result[3:5] = [combined]

with open(out, 'w') as f:
    f.write('// Generated by videos/ai-agentic/build-svgs.py from the user-supplied SVGs (dumping/all-svg-codes.txt).\n')
    f.write('// Reveal groups are <g data-r="key"> wrappers; fonts swapped to the brand fonts. Do not hand-edit.\n\n')
    f.write('export const AGENTIC_SVGS: string[] = ' + json.dumps(result, indent=2) + ';\n')
print('ok', [r.count('data-r') for r in result])
