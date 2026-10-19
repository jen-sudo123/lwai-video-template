# Builds src/compositions/smallest-agent-svgs.ts from the user's four SVGs (dumping/all-svg-image-codes copy.txt,
# base64-stripped copies in public/smallest-agent/images/). The originals are dense and partly Larry-specific, so
# each slide is re-laid out here around what the VO actually says, reusing the source icons, pigment and ink
# classes (same 1800×1100 coordinate system):
#   1  Map the work with O.V.E.R. (source 1; source 2's agent / automation / person split folded into Route)
#   2  Agent build blueprint — five decisions, one answer at a time (source 3)
#   3  Orchestration loop + boundaries (drawn in the same style; the VO expands source 3's Control row)
#   4  Larry's blueprint (the Larry-specific lines of source 3)
#   5  A meaningful multi-step workflow (the pipeline from source 4)
#   6  Larry recap for the replacement intro (dumping/Audio replacement.mp3)
#   7  The agent / automation / people split (source 2) for the replacement intro
# Quotes and sum-up lines are template text scenes in SmallestAgent.tsx. Reveal groups are <g data-r="key">.
# Usage: python3 build-svgs.py <images dir> <out.ts>
import json, os, re, sys
src_dir = sys.argv[1]; out = sys.argv[2]

first = open(os.path.join(src_dir, '01_map-the-work-with-over.svg')).read()
DEFS = first[first.index('<defs>'):first.index('</defs>') + len('</defs>')]
DEFS = re.sub(r"@font-face\{[^}]*\}", '', DEFS)
DEFS = DEFS.replace('.muted{font-family:Public Sans,Arial,sans-serif;fill:#666}', '.muted{font-family:Public Sans,Arial,sans-serif;fill:#666}.label{font-family:Public Sans,Arial,sans-serif;fill:#888;font-weight:600;letter-spacing:2.6px}')
DEFS = DEFS.replace('data:image/png;base64,DATA', 'DATA')

def T(x, y, size, cls, text, anchor='start', extra=''):
    return f'<text x="{x}" y="{y}" font-size="{size}" class="{cls}" text-anchor="{anchor}"{extra}>{text}</text>'

def G(key, *parts):
    return f'<g data-r="{key}">' + ''.join(parts) + '</g>'

DOC = lambda x, y: (f'<g transform="translate({x} {y})"><path d="M0 0H102L130 28V170H0Z" class="paint"/>'
                    '<path d="M102 0V28H130" class="ink"/><path d="M22 54H108M22 82H108M22 110H88" class="ink"/></g>')
MDOC = lambda x, y: (f'<g transform="translate({x} {y})"><path d="M0 0H82L110 28V145H0Z" class="paint"/>'
                     '<path d="M82 0V28H110" class="ink"/><path d="M22 54H88M22 82H88M22 110H68" class="ink"/></g>')
SDOC = lambda x, y: (f'<g transform="translate({x} {y})"><path d="M0 0H72L100 28V135H0Z" class="paint"/>'
                     '<path d="M72 0V28H100" class="ink"/><path d="M22 54H78M22 82H78M22 110H58" class="ink"/></g>')
PERSON = lambda x, y, s=1: f'<g transform="translate({x} {y}) scale({s})"><circle r="30" class="paint"/><path d="M-50 106C-50 40 50 40 50 106" class="ink"/></g>'
PILL = lambda cx, y, w, text: (f'<rect x="{cx - w / 2}" y="{y}" width="{w}" height="56" rx="28" fill="#D0F8AB" stroke="#151515" stroke-width="3"/>'
                               + T(cx, y + 38, 28, 'serif', text, 'middle'))

def header(label, title, sub=None, rule_y=232):
    h = [T(64, 66, 21, 'label', label)]
    h.append(G('title', T(64, 150, 62, 'serif', title)))
    if sub:
        h.append(G('sub', T(64, 205, 29, 'body', sub)))
    h.append(f'<path d="M64 {rule_y}H1736" stroke="#ddd"/>')
    return h

slides = []

# 1 — O.V.E.R. Four columns, one per letter, each revealed as the VO names it. The source's Larry examples
# under each column and its convergence line are dropped (not spoken); Route gets the AI / tools / people split.
over = header('THE O.V.E.R. FRAMEWORK', 'Map the Work with O.V.E.R.', 'To turn a workflow into a real agent, we first design the work.', rule_y=248)
COLS = [
    ('o', 'O', 'Output', ['What should be different', 'when the work is done?']),
    ('v', 'V', 'Verbs', ['Break the workflow into', 'individual steps.']),
    ('e', 'E', 'Evaluate', ['Which steps can', 'AI handle?']),
    ('r', 'R', 'Route', ['Route the work between', 'AI, tools, and people.']),
]
for i, (key, letter, head, lines) in enumerate(COLS):
    x = 64 + 429 * i
    cx = x + 190
    parts = [f'<circle cx="{x + 42}" cy="{338}" r="42" class="paint"/>', T(x + 42, 354, 44, 'serif', letter, 'middle'),
             T(x + 104, 354, 44, 'serif', head)]
    parts += [T(x, 432 + 38 * j, 27, 'body', ln) for j, ln in enumerate(lines)]
    if key == 'o':
        parts.append(DOC(cx - 65, 560))
    elif key == 'v':
        parts.append(f'<g transform="translate({cx - 120} 572)"><circle cx="20" cy="25" r="20" class="paint"/><circle cx="20" cy="85" r="20" class="paint"/>'
                     '<circle cx="20" cy="145" r="20" class="paint"/><path d="M60 25H220M60 85H220M60 145H220" class="ink"/></g>')
    elif key == 'e':
        parts.append(f'<g transform="translate({cx - 1111} 24)"><path d="M1111 536L1182 607 1111 678 1040 607Z" class="paint"/>'
                     '<path d="M1111 684V704H1005V727M1111 704H1217V727" class="ink"/></g>')
        parts.append(T(cx - 106, 800, 24, 'muted', 'judgment', 'middle') + T(cx + 106, 800, 24, 'muted', 'fixed rule', 'middle'))
    over.append(G(key, *parts))
# Route: branch from the source, then one leaf per word ("AI, tools, and people")
dx = 64 + 429 * 3 + 190 - 1533
over.append(G('r', f'<g transform="translate({dx} 18)"><path d="M1533 537V585M1533 585H1418V685M1533 585H1648V685M1533 585V685" class="ink"/></g>'))
over.append(G('r1', f'<circle cx="{1418 + dx}" cy="{726}" r="24" class="paint"/>', T(1418 + dx, 850, 27, 'serif', 'AI', 'middle')))
over.append(G('r2', f'<rect x="{1508 + dx}" y="{701}" width="49" height="49" class="paint"/>', T(1533 + dx, 850, 27, 'serif', 'tools', 'middle')))
over.append(G('r3', PERSON(1648 + dx, 707, 0.8), T(1648 + dx, 850, 27, 'serif', 'people', 'middle')))
slides.append(over)

# 2 — Blueprint. Five rows (heading + question) on the left; the right panel shows one answer at a time under
# a checklist that ticks off each decision as its answer is spoken. The active row gets a lime band.
ROWS = [
    ('Job', 'What is the agent responsible for?', ['Clear instructions', 'establish that', 'responsibility.']),
    ('Knowledge', 'What information does it need?', ['Relevant context, and', 'approved documents,', 'data, or other sources.']),
    ('Method', 'How should the work be performed?', ['Instructions and', 'reusable skills for', 'consistent procedures.']),
    ('Capabilities', 'What must it do beyond responding?', ['Connectors and tools', 'to retrieve information', 'and carry out actions.']),
    ('Control', 'When should a human intervene?', ['Decide what happens', 'next, and when a', 'human steps in.']),
]
bp = header('THE AGENT BUILD BLUEPRINT', 'Agent Build Blueprint', 'Five design decisions that bring the necessary capabilities together.', rule_y=248)
bp.append('<path d="M1180 300V900" stroke="#ddd"/>')
for i, (head, q, ans) in enumerate(ROWS, 1):
    y = 350 + 120 * (i - 1)
    bp.append(G(f'h{i}', f'<rect x="56" y="{y - 52}" width="1090" height="96" fill="#D0F8AB"/>'))
    bp.append(G(f'r{i}', f'<circle cx="98" cy="{y - 4}" r="26" class="paint"/>', T(98, y + 6, 26, 'serif', str(i), 'middle'),
                T(150, y + 9, 38, 'serif', head)))
    bp.append(G(f'q{i}', T(450, y + 7, 27, 'body', q)))
CB_X, CB_Y = 1345, 310
cb = [f'<g transform="translate({CB_X} {CB_Y})"><rect width="226" height="300" class="paint"/><rect x="73" y="-14" width="80" height="28" fill="white" stroke="#151515" stroke-width="3"/>']
for i in range(5):
    cb.append(f'<path d="M78 {56 + 52 * i}H195" class="ink"/>')
cb.append('</g>')
bp.append(G('cb', *cb))
for i in range(5):
    y = CB_Y + 56 + 52 * i
    bp.append(G(f'ck{i + 1}', f'<path d="M{CB_X + 30} {y}l10 12 18-25" class="ink" stroke-width="4"/>'))
for i, (head, q, ans) in enumerate(ROWS, 1):
    bp.append(G(f'd{i}', T(1458, 680, 21, 'label', head.upper(), 'middle'),
                *[T(1458, 735 + 44 * j, 32, 'serif', ln, 'middle') for j, ln in enumerate(ans)]))
slides.append(bp)

# 3 — Orchestration: select → examine → decide loop, progress, and the three boundaries.
orc = header('CONTROL', 'This Is Where Orchestration Comes In', rule_y=200)
NODES = [(420, 'select', ['select an', 'available action']), (900, 'examine', ['examine', 'the result']), (1380, 'decide', ['continue or', 'change course'])]
GLYPH = {
    'select': '<path d="M-22 -18H26M-22 0H26M-22 18H26" class="ink"/><circle cx="-36" cy="0" r="6" fill="#151515"/>',
    'examine': '<circle cx="-6" cy="-6" r="18" class="ink"/><path d="M7 7L26 26" class="ink" stroke-width="5"/>',
    'decide': '<path d="M-28 0H0M0 0L24 -20M0 0L24 20" class="ink"/><path d="M14 -22L25 -21 23 -10M14 22L25 21 23 10" class="ink"/>',
}
for i, (cx, key, lines) in enumerate(NODES, 1):
    orc.append(G(f'n{i}', f'<circle cx="{cx}" cy="420" r="66" class="paint"/>', f'<g transform="translate({cx} 420)">{GLYPH[key]}</g>',
                 *[T(cx, 548 + 40 * j, 32, 'serif', ln, 'middle') for j, ln in enumerate(lines)]))
orc.append(G('a1', '<path d="M500 420H806" class="ink" marker-end="url(#arrow)"/>'))
orc.append(G('a2', '<path d="M980 420H1286" class="ink" marker-end="url(#arrow)"/>'))
orc.append(G('loop', '<path d="M1380 344C1380 250 420 250 420 336" class="ink" stroke-dasharray="10 9" marker-end="url(#arrow)"/>'))
orc.append(G('prog', '<rect x="560" y="672" width="680" height="34" rx="17" fill="white" stroke="#151515" stroke-width="3"/>',
             '<rect x="560" y="672" width="430" height="34" rx="17" class="paint"/>',
             T(900, 754, 28, 'body', 'tracks its progress during the task', 'middle')))
orc.append(G('kb', T(900, 832, 28, 'body', 'operates within clear boundaries', 'middle')))
orc.append(G('p1', PILL(560, 860, 250, 'permission')))
orc.append(G('p2', PILL(900, 860, 250, 'approval')))
orc.append(G('p3', PILL(1240, 860, 250, 'escalation')))
slides.append(orc)

# 4 — Larry's blueprint: the same five decisions, filled in for the leadership update writer.
LROWS = [
    ('Job', ['Produce a decision-ready leadership briefing.']),
    ('Knowledge', ['Approved project information in SharePoint.']),
    ('Method', ['Identify meaningful developments, check important', 'claims, and highlight decisions requiring attention.']),
    ('Capabilities', ['Retrieve information and prepare an update', 'for Microsoft Teams.']),
    ('Control', ['Investigate missing details, flag conflicting', 'information, and request approval before publishing.']),
]
lar = header('PUTTING IT TOGETHER', 'Larry, Our Leadership Update Writer', rule_y=200)
lar.append(G('larry', PERSON(190, 400, 1.7), T(190, 640, 38, 'serif', 'Larry', 'middle'),
             T(190, 684, 24, 'muted', 'leadership', 'middle'), T(190, 716, 24, 'muted', 'update writer', 'middle')))
lar.append('<path d="M360 290V880" stroke="#ddd"/>')
ys = [320, 430, 540, 680, 820]
for i, ((head, lines), y) in enumerate(zip(LROWS, ys), 1):
    parts = [f'<circle cx="430" cy="{y - 10}" r="18" class="paint"/>', T(470, y + 2, 36, 'serif', head)]
    parts += [T(760, y + 38 * j, 28, 'body', ln) for j, ln in enumerate(lines)]
    lar.append(G(f'l{i}', *parts))
slides.append(lar)

# 5 — Larry carries a multi-step workflow forward (pipeline from source 4; its "Before building" block and
# footer are dropped — not in this VO).
pipe = header('LARRY AT WORK', 'A Meaningful Multi-Step Workflow', 'carried forward without us managing every action.', rule_y=248)
pipe.append(G('box', '<path d="M84 339H1715V760H84Z" class="ink" stroke-dasharray="10 9"/>'))
pipe.append(G('s1', MDOC(206, 408), T(261, 640, 28, 'body', 'retrieve current', 'middle'), T(261, 679, 28, 'body', 'project information', 'middle')))
pipe.append(G('a1', '<path d="M359 483H524" class="ink" marker-end="url(#arrow)"/>'))
pipe.append(G('s2', SDOC(566, 411), SDOC(731, 411), '<path d="M690 449H714M714 449L703 439M714 449L703 459" class="ink"/>',
              T(698, 640, 28, 'body', 'identify meaningful', 'middle'), T(698, 679, 28, 'body', 'changes', 'middle')))
pipe.append(G('a2', '<path d="M873 483H1038" class="ink" marker-end="url(#arrow)"/>'))
pipe.append(G('s3', MDOC(1085, 408), T(1140, 640, 28, 'body', 'prepare the briefing', 'middle'), T(1140, 679, 28, 'body', 'for Microsoft Teams', 'middle')))
pipe.append(G('a3', '<path d="M1238 483H1436" class="ink" marker-end="url(#arrow)"/>'))
pipe.append(G('s4', PERSON(1520, 452), T(1520, 640, 28, 'body', 'a person approves', 'middle'), T(1520, 679, 28, 'body', 'before publishing', 'middle')))
slides.append(pipe)

# 6 — Replacement intro: what we've already seen Larry do (access information, use tools, ask for approval).
TABLE = lambda x, y: (f'<g transform="translate({x} {y})"><rect width="186" height="133" class="paint"/>'
                      '<path d="M0 35H186M0 70H186M0 104H186M61 0V133" class="ink"/></g>')
recap = header('WE’VE ALREADY SEEN', 'Larry, Our Leadership Update Agent', rule_y=200)
recap.append(G('larry', PERSON(250, 450, 1.7), T(250, 720, 38, 'serif', 'Larry', 'middle'),
               T(250, 764, 24, 'muted', 'leadership update agent', 'middle')))
recap.append(G('box', '<path d="M430 540H560" class="ink" marker-end="url(#arrow)"/>',
               '<path d="M600 360H1700V820H600Z" class="ink" stroke-dasharray="10 9"/>'))
recap.append(G('c1', MDOC(767, 440), T(822, 680, 30, 'body', 'access', 'middle'), T(822, 720, 30, 'body', 'information', 'middle')))
recap.append(G('c2', TABLE(1057, 446), T(1150, 680, 30, 'body', 'use tools', 'middle')))
recap.append(G('c3', '<rect x="1408" y="458" width="150" height="104" class="paint"/>',
               '<path d="M1450 510l22 24 46-50" class="ink" stroke-width="5"/>',
               T(1483, 680, 30, 'body', 'ask for approval', 'middle'), T(1483, 720, 30, 'body', 'before taking action', 'middle')))
slides.append(recap)

# 7 — Replacement intro: dividing the work between the agent, automation, and people (source 2's three
# columns and icons; its Larry-specific task lists are dropped, one plain line per column instead).
route = header('BEFORE BUILDING', 'How Should the Work Be Divided?', rule_y=200)
route.append(G('c1', T(64, 320, 42, 'serif', 'the agent'), SDOC(128, 380), SDOC(308, 380),
               '<path d="M250 413H285M285 413L271 402M285 413L271 424M285 462H250M250 462L264 451M250 462L264 473" class="ink"/>',
               T(64, 590, 27, 'body', 'steps that need judgment')))
route.append(G('c2', T(656, 320, 42, 'serif', 'automation'), TABLE(755, 390),
               T(656, 590, 27, 'body', 'steps that follow a fixed rule')))
route.append(G('c3', T(1248, 320, 42, 'serif', 'people'), PERSON(1315, 412), SDOC(1433, 380),
               '<path d="M1380 450H1413" class="ink" marker-end="url(#arrow)"/>',
               T(1248, 590, 27, 'body', 'approvals and important uncertainties')))
route.append(G('flow', '<path d="M258 630C258 760 760 790 826 790" class="ink" marker-end="url(#arrow)"/>',
               '<path d="M848 630V706" class="ink" marker-end="url(#arrow)"/>',
               '<path d="M1400 630C1400 760 1000 790 974 790" class="ink" marker-end="url(#arrow)"/>', DOC(836, 720)))
slides.append(route)

result = []
for idx, parts in enumerate(slides, 1):
    s = ('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" '
         # 1800×1100 slide fitted to the 1920×1080 frame (scale 0.982), white side bands
         'width="1920" height="1080" viewBox="-77.78 0 1955.56 1100">\n' + DEFS + '\n'
         '<rect x="-78" width="1956" height="1100" fill="white"/>\n' + '\n'.join(parts) + '\n</svg>')
    s = re.sub(r'(<style>|\})(text|\.body|\.serif|\.muted|\.ink|\.paint|\.label)\{', lambda m: f'{m.group(1)}.sa-s{idx} {m.group(2)}{{', s)
    s = s.replace('xlink:href="DATA"', 'xlink:href="__PIGMENT__"')
    s = s.replace('id="arrow"', f'id="s{idx}-arrow"').replace('id="pigment"', f'id="s{idx}-pigment"')
    s = s.replace('url(#arrow)', f'url(#s{idx}-arrow)').replace('url(#pigment)', f'url(#s{idx}-pigment)')
    assert 'DATA' not in s and s.count('<g') == s.count('</g>'), idx
    result.append(s)

with open(out, 'w') as f:
    f.write('// Generated by videos/smallest-agent/build-svgs.py from the user-supplied SVGs (dumping/all-svg-image-codes copy.txt).\n')
    f.write('// Reveal groups are <g data-r="key">; __PIGMENT__ is swapped for the texture URL at runtime. Do not hand-edit.\n\n')
    f.write('export const SMALLEST_AGENT_SVGS: string[] = ' + json.dumps(result, indent=2) + ';\n')
print('ok', [r.count('data-r') for r in result])
