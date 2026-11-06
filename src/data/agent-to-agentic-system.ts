import { VideoData } from '../scenes/types';

// Microsoft Copilot Studio: From an Agent to an Agentic System with Agent Flows.
// Audio: audio/agent-to-agentic-system-padded.mp3 = audio/agent-to-agentic-system.mp3 (ElevenLabs eleven_v4, Daan,
//        two parts joined with 0.5s gap) pre-padded with 3.0s silence for audioStartFrame 90 (title card).
// Transcript (unpadded, ElevenLabs Scribe): src/data/agent-to-agentic-system.transcript.json
//        comp_frame = 90 + round(t * 30). Scene timings generated from it; leads: 8f for fades, 0 for bodyCards.
// Images: public/agent-to-agentic-system/images/ (Drive folder 1Wv0kZxDFV6ULqmtW2DFqPzo6DQEcIYoR; JPEG data, .png names).
//
//  #   layout             scene                              | start  | dur
//   1  title-card-green   From an Agent to an Agentic System |      0 |    90
//   2  label-title-body   Weekly Team Action Follow-Up Agent |     90 |   591
//   3  big-statement      An agent is only one part of a lar |    681 |   108
//   4  label-title-body   Connect AI reasoning with everythi |    789 |   492
//   5  split-contrast     Some steps need judgment           |   1281 |   261
//   6  big-statement      That's where Agent Flows come in.  |   1542 |    72
//   7  label-title-body   A predefined sequence of actions   |   1614 |   435
//   8  label-title-body   Then a series of actions           |   2049 |   429
//   9  split-contrast     Decides what to do next            |   2478 |   618
//  10  big-statement      The flexibility of AI reasoning. T |   3096 |   204
//  11  label-title-body   Three commitments in the meeting n |   3300 |   618
//  12  three-mode-columns What should the agent recommend?   |   3918 |   384
//  13  big-statement      Retrieving records is a repeatable |   4302 |   378
//  14  label-title-body   Check Team Action Tracker          |   4680 |   426
//  15  split-contrast     Defines how records are retrieved  |   5106 |   168
//  16  label-title-body   A read-only flow                   |   5274 |   600
//  17  label-title-body   Recommendations, not changes       |   5874 |   246
//  18  split-contrast     Runs without asking                |   6120 |   627
//  19  label-title-body   Missing details? Don't create it   |   6747 |   285
//  20  big-statement      Not maximum autonomy. The right au |   7032 |   273
//  21  label-title-body   How the pieces fit together        |   7305 |  1110
//  22  label-title-body   Design decisions, put into practic |   8415 |   561
//  23  checklist-slide    Not every action needs a flow      |   8976 |   564
//  24  big-statement      AI reasoning. Reliable execution.  |   9540 |   282
//  25  label-title-body   Build: Check Team Action Tracker   |   9822 |   534
//                                                                  total 10356   (VO ends comp frame 10311)

export const agentToAgenticSystem: VideoData = {
  audioSrc: 'audio/agent-to-agentic-system-padded.mp3',
  audioStartFrame: 90,
  scenes: [
    {
      layout: "title-card-green",
      label: "MICROSOFT COPILOT STUDIO",
      title: "From an Agent to an Agentic System\nwith Agent Flows",
      durationInFrames: 90
    },
    {
      layout: "label-title-body",
      label: "OUR FIRST AGENT",
      title: "Weekly Team Action\nFollow-Up Agent",
      body: [
        "Reads meeting notes",
        "Checks commitments in SharePoint",
        "Identifies new or updated actions",
        "Prepares recommendations for review"
      ],
      bodyTimings: [
        162,
        202,
        270,
        354
      ],
      image: "agent-to-agentic-system/images/06b-normal-tools-restored.png",
      durationInFrames: 591,
      imageZoomKeyframes: [
        {
          startFrame: 0,
          centerX: 0.5,
          centerY: 0.5,
          scale: 1
        },
        {
          startFrame: 90,
          centerX: 0.15,
          centerY: 0.19,
          scale: 2.0
        }
      ]
    },
    {
      layout: "big-statement",
      text: "An agent is only one part\nof a larger picture.",
      highlight: "larger picture",
      size: "title",
      durationInFrames: 108
    },
    {
      layout: "label-title-body",
      label: "AN AGENTIC SYSTEM",
      title: "Connect AI reasoning with\neverything around it",
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      body: [
        "AI reasoning: Interprets and decides",
        "Data: The information the work depends on",
        "Tools: Act in other systems",
        "Repeatable processes: The same steps, every time",
        "Human oversight: Review and approval"
      ],
      bodyTimings: [
        31,
        67,
        97,
        110,
        160
      ],
      durationInFrames: 492
    },
    {
      layout: "split-contrast",
      leftLabel: "JUDGMENT",
      leftTitle: "Some steps need judgment",
      rightLabel: "PROCESS",
      rightTitle: "Others follow the same process every time",
      rightLightUpFrame: 156,
      durationInFrames: 261
    },
    {
      layout: "big-statement",
      text: "That's where\nAgent Flows come in.",
      highlight: "Agent Flows",
      size: "title",
      durationInFrames: 72
    },
    {
      layout: "label-title-body",
      label: "WHAT IS AN AGENT FLOW?",
      title: "A predefined sequence\nof actions",
      body: [
        "Starts with a trigger",
        "Example: an agent calls the flow"
      ],
      bodyTimings: [
        160,
        282
      ],
      image: "agent-to-agentic-system/images/03b-blank-route-trigger.png",
      durationInFrames: 435,
      imageZoomKeyframes: [
        {
          startFrame: 0,
          centerX: 0.5,
          centerY: 0.5,
          scale: 1
        },
        {
          startFrame: 168,
          centerX: 0.37,
          centerY: 0.27,
          scale: 2.4
        }
      ]
    },
    {
      layout: "label-title-body",
      label: "WHAT IS AN AGENT FLOW?",
      title: "Then a series\nof actions",
      body: [
        "Retrieve records from SharePoint",
        "Organize information",
        "Return results to the agent",
        "Use conditions to follow different paths"
      ],
      bodyTimings: [
        80,
        143,
        191,
        302
      ],
      image: "agent-to-agentic-system/images/05-rebuilt-select.png",
      durationInFrames: 429,
      imageZoomKeyframes: [
        {
          startFrame: 0,
          centerX: 0.5,
          centerY: 0.5,
          scale: 1
        },
        {
          startFrame: 51,
          centerX: 0.5,
          centerY: 0.38,
          scale: 1.6
        },
        {
          startFrame: 198,
          centerX: 0.5,
          centerY: 0.62,
          scale: 1.6
        }
      ]
    },
    {
      layout: "split-contrast",
      leftLabel: "AI AGENT",
      leftTitle: "Decides what to do next",
      leftBody: "Based on its instructions, the request, and the information available",
      rightLabel: "AGENT FLOW",
      rightTitle: "Follows a process designed in advance",
      rightBody: "Can include AI actions, but the sequence and rules are set ahead of time",
      rightLightUpFrame: 325,
      durationInFrames: 618
    },
    {
      layout: "big-statement",
      text: "The flexibility of AI reasoning.\nThe consistency of a repeatable process.",
      highlight: "consistency",
      size: "title",
      animation: "fade",
      lineTimings: [
        2,
        113
      ],
      durationInFrames: 204
    },
    {
      layout: "label-title-body",
      label: "BACK TO OUR AGENT",
      title: "Three commitments\nin the meeting notes",
      body: [
        "Taylor: launch checklist, deadline changed",
        "Chris: new commitment, onboarding FAQs",
        "Customer escalation: no owner or deadline"
      ],
      bodyTimings: [
        224,
        392,
        497
      ],
      image: "agent-to-agentic-system/images/04b-tracker-before-tests.png",
      durationInFrames: 618,
      imageZoomKeyframes: [
        {
          startFrame: 0,
          centerX: 0.5,
          centerY: 0.5,
          scale: 1
        },
        {
          startFrame: 195,
          centerX: 0.33,
          centerY: 0.42,
          scale: 2.0
        }
      ]
    },
    {
      layout: "three-mode-columns",
      label: "AI REASONING",
      title: "What should the agent recommend?",
      columns: [
        {
          label: "UPDATE",
          title: "Propose an update",
          body: [
            "To an existing action"
          ]
        },
        {
          label: "NEW",
          title: "Suggest a new action",
          body: [
            "For a new commitment"
          ]
        },
        {
          label: "CLARIFY",
          title: "Ask for clarification",
          body: [
            "When details are missing"
          ]
        }
      ],
      highlights: [
        {
          from: 112,
          value: 0
        },
        {
          from: 196,
          value: 1
        },
        {
          from: 244,
          value: 2
        },
        {
          from: 305,
          value: null
        }
      ],
      durationInFrames: 384
    },
    {
      layout: "big-statement",
      text: "Retrieving records is\na repeatable task.",
      highlight: "repeatable",
      size: "title",
      durationInFrames: 378
    },
    {
      layout: "label-title-body",
      label: "THE AGENT FLOW",
      title: "Check Team\nAction Tracker",
      body: [
        "Retrieves existing commitments from SharePoint",
        "Returns them in a consistent format",
        "The agent compares them with the meeting notes"
      ],
      bodyTimings: [
        98,
        221,
        269
      ],
      image: "agent-to-agentic-system/images/05e-rebuilt-published.png",
      durationInFrames: 426,
      imageZoomKeyframes: [
        {
          startFrame: 0,
          centerX: 0.5,
          centerY: 0.5,
          scale: 1
        },
        {
          startFrame: 90,
          centerX: 0.5,
          centerY: 0.42,
          scale: 1.7
        }
      ]
    },
    {
      layout: "split-contrast",
      leftLabel: "THE FLOW",
      leftTitle: "Defines how records are retrieved",
      rightLabel: "THE AGENT",
      rightTitle: "Decides what they mean",
      rightLightUpFrame: 88,
      durationInFrames: 168
    },
    {
      layout: "label-title-body",
      label: "THE AUTONOMY DIAL",
      title: "A read-only flow",
      body: [
        "Retrieves and organizes information",
        "Never creates, updates, or deletes",
        "The agent can call it without confirmation"
      ],
      bodyTimings: [
        175,
        292,
        416
      ],
      image: "agent-to-agentic-system/images/06b-normal-tools-restored.png",
      durationInFrames: 600,
      imageZoomKeyframes: [
        {
          startFrame: 0,
          centerX: 0.5,
          centerY: 0.5,
          scale: 1
        },
        {
          startFrame: 156,
          centerX: 0.15,
          centerY: 0.19,
          scale: 2.0
        }
      ]
    },
    {
      layout: "label-title-body",
      label: "HUMAN REVIEW",
      title: "Recommendations,\nnot changes",
      body: [
        "The agent prepares recommendations",
        "A person reviews before anything changes"
      ],
      bodyTimings: [
        1,
        123
      ],
      image: "agent-to-agentic-system/images/07d-final-summary-taylor.png",
      durationInFrames: 246,
      imageZoomKeyframes: [
        {
          startFrame: 0,
          centerX: 0.5,
          centerY: 0.5,
          scale: 1
        },
        {
          startFrame: 66,
          centerX: 0.82,
          centerY: 0.4,
          scale: 2.0
        }
      ]
    },
    {
      layout: "split-contrast",
      leftLabel: "READ-ONLY",
      leftTitle: "Runs without asking",
      leftBody: "Retrieves tracker records",
      rightLabel: "WRITES TO SHAREPOINT",
      rightTitle: "Needs more authority",
      rightBodies: [
        "Require confirmation before it runs",
        "Or add an explicit approval step"
      ],
      rightBodyTimings: [
        321,
        427
      ],
      rightLightUpFrame: 154,
      durationInFrames: 627
    },
    {
      layout: "label-title-body",
      label: "BOUNDARIES STILL MATTER",
      title: "Missing details?\nDon't create it",
      body: [
        "Customer escalation: no owner",
        "Customer escalation: no deadline"
      ],
      bodyTimings: [
        187,
        217
      ],
      image: "agent-to-agentic-system/images/08e-final-tool-output.png",
      durationInFrames: 285,
      imageZoomKeyframes: [
        {
          startFrame: 0,
          centerX: 0.5,
          centerY: 0.5,
          scale: 1
        },
        {
          startFrame: 93,
          centerX: 0.83,
          centerY: 0.35,
          scale: 2.0
        }
      ]
    },
    {
      layout: "big-statement",
      text: "Not maximum autonomy.\nThe right authority for each action.",
      highlight: "right authority",
      size: "title",
      animation: "fade",
      lineTimings: [
        2,
        74
      ],
      durationInFrames: 273
    },
    {
      layout: "label-title-body",
      label: "AN AGENTIC SYSTEM",
      title: "How the pieces\nfit together",
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      body: [
        "Agent: Reasoning and orchestration",
        "Knowledge: Access to information",
        "Tools and connectors: Act in other systems",
        "Agent Flows: Predictable, repeatable steps",
        "Human oversight: What needs approval, and when to stop"
      ],
      bodyTimings: [
        114,
        411,
        579,
        731,
        870
      ],
      durationInFrames: 1110
    },
    {
      layout: "label-title-body",
      label: "THE OVER FRAMEWORK",
      title: "Design decisions,\nput into practice",
      body: [
        "Which steps need judgment",
        "Which follow fixed rules",
        "Where people stay involved"
      ],
      bodyTimings: [
        286,
        335,
        389
      ],
      image: "agent-to-agentic-system/images/02-plan-workflow.png",
      durationInFrames: 561,
      imageZoomKeyframes: [
        {
          startFrame: 0,
          centerX: 0.5,
          centerY: 0.5,
          scale: 1
        },
        {
          startFrame: 135,
          centerX: 0.47,
          centerY: 0.27,
          scale: 2.2
        }
      ]
    },
    {
      layout: "checklist-slide",
      label: "WHEN TO USE A FLOW",
      title: "Not every action\nneeds a flow",
      items: [
        "A single tool call may be enough",
        "Several steps, predictable result: use a flow",
        "Uncertainty: AI reasoning or human input"
      ],
      itemTimings: [
        88,
        194,
        387
      ],
      durationInFrames: 564
    },
    {
      layout: "big-statement",
      text: "AI reasoning. Reliable execution.\nThe right human control.",
      highlight: "human control",
      size: "title",
      animation: "fade",
      lineTimings: [
        91,
        208
      ],
      durationInFrames: 282
    },
    {
      layout: "label-title-body",
      label: "NEXT",
      title: "Build: Check Team\nAction Tracker",
      body: [
        "Connect it to the Follow-Up Agent",
        "Every proposed change stays subject to human review"
      ],
      bodyTimings: [
        132,
        241
      ],
      image: "agent-to-agentic-system/images/08h-final-normal-execution.png",
      durationInFrames: 534,
      imageZoomKeyframes: [
        {
          startFrame: 0,
          centerX: 0.5,
          centerY: 0.5,
          scale: 1
        },
        {
          startFrame: 78,
          centerX: 0.52,
          centerY: 0.42,
          scale: 1.8
        }
      ]
    },
  ],
};
