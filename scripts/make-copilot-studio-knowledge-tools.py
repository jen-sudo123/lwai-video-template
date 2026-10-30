#!/usr/bin/env python3
"""Generate src/data/copilot-studio-knowledge-tools.ts (screen-demo build, lwai-screen-demo method).

Scene boundaries are fixed composition frames; every effect inside a scene is anchored to the
word it shows, looked up in the Scribe transcript. Rects are [x, y, w, h] in screenshot pixels.
Edit here and re-run rather than hand-editing the generated file:
  python3 scripts/make-copilot-studio-knowledge-tools.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WORDS = json.loads((ROOT / 'src/data/copilot-studio-knowledge-tools.transcript.json').read_text())['words']
IMG = 'copilot-studio-knowledge-tools/images/'
SMALL, BIG = [1110, 610], [2844, 1560]
SHOTS = {
    '01': ('01-build-plan-section-3.png', SMALL), '02': ('02-agent-overview-before.png', SMALL),
    '03': ('03-knowledge-empty.png', SMALL), '04': ('04-add-knowledge-options.png', SMALL),
    '05': ('05-sharepoint-authenticated-source.png', SMALL), '08': ('08-existing-tools.png', BIG),
    '09': ('09-read-tool-credentials.png', BIG), '10': ('10-fixed-site-and-list-before-save.png', BIG),
    '12': ('12-approved-meeting-notes-selected.png', BIG), '13': ('13-meeting-notes-source-metadata.png', BIG),
    '14': ('14-knowledge-source-added.png', BIG), '16': ('16-resource-instructions-entered.png', BIG),
    '17': ('17-resource-instructions-saved.png', BIG), '20': ('20-source-ready-and-test-prompt.png', BIG),
    '21': ('21-knowledge-retrieval-completed.png', BIG),
}
END = 14790


def norm(t):
    return re.sub(r"[^a-z0-9']", '', t.lower().replace('\u2019', "'")).strip("'")


def W(phrase, after=0):
    """Composition frame of the first word of `phrase` at or after composition frame `after`."""
    seq = [norm(p) for p in phrase.split()]
    for i, w in enumerate(WORDS):
        if round(w['start'] * 30) < after:
            continue
        if [norm(x['text']) for x in WORDS[i:i + len(seq)]] == seq:
            return round(w['start'] * 30)
    raise ValueError(f'{phrase!r} not found after f{after}')


class Demo:
    """Collects one screen-demo scene; all public frame arguments are composition frames."""

    def __init__(self, start, label):
        self.start, self.label, self.steps, self.shots = start, label, [], []

    def L(self, f):
        return f - self.start

    def step(self, f, text, label=None):
        s = {'from': max(0, self.L(f)), 'text': text}
        if label:
            s['label'] = label
        self.steps.append(s)

    def shot(self, f, key, cam, transition='fade'):
        name, size = SHOTS[key]
        sh = {'from': max(0, self.L(f)), 'image': IMG + name, 'imageSize': size, 'transition': transition,
              'camera': [{'frame': max(0, self.L(f)), 'x': cam[0], 'y': cam[1], 'zoom': cam[2]}]}
        self.shots.append(sh)
        return sh

    def move(self, f, x, y, zoom):  # the one camera move a shot may have
        self.shots[-1]['camera'].append({'frame': self.L(f), 'x': x, 'y': y, 'zoom': zoom})

    def box(self, f, rect, to=None):
        m = {'type': 'box', 'rect': rect, 'from': self.L(f)}
        if to is not None:
            m['to'] = self.L(to)
        self.shots[-1].setdefault('marks', []).append(m)

    def click(self, f, x, y, frm=None):
        """Cursor arrives from `frm` (default: down-right of the target) and clicks at frame f."""
        sx, sy = frm or (x + 160 * (2 if self.shots[-1]['imageSize'] == BIG else 1),
                         y + 110 * (2 if self.shots[-1]['imageSize'] == BIG else 1))
        self.shots[-1].setdefault('cursor', []).extend([
            {'frame': self.L(f) - 26, 'x': sx, 'y': sy}, {'frame': self.L(f), 'x': x, 'y': y, 'click': True}])

    def scene(self, end):
        return {'layout': 'screen-demo', 'label': self.label, 'steps': self.steps, 'shots': self.shots,
                'durationInFrames': end - self.start}


scenes = []  # (start frame, comment, scene dict)


def add(start, comment, scene):
    scenes.append((start, comment, scene))


def cards(label, title, body, timings, icons, start):
    d = {'layout': 'label-title-body', 'label': label, 'title': title, 'body': body,
         'bodyTimings': [t - start for t in timings], 'bodyRight': True, 'bodyCards': True, 'bodyCardIcons': icons}
    if len(body) >= 4:
        d['bodyCardCompact'] = True
    return d


def statement(text, highlight, label=None):
    d = {'layout': 'big-statement', 'text': text, 'highlight': highlight, 'fontSize': 80, 'animation': 'kinetic'}
    if label:
        d['label'] = label
    return d


# 1 — title
add(0, 'title', {'layout': 'title-card-green', 'label': 'COPILOT STUDIO',
                 'title': 'Give Your Agent the Knowledge and Tools It Needs'})

# 2 — Build Plan Section 3
d = Demo(108, 'BUILD PLAN')
d.step(108, 'Section 3: What does your agent need?')
d.shot(108, '01', (555, 305, 1))
d.box(W('section', 100), [300, 208, 312, 36])
add(108, 'Build Plan Section 3', d)

# 3 — instructions / knowledge / tools
s = 242
add(s, 'three building blocks', cards(
    'WHAT YOUR AGENT NEEDS', 'Three building\nblocks',
    ['Instructions: how the agent should work', 'Knowledge: information it can use',
     'Tools: specific operations, like retrieving records'],
    [s, W('knowledge sources', s), W('tools let', s)], ['pencil', 'lightbulb', 'bolt'], s))

# 4 — my example, on the Build Plan
d = Demo(648, 'MY EXAMPLE')
d.step(648, 'Approved meeting notes and an action tracker')
d.step(W('the first version', 648), 'First version: read, then propose for review')
d.shot(648, '01', (555, 305, 1))
d.box(W('approved weekly', 648), [300, 248, 372, 64], to=W('the first version', 648))
d.box(W('the first version', 648), [300, 318, 505, 42])
add(648, 'my example', d)

# 5 — knowledge source, end to end
d = Demo(978, 'KNOWLEDGE')
d.step(978, 'Weekly Team Action Follow-Up Demo')
d.step(W('separate overview', 978), 'Overview, Knowledge and Tools tabs')
d.shot(978, '02', (555, 305, 1))
d.box(W('separate overview', 978), [382, 66, 296, 32])
f = W('open knowledge', 978)
d.step(f, 'Knowledge: Add knowledge')
d.shot(f, '03', (555, 305, 1))
d.box(f, [440, 60, 86, 44], to=W('add knowledge', f))
d.box(W('add knowledge', f), [268, 434, 130, 32])
d.click(W('add knowledge', f) + 12, 333, 450)
f = W('under featured', 978)
d.step(f, 'Under Featured, choose SharePoint')
d.shot(f, '04', (555, 330, 1.15))
d.box(f + 10, [360, 394, 186, 46])
d.click(W('sharepoint', f), 432, 417)
f = W('the dialog tells', 978)
d.step(f, 'Only authenticated users can use it')
d.step(W('for your own agent', f), 'Check your users can open the content')
d.shot(f, '05', (555, 280, 1.2))
d.box(W('authenticated', f), [214, 104, 360, 26])
d.box(W('browse items', f), [180, 163, 92, 30])
d.click(W('browse items', f) + 10, 225, 178)
f = W('navigate', 978)
d.step(f, 'FlexOS Global Ltd. > Documents')
d.shot(f, '12', (1500, 860, 1.25))
d.box(W('documents', f), [846, 412, 500, 58], to=W('weekly meeting notes', f + 60))
d.step(W('weekly meeting notes', f + 60), 'Select Weekly Meeting Notes, November 3')
d.box(W('weekly meeting notes', f + 60), [846, 936, 1462, 104])
d.step(W('confirm selection', f), 'Confirm selection')
d.click(W('confirm selection', f) + 10, 2020, 1422)
f = W('name the source', 978) - 10
d.step(f, 'Name: Approved Weekly Meeting Notes')
d.shot(f, '13', (1720, 800, 1.3))
d.box(W('approved weekly meeting notes', f), [1104, 716, 606, 70])
d.step(W('the description explains', f), 'Describe what it holds and how to use it')
d.box(W('the description explains', f), [1736, 716, 606, 70])
d.step(W('add to agent', f), 'Add to agent')
d.move(W('add to agent', f) - 30, 1720, 1150, 1.3)
d.click(W('add to agent', f) + 8, 2094, 1486)
f = W('the source is now', 978)
d.step(f, 'Listed under Knowledge')
d.shot(f, '14', (1300, 700, 1.3))
d.box(f + 6, [176, 556, 1676, 80])
d.step(W('later on overview', f), 'Ready is confirmed later, on Overview')
add(978, 'knowledge source', d)

# 6 — setup check vs test
add(3559, 'setup check vs test', statement('Ready is a setup check.\nTesting proves retrieval.',
                                           'Testing proves retrieval.'))

# 7 — for your workflow: sources
s = 3784
add(s, 'your sources', {
    'layout': 'converge', 'label': 'FOR YOUR WORKFLOW', 'title': 'Connect the source\nyour workflow needs',
    'titleTimings': [3, W('use the source', s) - s], 'titleHighlight': 'your workflow needs',
    'sources': [
        {'text': 'Approved Weekly Meeting Notes', 'tag': 'MY EXAMPLE', 'icon': 'DocumentTextIcon', 'from': 3},
        {'text': 'A policy document', 'icon': 'ShieldCheckIcon', 'from': W('policy', s) - s},
        {'text': 'Project files', 'icon': 'FolderIcon', 'from': W('project files', s) - s},
        {'text': 'Reference materials', 'icon': 'BookOpenIcon', 'from': W('reference materials', s) - s},
        {'text': 'Another approved source', 'icon': 'SparklesIcon', 'dashed': True, 'from': W('or another', s) - s},
    ],
    'target': {'label': 'CONNECT YOUR APPROVED SOURCE', 'steps': [
        {'text': 'Connect what your Build Plan names', 'icon': 'LinkIcon'},
        {'text': 'Describe what it holds', 'icon': 'PencilSquareIcon'},
        {'text': 'Test that it retrieves', 'icon': 'CheckBadgeIcon'}]},
    'convergeFrom': W('use the source', s) - s})

# 8 — tools
d = Demo(4216, 'TOOLS')
d.step(4216, 'Back to Section 3: Tools and actions')
d.shot(4216, '01', (555, 305, 1))
d.box(W('tools and actions', 4216), [300, 318, 505, 42])
d.step(W('in our example', 4400), 'Retrieve commitments from a SharePoint list')
f = W('open the tools tab', 4216) - 4
d.step(f, 'Tools: Get items is already connected')
d.shot(f, '08', (1300, 640, 1.25), transition='slide')
d.box(W('sharepoint get items', f), [176, 683, 1720, 88], to=W('add a tool', f))
d.step(W('add a tool', f), 'Not connected yet? Start with Add a tool')
d.box(W('add a tool', f), [172, 306, 248, 72], to=W('get items reads', f))
d.step(W('get items reads', f), 'Get items only reads records')
d.box(W('get items reads', f), [176, 683, 1720, 88], to=W('there is also', f))
d.step(W('there is also', f), 'Create Approved Follow-Up Action: not run here')
d.box(W('there is also', f), [176, 595, 1720, 88])
d.click(W('open the read tool', f), 330, 727)
f = W('open the read tool', 4216) + 20
d.step(f, 'Open the read tool')
d.shot(f, '09', (1000, 820, 1.35))
d.step(W('credentials to use', f), 'Credentials: End user credentials')
d.box(W('credentials to use', f), [578, 650, 760, 150], to=W('ask the end user', f))
d.step(W('ask the end user', f), 'Ask the end user before running: No')
d.box(W('ask the end user', f), [578, 466, 760, 156])
d.step(W('the creation flow', f), 'The create flow asks for approval first')
add(4216, 'tools', d)

# 9 — confirmation matches effect
add(6209, 'confirmation', statement('Match confirmation\nto the effect', 'the effect', label='FOR YOUR WORKFLOW'))

# 10 — tool details (no screenshot of the rename)
s = 6374
add(s, 'tool details', cards(
    'TOOL DETAILS', 'Read Team\nAction Tracker',
    ['Retrieves: tasks, owners, due dates and statuses', 'Use it: before comparing commitments with existing actions',
     'Read-only: the tool only reads records'],
    [W('retrieves existing', s), W('it tells the agent', s), W('only reads', s)], ['eye', 'compare', 'check'], s))

# 11 — inputs
d = Demo(7116, 'INPUTS')
d.step(7116, 'Site Address: Custom value, the approved site')
d.shot(7116, '09', (1300, 1250, 1.35))
d.box(W('site address', 7116), [578, 1328, 1190, 84], to=W('list name initially', 7116))
d.step(W('list name initially', 7116), 'List Name starts as Dynamically fill with AI')
d.box(W('list name initially', 7116), [578, 1454, 1190, 92])
f = W("i'll change list name", 7116)
d.step(f, 'List Name: Custom value, Team Action Tracker')
d.shot(f, '10', (1300, 820, 1.3))
d.box(W('custom value and', f), [578, 962, 1194, 80], to=W('both inputs', f))
d.box(W('both inputs', f), [578, 826, 1194, 216], to=W("i'll click save", f))
d.step(W("i'll click save", f), 'Save the tool')
d.box(W("i'll click save", f), [1630, 286, 200, 72])
d.click(W('save to keep', f), 1730, 322)
add(7116, 'inputs', d)

# 12 — for your workflow: inputs
s = 7839
add(s, 'check inputs', cards(
    'FOR YOUR WORKFLOW', 'Check your\ntool inputs',
    ['Fixed or variable: which inputs depend on the request?',
     'Complete: does retrieval return everything the task needs?'],
    [s, W('retrieval returns', s)], ['sliders', 'check'], s))

# 13 — instructions
d = Demo(8307, 'INSTRUCTIONS')
d.step(8307, 'Back on Overview: Instructions')
d.shot(8307, '02', (555, 380, 1.15))
d.box(W('edit instructions', 8307), [100, 462, 582, 140])
d.click(W('edit instructions', 8307) + 8, 645, 484)
d.step(W('the instructions field', 8307), 'Empty in this demo: add resource-use steps')
d.step(W('for your own agent', 8500), 'Refine the steps that use information or tools')
f = W('first', 8900)
d.step(f, 'Approved Weekly Meeting Notes: cite, ask if unclear')
d.shot(f, '16', (1000, 1200, 1.3))
d.box(f + 6, [300, 1054, 1378, 116], to=W('next', f + 10))
f2 = W('next', f + 10)
d.step(f2, 'Read Team Action Tracker: before comparing')
d.box(f2, [300, 1214, 1378, 116], to=W('finally', f2))
d.move(f2, 1000, 1260, 1.3)
f3 = W('finally', f2)
d.step(f3, 'Propose for review; create only after approval')
d.box(f3, [300, 1372, 1378, 160], to=W("i'm using the resources", f3))
d.step(W("i'm using the resources", f3), 'Use the exact configured names')
d.step(W('then save', f3), 'Save the instructions')
d.box(W('then save', f3), [1582, 894, 136, 60])
d.click(W('then save', f3) + 14, 1650, 924)
f = W('then save', f3) + 40
d.shot(f, '17', (1000, 1150, 1.25))
d.box(f + 6, [284, 972, 1412, 440])
add(8307, 'instructions', d)

# 14 — ready to test
d = Demo(10896, 'TEST')
d.step(10896, 'Overview: the source shows Ready')
d.shot(10896, '20', (1250, 1000, 1.3))
d.box(W('shows ready', 10896), [1484, 856, 148, 56], to=W('we can also', 10896))
d.step(W('we can also', 10896), 'Read Team Action Tracker under Tools')
d.box(W('we can also', 10896), [278, 1458, 424, 60], to=W("i'll use test", 10896))
d.move(W('we can also', 10896), 1250, 1150, 1.3)
d.move(W("i'll use test", 10896) - 20, 2100, 700, 1.2)
d.step(W("i'll use test", 10896), 'Test: open the Test your agent pane')
d.click(W("i'll use test", 10896) + 14, 2744, 210, frm=(2400, 520))
add(10896, 'ready to test', d)

# 15 — tracker test (no screenshot)
s = 11353
add(s, 'test 1', cards(
    'TEST 1: THE TOOL', 'Read Team Action\nTracker completed',
    ['Asked: show task, owner, due date and status, change nothing',
     'Result: execution details show the tool completed',
     'Still to do: check its output against the live list'],
    [s, W('the execution details', s), W('checking its output', s)], ['chat-bubble-left-right', 'check', 'eye'], s))

# 16 — knowledge test
d = Demo(11955, 'TEST 2')
d.step(11955, 'Test the knowledge source')
d.shot(11955, '20', (2100, 1100, 1.35))
d.step(W("i'll ask the agent", 11955), 'Summarize Nov 3 commitments, cite the source')
d.box(W("i'll ask the agent", 11955), [1906, 1032, 806, 316])
f = W('the first attempt', 11955)
d.step(f, 'First attempt: Unable to connect')
d.shot(f, '21', (1000, 900, 1.25))
d.step(W('on retry', f), 'On retry: Search sources completed')
d.box(W('on retry', f), [230, 720, 1572, 512], to=W('read team action tracker also', f))
d.step(W('read team action tracker also', f), 'Read Team Action Tracker also completed')
d.box(W('read team action tracker also', f), [278, 376, 1010, 46])
add(11955, 'knowledge test', d)

# 17 — verified commitments
s = 12798
add(s, 'verified', cards(
    'TEST 2: VERIFIED', 'Three commitments,\nall match the notes',
    ['Taylor: launch readiness checklist, November 9', 'Chris: onboarding FAQs, November 10',
     'Customer escalation: no owner or deadline yet'],
    [W("taylor's", s), W("chris's", s), W('customer escalation', s)], ['user', 'user', 'x'], s))

# 18 — the cited answer
d = Demo(13331, 'TEST 2')
d.step(13331, 'Completed retrieval and part of the cited answer')
d.shot(13331, '21', (2000, 900, 1.3))
d.box(13337, [1886, 870, 676, 280])
d.step(W('the remaining commitments', 13331), 'The rest checked against the original document')
d.step(W('no write tool', 13331), 'No write tool in the execution')
d.box(W('no write tool', 13331), [230, 720, 1572, 512])
d.move(W('no write tool', 13331), 1400, 900, 1.2)
add(13331, 'cited answer', d)

# 19 — for your workflow: testing
s = 13659
add(s, 'test your own', cards(
    'FOR YOUR WORKFLOW', 'Small, specific,\nsafe requests',
    ['Know: what the correct result should be', 'Inspect: the available execution information',
     'Compare: the response with the original source',
     'If it fails: record the error, then check connection, status, access'],
    [W('know what', s), W('inspect', s), W('compare', s), W('if a test fails', s)],
    ['lightbulb', 'eye', 'compare', 'x'], s))

# 20, 21 — close
add(14320, 'goal', statement('Verify what works.\nName what still needs attention.', 'Name what still needs attention.'))
add(14593, 'next', statement('Next: review your\nhuman-control boundaries', 'human-control boundaries', label='NEXT LESSON'))

# ---- emit ----
out, starts = [], [s for s, _, _ in scenes] + [END]
for i, (start, comment, sc) in enumerate(scenes):
    sc = sc.scene(starts[i + 1]) if isinstance(sc, Demo) else dict(sc, durationInFrames=starts[i + 1] - start)
    assert sc['durationInFrames'] > 0, (start, comment)
    out.append((start, comment, sc))
assert sum(sc['durationInFrames'] for _, _, sc in out) == END

table = '\n'.join(f"//  {i + 1:<2} {sc['layout']:<17} {sc.get('label', ''):<20} | {st / 30:7.2f} | {sc['durationInFrames']:5}"
                  for i, (st, _, sc) in enumerate(out))
body = ',\n'.join(f"    // {i + 1} ({st / 30:.2f}s) {c}\n" + '\n'.join('    ' + l for l in json.dumps(sc, indent=2, ensure_ascii=False).splitlines())
                  for i, (st, c, sc) in enumerate(out))
ts = f"""import {{ VideoData }} from '../scenes/types';

// Give Your Agent the Knowledge and Tools It Needs (Copilot Studio, Build Plan Section 3), demo rebuild.
// GENERATED by scripts/make-copilot-studio-knowledge-tools.py: edit that and re-run.
// Audio: audio/copilot-studio-knowledge-tools.mp3 (ElevenLabs Daan, eleven_v4, two takes joined with 0.8s
// silence at 276.11s), NOT padded (audioStartFrame = 0). Timings from the Scribe word timestamps in
// copilot-studio-knowledge-tools.transcript.json; comp_frame = round(t * 30).
// Screenshots: copilot-studio-knowledge-tools/images/ (Drive walkthrough folder; captured pointer removed with
// scripts/remove-captured-pointer.py + scripts/transplant-text.py). 06 (wrong site) is not used.
//
//  #  layout            label                | start s | frames
{table}
//                                                       total {END}

export const copilotStudioKnowledgeTools: VideoData = {{
  audioSrc: 'audio/copilot-studio-knowledge-tools.mp3',
  audioStartFrame: 0,
  scenes: [
{body}
  ],
}};
"""
(ROOT / 'src/data/copilot-studio-knowledge-tools.ts').write_text(ts)
print(f'{len(out)} scenes, {END} frames')
