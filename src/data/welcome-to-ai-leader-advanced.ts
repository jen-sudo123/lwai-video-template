import { VideoData } from '../scenes/types';

// All scene boundaries derived from Whisper word-level timestamps (30 fps).
// Audio: "Welcome to Lead with AI.mp3" — 395.80s total → 11,874 frames
//
//   scene                         | VO start     | frames          | dur  | layout
//   ------------------------------|--------------|-----------------|------|------------------
//   title card                    | 00:00.000    |     0 →    46   |   47 | title-card-green
//   opening: read, watched        | 00:01.560    |    47 →   440   |  394 | big-statement
//   opening: work looks the same  | 00:14.700    |   441 →   607   |  167 | big-statement
//   AI Fluency pivot              | 00:20.260    |   608 →   763   |  156 | big-statement
//   Dan intro                     | 00:25.480    |   764 →  1705   |  942 | label-title-body
//   deeper lesson bridge          | 00:56.860    |  1706 →  1940   |  235 | big-statement
//   THE WORK PROBLEM              | 01:04.700    |  1941 →  2709   |  769 | label-title-body
//   30-40% stat                   | 01:30.340    |  2710 →  3041   |  332 | stat-hero
//   warning                       | 01:41.400    |  3042 →  3419   |  378 | big-statement
//   AI Literacy vs AI Fluency     | 01:54.000    |  3420 →  4228   |  809 | split-contrast
//   3× stat                       | 02:20.980    |  4229 →  5227   |  999 | stat-hero
//   IMPACT PER HOUR               | 02:54.280    |  5228 →  6222   |  995 | label-title-body
//   the two levers                | 03:27.420    |  6223 →  7006   |  784 | label-title-body
//   definition close              | 03:53.560    |  7007 →  7212   |  206 | big-statement
//   YOUR WHY — LeadOS intake      | 04:00.420    |  7213 →  7780   |  568 | label-title-body
//   the four north stars          | 04:19.360    |  7781 →  9087   | 1307 | label-title-body
//   WEEK ONE                      | 05:02.920    |  9088 →  9675   |  588 | label-title-body
//   WEEK TWO                      | 05:22.520    |  9676 → 10384   |  709 | label-title-body
//   WEEK THREE                    | 05:46.160    | 10385 → 10920   |  536 | label-title-body
//   THE OUTCOME                   | 06:04.020    | 10921 → 11648   |  728 | label-title-body
//   close                         | 06:28.300    | 11649 → 11873   |  225 | big-statement

export const welcomeToAiLeaderAdvanced: VideoData = {
  audioSrc: 'audio/welcome-to-ai-leader-advanced.mp3',
  scenes: [

    // 00:00.000 → 00:01.560 — title card (47f of pre-VO silence)
    {
      layout: 'title-card-green',
      title: 'AI Leader Advanced',
      subtitle: 'A program by Lead with AI',
      durationInFrames: 47,
    },

    // 00:01.560 → 00:14.700 — opening hook, part one
    // VO: "If you've read McKinsey reports… maybe even started one or more lessons on prompting AI"
    // Hero text lands word-by-word; sets up the tension before the payoff
    {
      layout: 'big-statement',
      text: "You've read the reports. Watched the demos. Took the courses.",
      label: 'THE QUESTION',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 394,
    },

    // 00:14.700 → 00:20.260 — opening hook, part two
    // VO: "but your actual work looks basically the same as it did a year ago"
    // "the same" punches in lime — the tension lands
    {
      layout: 'big-statement',
      text: 'Your work looks the same.',
      highlight: 'the same',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 167,
    },

    // 00:20.260 → 00:25.480 — the pivot
    // VO: "you are likely behind on AI fluency"
    // "Fluency" in lime — the resolution of the tension
    {
      layout: 'big-statement',
      text: 'AI Fluency, not AI Knowledge.',
      highlight: 'Fluency,',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 156,
    },

    // 00:25.480 → 00:56.860 — Dan Sanchez intro
    // VO: "Hey, my name is Dan… more than a thousand senior leaders on how to actually implement AI"
    // body[0] at +16f  ("founder and CEO" ~26.0s = frame 780, offset 16)
    // body[1] at +180f ("decade in marketing" ~31.5s = frame 944, offset 180)
    // body[2] at +367f ("Ogilvy" ~37.7s = frame 1131, offset 367)
    // body[3] at +545f ("thousand senior leaders" ~43.6s = frame 1309, offset 545)
    {
      layout: 'label-title-body',
      label: 'YOUR GUIDE',
      title: 'Daan van Rossum',
      body: [
        'Founder & CEO, Lead with AI',
        'Decade in marketing strategy consulting',
        'Ogilvy: Amsterdam, New York, Chicago, Asia Pacific',
        '1,000+ senior leaders on AI implementation',
      ],
      bodyTimings: [60, 323, 398, 683],
      image: 'images/features/Welcome LwAT/Daan.jpeg',
      durationInFrames: 942,
    },

    // 00:56.860 → 01:04.700 — philosophical bridge
    // VO: "And what that taught me goes a lot deeper than AI — it's really about the work itself."
    // Smaller title size, fade animation — a reflective beat before the problem section
    {
      layout: 'big-statement',
      text: "What that taught me goes deeper than AI.\nIt is about the work itself.",
      size: 'title',
      animation: 'fade',
      durationInFrames: 235,
    },

    // 01:04.700 → 01:30.340 — The Work Problem
    // VO: "Employee engagement is at an all-time low… administrative overhead, repetitive decisions,
    //      operational noise crowding out everything that actually matters"
    // body[0] at +385f (administrative overhead ~77.5s = frame 2326, offset 385)
    // body[1] at +459f (repetitive decisions ~80.0s = frame 2400, offset 459)
    // body[2] at +592f (operational noise ~84.4s = frame 2533, offset 592)
    {
      layout: 'label-title-body',
      label: 'THE WORK PROBLEM',
      title: 'Employee Engagement at Historic Low',
      body: [
        'Administrative overhead',
        'Repetitive decisions',
        'Operational noise crowding out what matters',
      ],
      bodyTimings: [493, 544, 604],
      image: 'images/features/Welcome LwAT/lower employee engagement.png',
      durationInFrames: 769,
    },

    // 01:30.340 → 01:41.400 — 30–40% stat reveal
    // VO: "AI could give you back the 30% to 40% of your time that's currently lost to low-value tasks"
    // Giant lime stat lands with a spring — most impactful number in the section
    // context fades in at +120f (~4s) when VO says "so that you can focus on real impacts"
    {
      layout: 'stat-hero',
      stat: '30–40%',
      label: 'OF YOUR TIME LOST TO LOW-VALUE TASKS',
      context: 'AI can give it back.',
      contextTiming: 75,
      durationInFrames: 332,
    },

    // 01:41.400 → 01:54.000 — the warning
    // VO: "But it could just as easily make things worse.
    //      It could automate the service while leaving the underlying problems untouched."
    // "leave the problems untouched" in lime — the danger highlighted
    {
      layout: 'big-statement',
      text: 'Or it could automate the surface and leave the problems untouched.',
      highlight: 'leave the problems untouched',
      size: 'title',
      animation: 'fade',
      durationInFrames: 378,
    },

    // 01:54.000 → 02:20.980 — AI Literacy vs AI Fluency
    // VO: "AI literacy versus AI fluency… AI literacy means you know what AI can do.
    //      AI fluency means you're actually doing it. On real work. Every single day."
    // Both column headers appear immediately, body reveals sync to voiceover:
    //   left body  at +255f (~122.5s = frame 3675, "AI literacy means...")
    //   right body at +437f (~128.6s = frame 3857, "AI fluency means...")
    {
      layout: 'split-contrast',
      leftLabel: 'AI LITERACY',
      leftTitle: 'Knowing what AI can do',
      leftBody: "You've read the reports.\nTaken the courses.\nYou understand the capabilities.",
      rightLabel: 'AI FLUENCY',
      rightTitle: 'Actually doing it',
      rightBody: 'In your job.\nOn real work.\nEvery single day.\nIn a way that changes your output and your capacity.',
      dividerLabel: 'vs.',
      leftBodyDelay: 335,
      rightBodyDelay: 466,
      highlights: [
        { from: 335, value: 'left' },
        { from: 466, value: 'right' },
      ],
      durationInFrames: 809,
    },

    // 02:20.980 → 02:54.280 — McKinsey 3× stat
    // VO: "workflow redesign ranks highest… higher than the technology, higher than the budget…
    //      AI high performers are nearly 3× more likely to have fundamentally redesigned their workflows"
    // context fades in at +479f (~157s, when "Higher than technology" is spoken)
    {
      layout: 'stat-hero',
      stat: '3×',
      label: 'MORE LIKELY TO REDESIGN WORKFLOWS',
      context: 'Workflow redesign ranks #1 for business impact,\nhigher than technology and budget.\nMcKinsey, 2025.',
      contextTiming: 211,
      image: 'images/features/Welcome LwAT/McKinsey.svgz',
      durationInFrames: 999,
    },

    // 02:54.280 → 03:27.420 — Impact per Hour
    // VO: "how do we measure whether AI is actually working? Impact per hour.
    //      Because we have measured productivity in hours and outputs for way too long.
    //      The right question is how much of your time actually moves the mission forward."
    // body[0] at +231f ("measured productivity" ~182s = frame 5459, offset 231)
    // body[1] at +579f ("the right question" ~193.6s = frame 5807, offset 579)
    {
      layout: 'label-title-body',
      label: 'THE METRIC',
      title: 'Impact per Hour',
      body: [
        'Not outputs.',
        'Not hours.',
        'How much of your time actually moves the mission forward?',
      ],
      bodyTimings: [266, 266, 791],
      image: 'images/features/Welcome LwAT/Impact per hour.png',
      imageFullScreen: true,
      durationInFrames: 995,
    },

    // 03:27.420 → 03:53.560 — the two levers
    // VO: "AI not only to increase capacity… but also new capabilities that increase the value…
    //      They redesign the work entirely. They automate what drains them."
    // body[0] at +0f   ("increase capacity" ~207.4s = scene start, offset 0)
    // body[1] at +207f ("new capabilities" ~214.3s = frame 6430, offset 207)
    // body[2] at +397f ("redesign the work" ~220.7s = frame 6620, offset 397)
    {
      layout: 'label-title-body',
      label: 'HOW IT WORKS',
      title: 'Two Levers',
      body: [
        'Increase capacity: current workflows, faster',
        'New capabilities: higher-value work',
      ],
      bodyTimings: [63, 223],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['bolt', 'sparkles'],
      durationInFrames: 557,
    },

    // 03:53.560 → 04:00.420 — definition close (the 206f silence gap)
    // VO: "automate what drains them, reinvest that time into what genuinely matters"
    // "Reinvest" lands in lime — this is the promise of the whole program
    {
      layout: 'big-statement',
      text: 'Automate what drains you.\nReinvest in what matters.',
      highlight: 'Reinvest',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 206,
    },

    // Impact per Hour image beat — 2 seconds
    {
      layout: 'label-title-body',
      label: '',
      title: '',
      body: [],
      image: 'images/features/Welcome LwAT/Impact per hour.png',
      imageFullScreen: true,
      durationInFrames: 214,
    },

    // 04:00.420 → 04:19.360 — LeadOS intake
    // VO: "The very first thing we do is not talk about AI at all.
    //      You will complete the Lito S intake — a 50-minute conversation
    //      designed to understand your role, your workflows, and most importantly, your why."
    // body[0] at +159f ("50 minute conversation" ~245.7s = frame 7372, offset 159)
    // body[1] at +325f ("to understand your role" ~251.3s = frame 7538, offset 325)
    {
      layout: 'label-title-body',
      label: 'YOUR WHY',
      title: 'LeadOS Intake',
      body: [
        '15-minute conversation',
        'Your role, your workflows',
        'Your why',
      ],
      bodyTimings: [294, 376, 458],
      image: 'images/features/Welcome LwAT/LeadOS intake.png',
      imageLeft: true,
      bodyCards: true,
      bodyCardIcons: ['clock', 'user', 'lightbulb'],
      durationInFrames: 568,
    },

    // 04:19.360 → 05:02.920 — the four north stars + personalized plan
    // VO: "What does success actually look like for you? Strategic thinking…
    //      developing people… real balance… meaningful mission.
    //      your North Star shapes everything… personalized plan, not a generic syllabus"
    // body[0] at +193f ("reclaiming time" ~265.8s = frame 7974, offset 193)
    // body[1] at +390f ("developing the people" ~272.4s = frame 8171, offset 390)
    // body[2] at +555f ("contributing to a mission" ~277.9s = frame 8336, offset 555)
    // body[3] at +914f ("personalized plan" ~289.8s = frame 8695, offset 914)
    {
      layout: 'process-steps',
      label: 'YOUR NORTH STAR',
      title: 'What Does Success Look Like for You?',
      steps: [
        {
          title: 'Strategic thinking',
          body: 'Reclaim time from operations so you can lead at the level you were hired for.',
        },
        {
          title: 'Developing your people',
          body: 'Build the team around you so the organisation scales with you.',
        },
        {
          title: 'Work-life balance',
          body: 'Meaningful mission: lead with clarity and energy, not just output.',
        },
      ],
      stepTimings: [153, 408, 503],
      animation: 'kinetic',
      durationInFrames: 711,
    },

    // 05:02.920 → 05:08.920 — Personalized plan bridge
    {
      layout: 'big-statement',
      label: 'YOUR NORTH STAR SHAPES EVERYTHING',
      text: 'Personalized plan,\nnot a generic syllabus.',
      highlight: 'Personalized plan,',
      animation: 'kinetic',
      durationInFrames: 609,
    },

    // 05:08.920 → 05:28.920 — Week One
    // VO: "Week one — thinking and operating like a top 1% AI leader.
    //      How to position, evaluate AI output critically, identify which workflows are worth redesigning.
    //      Five lessons, 30 minutes per day."
    // body[0] at +180f ("position, how to evaluate" ~308.9s = frame 9268, offset 180)
    // body[1] at +402f ("which workflows worth redesigning" ~316.3s = frame 9490, offset 402)
    // body[2] at +452f ("five lessons" ~318s = frame 9540, offset 452)
    {
      layout: 'label-title-body',
      label: 'WEEK ONE',
      title: 'Think Like a Top 1% AI Leader',
      body: [
        'Prompt precision & critical evaluation',
        'Identify workflows worth redesigning',
        '5 lessons  ·  30 minutes per day',
      ],
      bodyTimings: [239, 334, 517],
      image: 'images/features/Welcome LwAT/Program flow.png',
      imageZoom: { centerX: 1 / 6, scale: 1.5, startFrame: 30 },
      durationInFrames: 588,
    },

    // 05:22.520 → 05:46.160 — Week Two
    // VO: "Week two — one real AI assistant per day.
    //      Intel agent, research assistant, writing assistant, meeting preparation workflow.
    //      All trained on your context, your language, and your actual work."
    // body[0] at +140f ("one real AI assistant" ~327.2s = frame 9816, offset 140)
    // body[1] at +224f ("research assistant" ~330s = frame 9900, offset 224)
    // body[2] at +526f ("trained on your context" ~340.1s = frame 10202, offset 526)
    {
      layout: 'label-title-body',
      label: 'WEEK TWO',
      title: 'Build Your AI Assistants',
      body: [
        '1 real assistant per day',
        'Research  ·  Writing  ·  Meeting prep',
        'Trained on your context and language',
      ],
      bodyTimings: [120, 264, 407],
      image: 'images/features/Welcome LwAT/Program flow.png',
      imageZoom: { centerX: 0.5, scale: 1.5, startFrame: 30 },
      durationInFrames: 709,
    },

    // 05:46.160 → 06:06.000 — Week Three
    // VO: "Week three is optional, but highly recommended…
    //      dedicated build time, coach's feedback, and demo day
    //      where you present what you build and earn your AI leader certification."
    // body[0] at +144f ("dedicated build time" ~351s = frame 10529, offset 144)
    // body[1] at +235f ("demo day" ~354s = frame 10620, offset 235)
    // body[2] at +338f ("AI leader certification" ~357.4s = frame 10723, offset 338)
    {
      layout: 'label-title-body',
      label: 'WEEK THREE',
      title: 'Optional but Highly Recommended',
      body: [
        'Dedicated build time & coach feedback',
        'Demo Day: present what you built',
        'AI Leader Certification',
      ],
      bodyTimings: [130, 225, 349],
      image: 'images/features/Welcome LwAT/Program flow.png',
      imageZoom: { centerX: 5 / 6, scale: 1.5, startFrame: 30 },
      durationInFrames: 445,
    },

    // 06:01.000 → 06:25.000 — The Outcome
    // VO: "Every graduate of this program has deployed at least one working assistant.
    //      Most report getting back between 10 and 50% of their time within the first month.
    //      They describe a different relationship with their work…"
    // body[0] at +0f   (scene start — "every graduate" spoken immediately)
    // body[1] at +354f ("describe something beyond time savings" ~375.8s = frame 11275, offset 354)
    {
      layout: 'process-steps',
      label: '',
      title: 'The Outcome',
      steps: [
        {
          title: 'Working assistants, deployed',
          body: '6 AI assistants deployed once the program ends.',
        },
        {
          title: '10–50% time back within month one',
          body: 'Most report reclaiming between 10 and 50% of their time within the first month.',
        },
        {
          title: 'A different relationship with work',
          body: 'More than time savings, the way you work fundamentally changes.',
        },
      ],
      stepTimings: [0, 155, 420],
      animation: 'kinetic',
      durationInFrames: 775,
    },

    // 06:26.25 → 06:32.25 — AI Literacy to AI Fluency (lit/dim reprise)
    {
      layout: 'split-contrast',
      leftLabel: 'AI LITERACY',
      rightLabel: 'AI FLUENCY',
      dividerLabel: 'to',
      labelsOnly: true,
      highlights: [
        { from: 0, value: 'left' },
        { from: 35, value: 'right' },
      ],
      durationInFrames: 180,
    },

    // 06:28.000 → 06:35.500 — close
    // VO: "And that is impact per hour in practice.
    //      So you're in the right place. And now it's time to get to work."
    // "right place" in lime — confident landing
    {
      layout: 'big-statement',
      text: "You're in the right place.",
      highlight: 'right place',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 225,
    },

  ],
};
