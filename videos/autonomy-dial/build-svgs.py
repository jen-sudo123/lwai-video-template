# Builds src/compositions/autonomy-dial-svgs.ts from the user's four SVGs (dumping/autonomy-dial-svg/,
# base64-stripped copies in public/autonomy-dial/images/). The originals are dense (title + diagram + quote +
# footer on one slide), so each slide is re-laid out here: the drawn icons, dial, arrows and wording are kept
# (same 1800×1100 coordinate system, same pigment/ink classes), while quotes and sum-up lines move to their
# own template text scenes in AutonomyDial.tsx. Reveal groups are <g data-r="key">; the dial needle is
# <g data-needle>. Usage: python3 build-svgs.py <images dir> <out.ts>
import json, os, re, sys
src_dir = sys.argv[1]; out = sys.argv[2]

# Shared <defs> (pigment pattern, arrow marker, classes) from the first source slide; embedded fonts dropped
# because IBM Plex Serif / Public Sans come from @remotion/google-fonts.
first = open(os.path.join(src_dir, '01_authority-for-each-action.svg')).read()
DEFS = first[first.index('<defs>'):first.index('</defs>') + len('</defs>')]
DEFS = re.sub(r"@font-face\{[^}]*\}", '', DEFS)
DEFS = DEFS.replace('.muted{font-family:Public Sans,Arial,sans-serif;fill:#666}', '.muted{font-family:Public Sans,Arial,sans-serif;fill:#666}.label{font-family:Public Sans,Arial,sans-serif;fill:#888;font-weight:600;letter-spacing:2.6px}')

def T(x, y, size, cls, text, anchor='start', extra=''):
    return f'<text x="{x}" y="{y}" font-size="{size}" class="{cls}" text-anchor="{anchor}"{extra}>{text}</text>'

def G(key, *parts):
    return f'<g data-r="{key}">' + ''.join(parts) + '</g>'

DOC = lambda x, y: (f'<g transform="translate({x} {y})"><path d="M0 0H92L120 28V155H0Z" class="paint"/>'
                    '<path d="M92 0V28H120" class="ink"/><path d="M22 54H98M22 82H98M22 110H78" class="ink"/></g>')
SDOC = lambda x, y: (f'<g transform="translate({x} {y})"><path d="M0 0H72L100 28V128H0Z" class="paint"/>'
                     '<path d="M72 0V28H100" class="ink"/><path d="M22 54H78M22 82H78M22 110H58" class="ink"/></g>')
PERSON = lambda x, y: f'<g transform="translate({x} {y})"><circle r="30" class="paint"/><path d="M-50 106C-50 40 50 40 50 106" class="ink"/></g>'
ENVELOPE = lambda x, y: f'<g transform="translate({x} {y})"><rect width="150" height="108" class="paint"/><path d="M0 0L75 60 150 0" class="ink"/></g>'

def header(label, title, sub=None, rule_y=232):
    h = [T(64, 66, 21, 'label', label)]
    h.append(G('title', T(64, 150, 62, 'serif', title)))
    if sub:
        h.append(G('sub', T(64, 205, 29, 'body', sub)))
    h.append(f'<path d="M64 {rule_y}H1736" stroke="#ddd"/>')
    return h

slides = []

# 1 — Customer follow-up: what you'd let it do vs. what you wouldn't. The closing two lines become text scene 2.
slides.append(header('AN EXAMPLE', 'Imagine an agent handling customer follow-up.', rule_y=200) + [
    G('k1', T(64, 300, 27, 'muted', 'You might happily let it…')),
    G('s1', DOC(126, 400), T(185, 640, 28, 'body', 'find the relevant', 'middle'), T(185, 678, 28, 'body', 'account information', 'middle')),
    G('a1', '<path d="M275 477H492" class="ink" marker-end="url(#arrow)"/>'),
    G('s2', DOC(546, 400), T(607, 640, 28, 'body', 'draft the response', 'middle')),
    G('a2', '<path d="M697 477H910" class="ink" marker-end="url(#arrow)"/>'),
    G('s3', '<g transform="translate(960 405)"><rect width="210" height="140" class="ink"/><path d="M0 42H210M60 42V140" class="ink"/>'
            '<rect x="83" y="65" width="104" height="46" class="paint"/><path d="M105 88l15 15 35-30" class="ink"/></g>',
      T(1065, 640, 28, 'body', 'update an internal', 'middle'), T(1065, 678, 28, 'body', 'status field', 'middle')),
    G('div', '<path d="M1255 270V880" class="ink" stroke-dasharray="10 10"/>'),
    G('k2', T(1520, 300, 27, 'muted', 'But would you let it…', 'middle')),
    G('s4', ENVELOPE(1390, 417), '<path d="M1547 471H1578" class="ink" marker-end="url(#arrow)"/>', PERSON(1640, 437),
      T(1520, 640, 27, 'body', 'change the customer\'s', 'middle'), T(1520, 677, 27, 'body', 'commercial terms', 'middle')),
    G('s5', T(1520, 714, 27, 'body', 'and send the final message', 'middle'), T(1520, 751, 27, 'body', 'without you?', 'middle')),
    G('no', T(1520, 850, 46, 'serif', 'Probably not.', 'middle')),
])

# 2 — The dial. One level at a time: the needle turns to it and only its definition shows under the knob
# (replaces the source's dense five-column definition row).
CX, CY, R = 900, 690, 330
DEFS2 = [
    ('Suggest', 'recommends what should happen,', 'but you remain responsible for doing it.'),
    ('Prepare', 'creates the draft, proposes an update,', 'or suggests a next action.'),
    ('Act with approval', 'can execute the action,', 'but pauses first for your decision.'),
    ('Act within bounds', 'can execute without asking', 'when clearly defined conditions are met.'),
    ('Run and escalate', 'carries the workflow forward itself, involving you', 'when something falls outside its boundaries.'),
]
dial = header('THE AUTONOMY DIAL', 'Five Levels of Authority', 'We define authority as a dial with five positions.', rule_y=248)
dial.append(G('arc', f'<path d="M{CX-R} {CY}A{R} {R} 0 0 1 {CX+R} {CY}" fill="none" stroke="#151515" stroke-width="5"/>'))
pts = [(570, 690), (667, 457), (900, 360), (1133, 457), (1230, 690)]
labels = [(440, 700, 'Suggest'), (600, 410, 'Prepare'), (900, 330, 'Act with approval'), (1200, 410, 'Act within bounds'), (1360, 680, 'Run and')]
for i, ((px, py), (lx, ly, lt)) in enumerate(zip(pts, labels), 1):
    anchor = 'end' if i in (1, 2) else 'start' if i in (4, 5) else 'middle'
    lab = T(lx, ly, 36, 'serif', lt, anchor)
    if i == 5:
        lab += T(lx, ly + 44, 36, 'serif', 'escalate', anchor)
    # Dots appear with the arc; each label arrives as the VO names its level
    dial.append(G('arc', f'<circle cx="{px}" cy="{py}" r="22" class="paint"/>'))
    dial.append(G(f'p{i}', lab))
# Needle points right (0°) and is rotated by the composition; knob drawn over it
dial.append(f'<g data-needle=""><path d="M{CX} {CY}H{CX+250}" class="ink" stroke-width="8"/><circle cx="{CX+250}" cy="{CY}" r="9" fill="#151515"/></g>')
dial.append(G('knob', f'<circle cx="{CX}" cy="{CY}" r="51" class="paint"/>'))
for i, (name, l1, l2) in enumerate(DEFS2, 1):
    dial.append(G(f'd{i}', T(900, 815, 36, 'serif', name, 'middle'), T(900, 865, 29, 'body', l1, 'middle'), T(900, 905, 29, 'body', l2, 'middle')))
slides.append(dial)

# 3 — Judge the consequence: the question and its two branches. The ambiguity line and the assist/execute
# boundary footer become text scenes.
slides.append(header('JUDGE THE CONSEQUENCE', 'Judge the Consequence, Not the Capability', rule_y=200) + [
    G('q', T(900, 290, 46, 'serif', 'What happens if this action is wrong?', 'middle')),
    G('br', '<path d="M900 325V372M900 372H477V415M900 372H1323V415" class="ink"/>'),
    G('l1', DOC(308, 450), '<path d="M451 530C525 430 620 446 629 507" class="ink" marker-end="url(#arrow)"/><path d="M619 487L631 510 650 492" class="ink"/>',
      T(477, 670, 29, 'body', 'If the mistake is easy to notice', 'middle'), T(477, 710, 29, 'body', 'and reverse,', 'middle')),
    G('l2', T(477, 820, 40, 'serif', 'allow more independence', 'middle')),
    G('r1', PERSON(1190, 482), DOC(1285, 452), '<path d="M1454 452V598M1425 471H1483M1425 578H1483" class="ink"/>',
      T(1323, 670, 29, 'body', 'If it affects a customer, money,', 'middle')),
    G('r2', T(1323, 710, 29, 'body', 'sensitive information, compliance,', 'middle')),
    G('r3', T(1323, 750, 29, 'body', 'or an important commitment,', 'middle')),
    G('r4', T(1323, 820, 40, 'serif', 'tighter control', 'middle')),
])

# 4 — One workflow, several dial positions. The friction line and the closing question become text scenes.
def step(key, icon, lines, level, x):
    parts = [icon] + [T(x, 640 + 36 * j, 26, 'body', ln, 'middle') for j, ln in enumerate(lines)]
    parts.append(f'<rect x="{x - 118}" y="{752}" width="236" height="46" rx="23" fill="#D0F8AB"/>')
    parts.append(T(x, 783, 23, 'serif', level, 'middle'))
    return G(key, *parts)

slides.append(header('ONE WORKFLOW, DIFFERENT SETTINGS', 'One Workflow, Different Settings', 'The same workflow can use several positions on the dial.', rule_y=248) + [
    G('box', '<path d="M64 377H1298V840H64Z" class="ink" stroke-dasharray="10 9"/>'),
    step('w1', SDOC(155, 433), ['independently', 'retrieve information'], 'Act within bounds', 205),
    G('a1', '<path d="M285 496H415" class="ink" marker-end="url(#arrow)"/>'),
    step('w2', SDOC(451, 433), ['prepare a', 'recommendation'], 'Prepare', 501),
    G('a2', '<path d="M583 496H713" class="ink" marker-end="url(#arrow)"/>'),
    step('w3', '<g transform="translate(743 445)"><rect width="139" height="96" class="paint"/><path d="M0 32H139M40 32V96M65 68l13 14 31-35" class="ink"/></g>',
         ['update a low-risk', 'internal field'], 'Act within bounds', 813),
    G('a3', '<path d="M914 496H1044" class="ink" marker-end="url(#arrow)"/>'),
    step('w4', ENVELOPE(1073, 445), ['request approval', 'before contacting', 'a customer'], 'Act with approval', 1148),
    G('w5', '<path d="M501 420V339H1534V439" class="ink" marker-end="url(#arrow)"/>', PERSON(1534, 500),
      T(1534, 671, 27, 'body', 'escalate when the', 'middle'), T(1534, 708, 27, 'body', 'information conflicts', 'middle'),
      '<rect x="1414" y="752" width="240" height="46" rx="23" fill="#D0F8AB"/>', T(1534, 783, 23, 'serif', 'Run and escalate', 'middle')),
])

result = []
for idx, parts in enumerate(slides, 1):
    s = ('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
         # 1800×1100 slide fitted to the 1920×1080 frame (scale 0.982), white side bands
         'width="1920" height="1080" viewBox="-77.78 0 1955.56 1100">\n' + DEFS + '\n'
         '<rect x="-78" width="1956" height="1100" fill="white"/>\n' + '\n'.join(parts) + '\n</svg>')
    s = re.sub(r'(<style>|\})(text|\.body|\.serif|\.muted|\.ink|\.paint|\.label)\{', lambda m: f'{m.group(1)}.ad-s{idx} {m.group(2)}{{', s)
    s = s.replace('xlink:href="DATA"', 'xlink:href="__PIGMENT__"')
    s = s.replace('id="arrow"', f'id="s{idx}-arrow"').replace('id="pigment"', f'id="s{idx}-pigment"')
    s = s.replace('url(#arrow)', f'url(#s{idx}-arrow)').replace('url(#pigment)', f'url(#s{idx}-pigment)')
    assert 'DATA' not in s and s.count('<g') == s.count('</g>'), idx
    result.append(s)

with open(out, 'w') as f:
    f.write('// Generated by videos/autonomy-dial/build-svgs.py from the user-supplied SVGs (dumping/autonomy-dial-svg/).\n')
    f.write('// Reveal groups are <g data-r="key">, the dial needle is <g data-needle>; __PIGMENT__ is swapped for the texture URL at runtime. Do not hand-edit.\n\n')
    f.write('export const AUTONOMY_DIAL_SVGS: string[] = ' + json.dumps(result, indent=2) + ';\n')
print('ok', [r.count('data-r') for r in result])
