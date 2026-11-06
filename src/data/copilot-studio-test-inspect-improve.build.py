#!/usr/bin/env python3
"""Generate src/data/copilot-studio-test-inspect-improve.ts + slideshow background video.

All times below are VO seconds (unpadded audio). Composition time = VO + 3s (90-frame title card).
"""
import json, subprocess, sys, os

ROOT = '/home/user/lwai-video-template'
N = 'copilot-studio-test-inspect-improve'
PAD = 3.0
END_VO = 469.83 + 2.0  # last word end + tail

def F(t):  # VO seconds -> composition frame
    return round((t + PAD) * 30)

# --- scene list ------------------------------------------------------------
# ('clip', start_vo, [(start_vo, shot), ...], zoomKFs[(start_vo, scale, ox, oy)])
# ('slide', start_vo, dict-of-scene-props, {timingKey: [vo seconds]})
S = []
def walk(t, first, events, zooms=None, cursor=None, note=''):
    S.append(('walk', t, first, events, zooms or [], cursor, note))
def slide(t, props, timings=None, note=''):
    S.append(('slide', t, props, timings or {}, note))

walk(0.0, '01-agent-overview', cursor=(1240, 760), note='The agent and its limits', zooms=[(-1, 1.0, 50, 50), (1.0, 1.35, 20, 30)], events=[
    (11.4, 649, 273, 'hover', None),
])
slide(19.0, dict(layout='label-title-body', label='TODAY', title='Three things\nto check',
                 body=['Outcome accuracy: did the agent get the recommendation right?',
                       'Process execution: did it follow the expected process?',
                       'Boundaries: did it stay within its limits?'],
                 bodyRight=True, bodyCards=True, bodyCardIcons=['check', 'sliders', 'eye']),
      {'bodyTimings': [26.72, 29.28, 31.66]}, 'Three checks')
walk(39.6, '02-evaluation-entry', cursor=(964, 69), note='New evaluation, single response, write', events=[
    (42.3, 175, 132, 'click', '03-single-response'),
    (49.4, 144, 217, 'click', None),
    (51.6, 849, 661, 'click', '04-add-questions-write'),
    (53.5, 101, 284, 'click', None),
])
slide(56.2, dict(layout='label-title-body', label='THREE TEST CASES', title='Three decisions,\nthree expected answers',
                 body=["Taylor's launch checklist: Update. Tracker says November 5, approved notes say November 9",
                       "Chris's onboarding FAQs: New Action, only after a tracker check finds no match",
                       'Customer escalation: Needs Clarification. No owner or deadline confirmed'],
                 bodyRight=True, bodyCards=True, bodyCardIcons=['pencil', 'sparkles', 'chat-bubble-left-right']),
      {'bodyTimings': [59.98, 75.88, 86.30]}, 'Three decisions')
walk(95.8, '05-three-test-cases', cursor=(1678, 284), note='Test cases, method, score, profile',
     zooms=[(-1, 1.0, 50, 50), (97.0, 1.3, 4, 32), (108.6, 1.0, 50, 50)], events=[
    (110.0, 1676, 283, 'click', None),
    (116.7, 1575, 447, 'click', '06-test-methods'),
    (118.5, 1068, 349, 'click', None),
    (124.4, 1327, 835, 'click', '07-pass-score'),
    (126.4, 940, 571, 'hover', None),
    (131.6, 1187, 623, 'click', '09-ready-to-run'),
    (135.0, 1569, 388, 'hover', None),
    (138.1, 1583, 581, 'click', '08-profile-and-connections'),
    (144.2, 1187, 671, 'click', '09-ready-to-run'),
    (145.3, 1783, 913, 'click', None),
])
walk(146.2, '17-baseline-three-passes', cursor=(1783, 913), note='Baseline: three passes', events=[
    (147.6, 1500, 240, 'hover', None),
    (158.1, 369, 376, 'click', '13-new-action-result'),
    (160.4, 324, 227, 'click', '12-clarification-result'),
])
slide(163.3, dict(layout='big-statement', label='OUTCOME ACCURACY', text='The score is only\nthe starting point',
                  highlight='starting point', fontSize=96, animation='kinetic'), {}, 'Score is the start')
walk(171.4, '17-baseline-three-passes', cursor=(1871, 123), note='Taylor result, activity map',
     zooms=[(-1, 1.0, 50, 50), (186.0, 1.5, 38, 50), (191.8, 1.5, 38, 32), (196.6, 1.0, 50, 50)], events=[
    (172.1, 369, 432, 'click', '18-update-result'),
    (181.1, 1723, 185, 'click', '19-activity-tracker-outputs'),
])
slide(198.7, dict(layout='label-title-body', label='READ THE EVIDENCE', title='Retrieval problem\nor matching problem?',
                  body=['Record never reached the agent: a retrieval problem. New matching instructions will not fix it',
                        'Right record, misread: a matching problem. Look at the matching instructions'],
                  bodyRight=True, bodyCards=True, bodyCardIcons=['x', 'compare']),
      {'bodyTimings': [203.12, 208.24]}, 'Retrieval vs matching')
walk(214.2, '22-tools-boundaries', cursor=(686, 67), note='Inside the agent flow', events=[
    (218.4, 215, 281, 'click', '14-flow-run-history'),
    (222.1, 197, 243, 'click', '15-retrieval-only-flow'),
    (226.3, 855, 231, 'hover', None),
    (227.8, 793, 351, 'hover', None),
    (229.0, 783, 471, 'hover', None),
    (238.2, 831, 591, 'click', '16-flow-response-body'),
    (240.3, 1176, 637, 'click', None),
])
walk(250.5, '22-tools-boundaries', cursor=(1176, 637), note='Boundaries: tools + SharePoint',
     zooms=[(-1, 1.0, 50, 50), (262.0, 1.5, 50, 40)], events=[
    (253.0, 215, 281, 'hover', None),
    (255.4, 1763, 326, 'hover', None),
    (259.7, None, None, 'cut', '29-tracker-after-tests'),
    (265.4, 875, 452, 'hover', None),
])
slide(277.0, dict(layout='big-statement', label='WHAT NEEDS IMPROVEMENT?', text='No demonstrated problem?\nPreserve the baseline.',
                  highlight='Preserve the baseline.', fontSize=88, animation='kinetic'), {}, 'Preserve the baseline')
slide(293.2, dict(layout='label-title-body', label='WHEN A TEST FAILS', title='Let the evidence\npoint to the fix',
                  body=['Wrong or missing source: check knowledge or retrieval',
                        "Tool not called: check the tool's availability, description and instructions",
                        'Right record, wrong classification: check the matching instructions',
                        'Missing evaluation settings: repair the test',
                        'Good clarification graded as a failure: revise the criteria'],
                  bodyRight=True, bodyCards=True, bodyCardCompact=True,
                  bodyCardIcons=['eye', 'bolt', 'compare', 'pencil', 'sliders']),
      {'bodyTimings': [297.69, 301.59, 306.65, 311.27, 314.65]}, 'Symptom -> where to look')
slide(320.4, dict(layout='label-title-body', label='BEFORE YOU CHANGE THE AGENT', title='Check that the\ntest is valid',
                  body=['Keyword match with no keywords: an Invalid result points to the test, not the agent',
                        'Missing source information: asking for clarification may be the right answer'],
                  bodyRight=True, bodyCards=True, bodyCardIcons=['x', 'chat-bubble-left-right']),
      {'bodyTimings': [324.75, 333.39]}, 'Check the test first')
slide(341.2, dict(layout='big-statement', text='One targeted change,\nto the responsible component',
                  highlight='One targeted change,', fontSize=80, animation='kinetic'), {}, 'One targeted change')
walk(347.2, '17-baseline-three-passes', cursor=(1871, 123), note='Rerun and compare',
     zooms=[(-1, 1.0, 50, 50), (369.0, 1.25, 40, 50)], events=[
    (349.6, 1837, 181, 'click', '20-repeat-run-profile'),
    (352.5, 1187, 671, 'click', '25-test-sets-and-history'),
    (360.1, None, None, 'cut', '26-repeat-three-passes'),
    (364.4, 1383, 203, 'click', '27-run-comparison'),
    (366.0, 368, 448, 'click', '28-case-comparison'),
    (367.4, 969, 135, 'click', None),
])
slide(390.0, dict(layout='label-title-body', label='RERUN THE SAME CASES', title='Repeatability now,\nregressions later',
                  body=['No change made: same results show repeatability',
                        'After a targeted change: the same cases catch regressions'],
                  bodyRight=True, bodyCards=True, bodyCardIcons=['check', 'trending']),
      {'bodyTimings': [390.13, 394.17]}, 'Repeatability vs regressions')
walk(401.8, '29-tracker-after-tests', cursor=(1300, 700), note='Final SharePoint check', zooms=[(-1, 1.5, 50, 40)], events=[
    (406.6, 875, 452, 'hover', None),
])
walk(410.5, '22-tools-boundaries', cursor=(875, 452), note='Monitor',
     zooms=[(-1, 1.0, 50, 50), (413.0, 1.3, 50, 20), (423.0, 1.0, 50, 50)], events=[
    (411.6, 1045, 67, 'click', '23-monitor-overview'),
    (434.7, 1665, 121, 'click', '24-monitor-sessions'),
])
slide(439.6, dict(layout='big-statement', label='MONITOR', text="Frequent clarification isn't\nautomatically a problem",
                  highlight='automatically a problem', fontSize=80, animation='kinetic'), {}, 'Clarification can be right')
slide(449.1, dict(layout='process-steps', label='THE IMPROVEMENT LOOP', title='Improve based on evidence',
                  steps=[dict(title='Test', body='run defined cases'),
                         dict(title='Inspect', body='read the evidence'),
                         dict(title='Improve', body='when evidence warrants it'),
                         dict(title='Retest', body='same cases, same threshold')],
                  horizontal=True, cardStyle=True),
      {'stepTimings': [450.4, 451.2, 452.3, 455.1]}, 'The loop')
slide(456.2, dict(layout='label-title-body', label='THREE TOOLS', title='Evidence,\nnot guesswork',
                  body=['Evaluation: checks your defined expectations',
                        'Activity: investigates individual runs',
                        'Monitor: shows patterns over time'],
                  bodyRight=True, bodyCards=True, bodyCardIcons=['check', 'eye', 'trending']),
      {'bodyTimings': [456.39, 459.51, 462.69]}, 'Evaluation / Activity / Monitor')

# --- emit -------------------------------------------------------------------
starts = [s[1] for s in S] + [END_VO]
lines = []
total = 90
lines.append(f"    {{\n      layout: 'title-card-green',\n      label: 'COPILOT STUDIO',\n      title: 'Test, Inspect, and Improve\\nYour Agent',\n      durationInFrames: 90,\n    }},")
table = [f" 1  title-card-green                      |   -3.00 |    0 |   90"]
for i, s in enumerate(S):
    f0, f1 = F(starts[i]), F(starts[i + 1])
    dur = f1 - f0
    total += dur
    kind = s[0]
    table.append(f"{i+2:2d}  {kind:5s} {s[-1][:32]:32s} | {starts[i]:7.2f} | {f0:5d} | {dur:4d}")
    if kind == 'walk':
        _, t, first, events, zooms, cursor, note = s
        IMG = f'{N}/images/'
        shots = [{'src': IMG + first + '.png', 'from': 0}]
        evs = []
        for (et, x, y, k, nxt) in events:
            ef = F(et) - f0
            if k == 'cut':
                shots.append({'src': IMG + nxt + '.png', 'from': ef})
                continue
            ev = {'frame': ef, 'x': x, 'y': y}
            if k == 'click':
                ev['click'] = True
            evs.append(ev)
            if nxt:
                shots.append({'src': IMG + nxt + '.png', 'from': ef + 5})
        sc = {'layout': 'screenshot-walkthrough', 'shots': shots, 'events': evs}
        if cursor:
            sc['cursorStart'] = {'x': cursor[0], 'y': cursor[1]}
        if zooms:
            sc['zoomKeyframes'] = [{'startFrame': -30 if zt == -1 else F(zt) - f0, 'scale': z, 'originX': ox, 'originY': oy}
                                   for (zt, z, ox, oy) in zooms]
        sc['logoPosition'] = 'bottom-left'
        sc['durationInFrames'] = dur
        body = json.dumps(sc, ensure_ascii=False, indent=2).replace('\n', '\n    ')
        lines.append(f"    // {i+2} {note} (VO {t:.2f}s, comp f{f0})\n    {body},")
    else:
        _, t, props, timings, note = s
        p = dict(props)
        if 'body' in p and p.get('bodyCards'):
            p['body'] = [b.split(': ',1)[0] + ': ' + b.split(': ',1)[1][:1].upper() + b.split(': ',1)[1][1:] if ': ' in b else b for b in p['body']]
        for k, v in timings.items():
            p[k] = [max(0, F(x) - f0) for x in v]
        p['durationInFrames'] = dur
        body = json.dumps(p, indent=2, ensure_ascii=False).replace('\n', '\n    ')
        lines.append(f"    // {i+2} {note} (VO {t:.2f}s, comp f{f0})\n    {body},")

header = f"""import {{ VideoData }} from '../scenes/types';

// Copilot Studio: Test, Inspect, and Improve Your Agent (Weekly Team Action Follow-Up agent).
// GENERATED by a build script from word timings; edit timings in VO seconds, not frames.
// Audio: audio/{N}.padded.mp3 = 3.0s silence + audio/{N}.mp3 (Daan, eleven_v4, two halves joined
//        with 0.6s gap). audioStartFrame 90 trims the padding, so VO t=0 plays at comp f90.
// Transcript (unpadded VO seconds, ElevenLabs Scribe): src/data/{N}.transcript.json
// Screens: screenshot-walkthrough scenes over public/{N}/images/*.png, with an animated cursor,
//        clicks timed to the narration, and click-origin transitions between screenshots.
// comp_frame = round((vo_t + 3.0) * 30)
//
//  #   kind  scene                            |  VO (s) | comp f | dur
""" + '\n'.join('//  ' + r for r in table) + f"\n//                                               total  {total}\n"

ts = header + f"""
export const copilotStudioTestInspectImprove: VideoData = {{
  audioSrc: 'audio/{N}.padded.mp3',
  audioStartFrame: 90,
  scenes: [
""" + '\n'.join(lines) + "\n  ],\n};\n"
open(f'{ROOT}/src/data/{N}.ts', 'w').write(ts)

print('total frames', total, 'seconds', total / 30)
