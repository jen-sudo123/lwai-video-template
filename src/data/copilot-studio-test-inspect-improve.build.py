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
def clip(t, shots, zooms=None, note=''):
    S.append(('clip', t, shots, zooms or [], note))
def slide(t, props, timings=None, note=''):
    S.append(('slide', t, props, timings or {}, note))

clip(0.0, [(0.0, '01-agent-overview')],
     [(-1, 1.0, 50, 50), (1.0, 1.35, 20, 30)], 'The agent and its limits')
slide(19.0, dict(layout='label-title-body', label='TODAY', title='Three things\nto check',
                 body=['Outcome accuracy: did the agent get the recommendation right?',
                       'Process execution: did it follow the expected process?',
                       'Boundaries: did it stay within its limits?'],
                 bodyRight=True, bodyCards=True, bodyCardIcons=['check', 'sliders', 'eye']),
      {'bodyTimings': [26.72, 29.28, 31.66]}, 'Three checks')
clip(39.6, [(39.6, '02-evaluation-entry'), (48.6, '03-single-response'), (52.9, '04-add-questions-write')],
     [], 'New evaluation, single response, write')
slide(56.2, dict(layout='label-title-body', label='THREE TEST CASES', title='Three decisions,\nthree expected answers',
                 body=["Taylor's launch checklist: Update. Tracker says November 5, approved notes say November 9",
                       "Chris's onboarding FAQs: New Action, only after a tracker check finds no match",
                       'Customer escalation: Needs Clarification. No owner or deadline confirmed'],
                 bodyRight=True, bodyCards=True, bodyCardIcons=['pencil', 'sparkles', 'chat-bubble-left-right']),
      {'bodyTimings': [59.98, 75.88, 86.30]}, 'Three decisions')
clip(95.8, [(95.8, '05-three-test-cases'), (112.8, '06-test-methods'), (123.9, '07-pass-score'),
            (131.3, '09-ready-to-run'), (136.4, '08-profile-and-connections')],
     [(-1, 1.0, 50, 50), (97.0, 1.3, 4, 32), (109.6, 1.0, 50, 50)], 'Test cases, method, score, profile')
clip(146.2, [(146.2, '17-baseline-three-passes'), (158.0, '13-new-action-result'), (160.2, '12-clarification-result')],
     [], 'Baseline: three passes')
slide(163.3, dict(layout='big-statement', label='OUTCOME ACCURACY', text='The score is only\nthe starting point',
                  highlight='starting point', fontSize=96, animation='kinetic'), {}, 'Score is the start')
clip(171.4, [(171.4, '18-update-result'), (179.5, '19-activity-tracker-outputs')],
     [(-1, 1.0, 50, 50), (186.0, 1.5, 38, 50), (191.8, 1.5, 38, 32), (196.6, 1.0, 50, 50)], 'Taylor result, activity map')
slide(198.7, dict(layout='label-title-body', label='READ THE EVIDENCE', title='Retrieval problem\nor matching problem?',
                  body=['Record never reached the agent: a retrieval problem. New matching instructions will not fix it',
                        'Right record, misread: a matching problem. Look at the matching instructions'],
                  bodyRight=True, bodyCards=True, bodyCardIcons=['x', 'compare']),
      {'bodyTimings': [203.12, 208.24]}, 'Retrieval vs matching')
clip(214.2, [(214.2, '14-flow-run-history'), (223.8, '15-retrieval-only-flow'), (235.1, '16-flow-response-body')],
     [], 'Inside the agent flow')
clip(250.5, [(250.5, '22-tools-boundaries'), (259.7, '29-tracker-after-tests')],
     [(-1, 1.0, 50, 50), (262.0, 1.5, 50, 40)], 'Boundaries: tools + SharePoint')
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
clip(347.2, [(347.2, '25-test-sets-and-history'), (350.8, '20-repeat-run-profile'), (360.1, '26-repeat-three-passes'),
             (364.0, '27-run-comparison'), (367.9, '28-case-comparison')],
     [(-1, 1.0, 50, 50), (369.0, 1.25, 40, 50)], 'Rerun and compare')
slide(390.0, dict(layout='label-title-body', label='RERUN THE SAME CASES', title='Repeatability now,\nregressions later',
                  body=['No change made: same results show repeatability',
                        'After a targeted change: the same cases catch regressions'],
                  bodyRight=True, bodyCards=True, bodyCardIcons=['check', 'trending']),
      {'bodyTimings': [390.13, 394.17]}, 'Repeatability vs regressions')
clip(401.8, [(401.8, '29-tracker-after-tests')], [(-1, 1.5, 50, 40)], 'Final SharePoint check')
clip(410.5, [(410.5, '23-monitor-overview'), (423.2, '24-monitor-sessions')],
     [(-1, 1.0, 50, 50), (412.0, 1.3, 50, 20), (423.0, 1.0, 50, 50)], 'Monitor')
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
slideshow = []  # (comp_frame_start, shot)
total = 90
lines.append(f"    {{\n      layout: 'title-card-green',\n      label: 'COPILOT STUDIO',\n      title: 'Test, Inspect, and Improve\\nYour Agent',\n      durationInFrames: 90,\n    }},")
slideshow.append((0, '01-agent-overview'))
table = [f" 1  title-card-green                      |   -3.00 |    0 |   90"]
for i, s in enumerate(S):
    f0, f1 = F(starts[i]), F(starts[i + 1])
    dur = f1 - f0
    total += dur
    kind = s[0]
    table.append(f"{i+2:2d}  {kind:5s} {s[4][:32]:32s} | {starts[i]:7.2f} | {f0:5d} | {dur:4d}")
    if kind == 'clip':
        _, t, shots, zooms, note = s
        for (ts, shot) in shots:
            slideshow.append((F(ts), shot))
        kfs = ''
        if zooms:
            items = []
            for (zt, sc, ox, oy) in zooms:
                sf = -30 if zt == -1 else F(zt) - f0
                items.append(f"{{ startFrame: {sf}, scale: {sc}, originX: {ox}, originY: {oy} }}")
            kfs = "\n      clipZoomKeyframes: [\n        " + ",\n        ".join(items) + ",\n      ],"
        lines.append(f"    // {i+2} {note} (VO {t:.2f}s, comp f{f0}) shots: {', '.join(x[1][:2] for x in shots)}\n"
                     f"    {{\n      layout: 'video-clip',\n      videoSrc: 'video/{N}/{N}.mp4',\n"
                     f"      videoStartTime: {f0/30:.2f},\n      logoPosition: 'bottom-left',{kfs}\n"
                     f"      durationInFrames: {dur},\n    }},")
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
// Background: video/{N}/{N}.mp4 = screenshot slideshow (public/{N}/images/*.png) whose timeline
//        equals the composition timeline (clipStartFrame 0); slides hide it.
// comp_frame = round((vo_t + 3.0) * 30)
//
//  #   kind  scene                            |  VO (s) | comp f | dur
""" + '\n'.join('//  ' + r for r in table) + f"\n//                                               total  {total}\n"

ts = header + f"""
export const copilotStudioTestInspectImprove: VideoData = {{
  audioSrc: 'audio/{N}.padded.mp3',
  audioStartFrame: 90,
  clipSrc: 'video/{N}/{N}.mp4',
  clipStartFrame: 0,
  scenes: [
""" + '\n'.join(lines) + "\n  ],\n};\n"
open(f'{ROOT}/src/data/{N}.ts', 'w').write(ts)

# slideshow concat list
concat = []
for j, (f0, shot) in enumerate(slideshow):
    f1 = slideshow[j + 1][0] if j + 1 < len(slideshow) else total
    concat.append(f"file '{ROOT}/public/{N}/images/{shot}.png'\nduration {(f1 - f0)/30:.6f}")
concat.append(f"file '{ROOT}/public/{N}/images/{slideshow[-1][1]}.png'")
open(ROOT+'/out/copilot-studio-test-inspect-improve.concat.txt', 'w').write('\n'.join(concat) + '\n')
print('total frames', total, 'seconds', total / 30)
# Rebuild background slideshow after editing shot timings:
#   ffmpeg -f concat -safe 0 -i out/copilot-studio-test-inspect-improve.concat.txt -vf "fps=30,format=yuv420p" \
#     -c:v libx264 -preset veryfast -crf 18 -tune stillimage -g 60 \
#     public/video/copilot-studio-test-inspect-improve/copilot-studio-test-inspect-improve.mp4
