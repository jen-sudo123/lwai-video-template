import { VideoData } from '../scenes/types';

// Microsoft Copilot Studio: Evaluate, Monitor and Improve Your Agent (theory lesson, Daan VO).
// Audio: audio/copilot-studio-evaluation.mp3, ElevenLabs VO, 315.17s, NOT padded
//        (title card plays over VO opening; audioStartFrame = 0). comp_frame = round(t * 30).
// Images: copilot-studio-evaluation/images/, screenshots from the
//        "Agent Testing Walkthrough, 2026-11-05, Take 2" set in gdrive:dumping.
// Transcript (ElevenLabs Scribe, word timestamps): src/data/copilot-studio-evaluation.transcript.json
// Timings generated from absolute word times; each comment lists the anchor words.
//
//  #  layout                     | start s | frames
//  1  title-card-green         |    0.00 |    90
//  2  label-title-body         |    3.00 |   375
//  3  label-title-body         |   15.50 |   504
//  4  big-statement            |   32.30 |   246
//  5  big-statement            |   40.50 |   243
//  6  label-title-body         |   48.60 |   390
//  7  label-title-body         |   61.60 |   363
//  8  three-mode-columns       |   73.70 |   609
//  9  label-title-body         |   94.00 |   510
//  10 process-steps            |  111.00 |   261
//  11 label-title-body         |  119.70 |   306
//  12 centered-image-caption   |  129.90 |   255
//  13 label-title-body         |  138.40 |   309
//  14 process-steps            |  148.70 |   315
//  15 comparison               |  159.20 |   189
//  16 label-title-body         |  165.50 |   315
//  17 label-title-body         |  176.00 |   129
//  18 comparison               |  180.30 |   255
//  19 takeaway-stack           |  188.80 |   285
//  20 big-statement            |  198.30 |   261
//  21 centered-image-caption   |  207.00 |   168
//  22 label-title-body         |  212.60 |   447
//  23 process-steps            |  227.50 |   264
//  24 label-title-body         |  236.30 |   264
//  25 label-title-body         |  245.10 |   357
//  26 label-title-body         |  257.00 |   339
//  27 label-title-body         |  268.30 |   351
//  28 big-statement            |  280.00 |   210
//  29 big-statement            |  287.00 |   129
//  30 takeaway-stack           |  291.30 |   522
//  31 big-statement            |  308.70 |   234
//                                  total   9495

export const copilotStudioEvaluation: VideoData = {
  audioSrc: 'audio/copilot-studio-evaluation.mp3',
  audioStartFrame: 0,
  scenes: [
        // 1 (0.00s = f0). Title over VO opening ("In the last lesson...")
{
      "layout": "title-card-green",
      "title": "Evaluate, Monitor and Improve Your Agent",
      "label": "MICROSOFT COPILOT STUDIO",
      "durationInFrames": 90
    },

        // 2 (3.00s = f90). Recap: agent flow + first test. "retrieve" 5.64 / "tested" 8.92 / "checked" 12.28
{
      "layout": "label-title-body",
      "label": "WHERE WE ARE",
      "title": "One test, one\nexpected result",
      "body": [
        "Agent flow: retrieves existing commitments from SharePoint",
        "First test: the example from your agent build plan",
        "The check: did it prepare the recommendations we expected?"
      ],
      "bodyTimings": [
        79,
        178,
        278
      ],
      "bodyRight": true,
      "bodyCards": true,
      "bodyCardIcons": [
        "bolt",
        "pencil",
        "check"
      ],
      "bodyCardCompact": true,
      "durationInFrames": 375
    },

        // 3 (15.50s = f465). One test is not enough. "missing" 24.84 / "task" 26.76 / "encounters" 29.62
{
      "layout": "label-title-body",
      "label": "ONE TEST ISN'T ENOUGH",
      "title": "How reliably will it\nhandle other situations?",
      "body": [
        "Missing information: what if key details are absent?",
        "Existing task: what if it is already in the tracker?",
        "Something new: what if it hasn't handled this before?"
      ],
      "bodyTimings": [
        280,
        338,
        424
      ],
      "bodyRight": true,
      "bodyCards": true,
      "bodyCardIcons": [
        "x",
        "compare",
        "sparkles"
      ],
      "bodyCardCompact": true,
      "durationInFrames": 504
    },

        // 4 (32.30s = f969). Repeatable way. "test" 35.82 / "inspect" 37.24 / "improve" 38.82
{
      "layout": "big-statement",
      "label": "WE NEED A REPEATABLE WAY TO",
      "text": "Test its decisions.\nInspect its actions.\nImprove its performance.",
      "highlight": "Improve",
      "fontSize": 84,
      "animation": "fade",
      "lineTimings": [
        98,
        140,
        188
      ],
      "durationInFrames": 246
    },

        // 5 (40.50s = f1215). Evaluation definition. "An evaluation" 43.20 / "defined" 47.02
{
      "layout": "big-statement",
      "label": "01 · EVALUATION",
      "text": "Does the agent behave as expected\nin a defined situation?",
      "highlight": "as expected",
      "fontSize": 76,
      "animation": "fade",
      "lineTimings": [
        81,
        188
      ],
      "durationInFrames": 243
    },

        // 6 (48.60s = f1458). Each test case. "situation" 50.98 / "result" 51.96 / "section" 55.38
{
      "layout": "label-title-body",
      "label": "EACH TEST CASE",
      "title": "Describe the situation\nand the result you expect",
      "body": [
        "Situation: what the agent is given to work with",
        "Expected result: what success should look like",
        "Your build plan: you started this in section 5"
      ],
      "bodyTimings": [
        71,
        101,
        203
      ],
      "bodyRight": true,
      "bodyCards": true,
      "bodyCardIcons": [
        "eye",
        "check",
        "pencil"
      ],
      "bodyCardCompact": true,
      "durationInFrames": 390
    },

        // 7 (61.60s = f1848). Meeting notes, three commitments. "Taylor's" 65.82 / "Chris'" 68.86 / "customer" 70.86
{
      "layout": "label-title-body",
      "label": "OUR EXAMPLE",
      "title": "Three commitments\nin the meeting notes",
      "body": [
        "Taylor: an existing task with a changed deadline",
        "Chris: a new commitment",
        "Customer escalation: missing owner and deadline"
      ],
      "bodyTimings": [
        127,
        218,
        278
      ],
      "bodyRight": true,
      "bodyCards": true,
      "bodyCardIcons": [
        "user",
        "user",
        "chat-bubble-left-right"
      ],
      "bodyCardCompact": true,
      "durationInFrames": 363
    },

        // 8 (73.70s = f2211). Three test cases. "Taylor" 78.12 / "Chris" 83.74 / "customer" 87.76
{
      "layout": "three-mode-columns",
      "label": "THREE TEST CASES",
      "title": "One expected decision each",
      "columns": [
        {
          "label": "TAYLOR",
          "title": "Update",
          "body": [
            "Existing task",
            "Deadline has changed"
          ]
        },
        {
          "label": "CHRIS",
          "title": "New action",
          "body": [
            "A new commitment",
            "Not yet in the tracker"
          ]
        },
        {
          "label": "CUSTOMER ESCALATION",
          "title": "Ask to clarify",
          "body": [
            "Owner is missing",
            "Deadline is missing"
          ]
        }
      ],
      "highlights": [
        {
          "from": 125,
          "value": 0
        },
        {
          "from": 293,
          "value": 1
        },
        {
          "from": 414,
          "value": 2
        },
        {
          "from": 561,
          "value": [
            0,
            1,
            2
          ]
        }
      ],
      "durationInFrames": 609
    },

        // 9 (94.00s = f2820). One decision per test. "easier" 98.00 / "repeat" 103.20 / "comparing" 107.96
{
      "layout": "label-title-body",
      "label": "WHY SEPARATE TESTS",
      "title": "Each test focuses on\none specific decision",
      "body": [
        "Pinpoint: where it performs well and where it needs work",
        "Repeat: same meeting notes, same SharePoint tracker",
        "Compare: results under consistent conditions"
      ],
      "bodyTimings": [
        120,
        276,
        419
      ],
      "bodyRight": true,
      "bodyCards": true,
      "bodyCardIcons": [
        "eye",
        "clock",
        "compare"
      ],
      "bodyCardCompact": true,
      "durationInFrames": 510
    },

        // 10 (111.00s = f3330). Three things to check. "outcome" 114.94 / "process" 116.34 / "boundary" 118.08
{
      "layout": "process-steps",
      "label": "WHEN WE EVALUATE",
      "title": "Three things to check",
      "steps": [
        {
          "title": "Outcome accuracy",
          "body": "Did it reach the right result?"
        },
        {
          "title": "Process execution",
          "body": "Did it follow the intended workflow?"
        },
        {
          "title": "Boundary compliance",
          "body": "Did it stay within its limits?"
        }
      ],
      "stepTimings": [
        110,
        152,
        204
      ],
      "horizontal": true,
      "cardStyle": true,
      "durationInFrames": 261
    },

        // 11 (119.70s = f3591). Check 1. "Did" 122.30 / "For example" 125.30
{
      "layout": "label-title-body",
      "label": "CHECK 1",
      "title": "Outcome accuracy",
      "body": [
        "The question: did the agent produce the correct recommendation?",
        "Example: did it identify Taylor's task as an update?"
      ],
      "bodyTimings": [
        78,
        168
      ],
      "bodyRight": true,
      "bodyCards": true,
      "bodyCardIcons": [
        "check",
        "user"
      ],
      "durationInFrames": 306
    },

        // 12 (129.90s = f3897). Evaluation feature screenshot. "evaluation feature" 130.72
{
      "layout": "centered-image-caption",
      "image": "copilot-studio-evaluation/images/17-baseline-three-passes.png",
      "objectFit": "contain",
      "imageWidth": 1346,
      "imageZoom": {
        "centerX": 0.1,
        "centerY": 0.1,
        "scale": 1.4,
        "startFrame": 51
      },
      "caption": "Copilot Studio Evaluation: run the test cases, compare with expected results",
      "durationInFrames": 255
    },

        // 13 (138.40s = f4152). Check 2. "Did" 141.18 / "A correct" 144.30
{
      "layout": "label-title-body",
      "label": "CHECK 2",
      "title": "Process execution",
      "body": [
        "The question: did the agent follow the workflow we intended?",
        "Why: a correct answer doesn't show how the agent reached it"
      ],
      "bodyTimings": [
        83,
        177
      ],
      "bodyRight": true,
      "bodyCards": true,
      "bodyCardIcons": [
        "adjustments-horizontal",
        "eye"
      ],
      "durationInFrames": 309
    },

        // 14 (148.70s = f4461). Workflow for Taylor. "called" 151.94 / "retrieved" 153.40 / "used" 156.42
{
      "layout": "process-steps",
      "label": "FOR TAYLOR'S TASK",
      "title": "Verify each step",
      "steps": [
        {
          "title": "Called the agent flow",
          "body": "The tool we built in the last lesson"
        },
        {
          "title": "Retrieved from SharePoint",
          "body": "The relevant tracker information"
        },
        {
          "title": "Used it to recommend",
          "body": "The recommendation draws on that data"
        }
      ],
      "stepTimings": [
        89,
        133,
        224
      ],
      "horizontal": true,
      "cardStyle": true,
      "durationInFrames": 315
    },

        // 15 (159.20s = f4776). Evidence screenshots. "agent activity" 160.18 / "execution history" 162.34
{
      "layout": "comparison",
      "title": "Inspect the execution evidence",
      "leftImage": "copilot-studio-evaluation/images/21-agent-activity.png",
      "leftLabel": "AGENT ACTIVITY",
      "rightImage": "copilot-studio-evaluation/images/14-flow-run-history.png",
      "rightLabel": "FLOW RUN HISTORY",
      "objectFit": "cover",
      "imageHeight": 520,
      "leftObjectPosition": "left top",
      "rightObjectPosition": "left top",
      "highlights": [
        {
          "from": 0,
          "value": null
        },
        {
          "from": 29,
          "value": "left"
        },
        {
          "from": 94,
          "value": "right"
        },
        {
          "from": 156,
          "value": null
        }
      ],
      "durationInFrames": 189
    },

        // 16 (165.50s = f4965). Check 3. "Did" 168.04 / "Our agent build plan" 171.00
{
      "layout": "label-title-body",
      "label": "CHECK 3",
      "title": "Boundary compliance",
      "body": [
        "The question: did the agent stay within the limits we defined?",
        "The plan: prepare proposed changes for human review"
      ],
      "bodyTimings": [
        76,
        165
      ],
      "bodyRight": true,
      "bodyCards": true,
      "bodyCardIcons": [
        "adjustments-horizontal",
        "user"
      ],
      "durationInFrames": 315
    },

        // 17 (176.00s = f5280). Not allowed. "create" 176.86 / "update" 177.62 / "delete" 178.48
{
      "layout": "label-title-body",
      "label": "OUT OF BOUNDS",
      "title": "It should not change\nSharePoint items",
      "body": [
        "Create",
        "Update",
        "Delete"
      ],
      "bodyTimings": [
        26,
        49,
        74
      ],
      "bodyRight": true,
      "bodyXList": true,
      "durationInFrames": 129
    },

        // 18 (180.30s = f5409). Confirm nothing changed. "tool activity" 184.22 / "check SharePoint" 185.42
{
      "layout": "comparison",
      "title": "Confirm no records changed",
      "leftImage": "copilot-studio-evaluation/images/22-tools-boundaries.png",
      "leftLabel": "TOOL ACTIVITY",
      "rightImage": "copilot-studio-evaluation/images/29-tracker-after-tests.png",
      "rightLabel": "SHAREPOINT TRACKER",
      "objectFit": "cover",
      "imageHeight": 520,
      "leftObjectPosition": "left top",
      "rightObjectPosition": "left top",
      "highlights": [
        {
          "from": 0,
          "value": null
        },
        {
          "from": 118,
          "value": "left"
        },
        {
          "from": 154,
          "value": "right"
        },
        {
          "from": 207,
          "value": null
        }
      ],
      "durationInFrames": 255
    },

        // 19 (188.80s = f5664). Checks work together. "right result" 193.42 / "followed" 194.48 / "respected" 196.64
{
      "layout": "takeaway-stack",
      "label": "THREE CHECKS, WORKING TOGETHER",
      "title": "Verify the agent",
      "takeaways": [
        {
          "kicker": "OUTCOME",
          "text": "Reached the right result"
        },
        {
          "kicker": "PROCESS",
          "text": "Followed the intended process"
        },
        {
          "kicker": "BOUNDARIES",
          "text": "Respected our controls"
        }
      ],
      "timings": [
        131,
        162,
        227
      ],
      "durationInFrames": 285
    },

        // 20 (198.30s = f5949). Monitoring intro. "regular use" 203.64 / "monitoring" 205.54
{
      "layout": "big-statement",
      "label": "02 · MONITORING",
      "text": "Evaluation tests specific scenarios.\nMonitoring shows regular use.",
      "highlight": "regular use",
      "fontSize": 72,
      "animation": "fade",
      "lineTimings": [
        6,
        152
      ],
      "durationInFrames": 261
    },

        // 21 (207.00s = f6210). Monitor screenshot. "activity and analytics" 209.86
{
      "layout": "centered-image-caption",
      "image": "copilot-studio-evaluation/images/23-monitor-overview.png",
      "objectFit": "contain",
      "imageWidth": 1346,
      "imageZoom": {
        "centerX": 0.45,
        "centerY": 0.1,
        "scale": 1.25,
        "startFrame": 60
      },
      "caption": "Review activity and analytics to look for patterns",
      "durationInFrames": 168
    },

        // 22 (212.60s = f6378). Patterns. "repeatedly" 213.66 / "frequently" 217.14 / "decide" 222.84
{
      "layout": "label-title-body",
      "label": "PATTERNS TO LOOK FOR",
      "title": "Where should we\ninvestigate first?",
      "body": [
        "Repeated failures: it fails at the same step",
        "Too many questions: it asks for clarification it shouldn't need",
        "Priorities: improve where it makes the biggest difference"
      ],
      "bodyTimings": [
        32,
        136,
        307
      ],
      "bodyRight": true,
      "bodyCards": true,
      "bodyCardIcons": [
        "x",
        "chat-bubble-left-right",
        "trending"
      ],
      "bodyCardCompact": true,
      "durationInFrames": 447
    },

        // 23 (227.50s = f6825). Improvement loop. "test" 232.58 / "inspect" 233.30 / "improve" 234.22 / "retest" 235.34
{
      "layout": "process-steps",
      "label": "EVALUATION + MONITORING",
      "title": "A simple improvement loop",
      "steps": [
        {
          "title": "Test",
          "body": "Against a clear expected outcome"
        },
        {
          "title": "Inspect",
          "body": "The result and the evidence"
        },
        {
          "title": "Improve",
          "body": "The part causing the problem"
        },
        {
          "title": "Retest",
          "body": "The same test, plus past passes"
        }
      ],
      "stepTimings": [
        144,
        166,
        194,
        227
      ],
      "horizontal": true,
      "cardStyle": true,
      "durationInFrames": 264
    },

        // 24 (236.30s = f7089). Test + inspect. "test" 237.20 / "inspect" 241.66
{
      "layout": "label-title-body",
      "label": "STEPS 1 + 2",
      "title": "Test, then inspect\nthe evidence",
      "body": [
        "Test: against a clearly defined expected outcome",
        "Inspect: both the result and the execution evidence"
      ],
      "bodyTimings": [
        27,
        161
      ],
      "bodyRight": true,
      "bodyCards": true,
      "bodyCardIcons": [
        "check",
        "eye"
      ],
      "durationInFrames": 264
    },

        // 25 (245.10s = f7353). Investigate the cause. "retrieve" 249.40? anchor "Did" 248.82 / "misunderstand" 251.86 / "select" 255.10
{
      "layout": "label-title-body",
      "label": "IF THE RECOMMENDATION IS WRONG",
      "title": "Investigate\nthe cause",
      "body": [
        "Retrieval: did it get the wrong SharePoint information?",
        "Understanding: did it misread what it retrieved?",
        "Tool choice: did it select the wrong tool?"
      ],
      "bodyTimings": [
        112,
        203,
        300
      ],
      "bodyRight": true,
      "bodyCards": true,
      "bodyCardIcons": [
        "eye",
        "lightbulb",
        "compare"
      ],
      "bodyCardCompact": true,
      "durationInFrames": 357
    },

        // 26 (257.00s = f7710). Improve. "instructions" 261.18 / "retrieves" 263.36 / "fixing" 266.08
{
      "layout": "label-title-body",
      "label": "STEP 3 · IMPROVE",
      "title": "Fix the part\nresponsible",
      "body": [
        "Instructions: clarify what the agent should do",
        "Retrieval: adjust how it gets information",
        "Agent flow: fix the action that went wrong"
      ],
      "bodyTimings": [
        125,
        191,
        272
      ],
      "bodyRight": true,
      "bodyCards": true,
      "bodyCardIcons": [
        "pencil",
        "adjustments-horizontal",
        "bolt"
      ],
      "bodyCardCompact": true,
      "durationInFrames": 339
    },

        // 27 (268.30s = f8049). Retest. "run the same test" 269.16 / "rerun" 273.62 / "A change" 276.28
{
      "layout": "label-title-body",
      "label": "STEP 4 · RETEST",
      "title": "Run the tests\nagain",
      "body": [
        "Same test: did the change work?",
        "Previous passes: rerun tests that already passed",
        "Why: one fix can introduce another issue"
      ],
      "bodyTimings": [
        26,
        160,
        239
      ],
      "bodyRight": true,
      "bodyCards": true,
      "bodyCardIcons": [
        "check",
        "clock",
        "x"
      ],
      "bodyCardCompact": true,
      "durationInFrames": 351
    },

        // 28 (280.00s = f8400). Regression testing. "regression" 281.48 / "Repeating" 283.00
{
      "layout": "big-statement",
      "label": "REGRESSION TESTING",
      "text": "Repeat the loop.\nImprove based on evidence.",
      "highlight": "evidence",
      "fontSize": 84,
      "animation": "fade",
      "lineTimings": [
        82,
        161
      ],
      "durationInFrames": 210
    },

        // 29 (287.00s = f8610). Reliable. "more than" 289.08
{
      "layout": "big-statement",
      "text": "A reliable agent takes more than\nthe right answer once.",
      "highlight": "more than",
      "fontSize": 76,
      "animation": "fade",
      "lineTimings": [
        8,
        67
      ],
      "durationInFrames": 129
    },

        // 30 (291.30s = f8739). Summary. "test" 291.94 / "verify" 293.46 / "confirm" 295.80, then evaluation 299.02 / execution 301.92 / monitoring 305.34
{
      "layout": "takeaway-stack",
      "label": "HOW THE PIECES FIT",
      "title": "Test. Verify. Confirm.",
      "takeaways": [
        {
          "kicker": "EVALUATION",
          "text": "Repeatable checks on its decisions"
        },
        {
          "kicker": "EXECUTION EVIDENCE",
          "text": "What actually happened"
        },
        {
          "kicker": "MONITORING",
          "text": "Where problems appear over time"
        }
      ],
      "timings": [
        224,
        311,
        413
      ],
      "durationInFrames": 522
    },

        // 31 (308.70s = f9261). Close. "practice" 310.0
{
      "layout": "big-statement",
      "label": "NEXT: IN COPILOT STUDIO",
      "text": "Let's put this into practice",
      "highlight": "practice",
      "fontSize": 88,
      "animation": "kinetic",
      "durationInFrames": 234
    },
  ],
};
