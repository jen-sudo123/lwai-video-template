import { z } from 'zod';

const animationMode = z.enum(['kinetic', 'fade', 'auto']);

const titleCardGreen = z.object({
  layout: z.literal('title-card-green'),
  title: z.string(),
  subtitle: z.string().optional(),
  label: z.string().optional(),
  durationInFrames: z.number(),
});

const blank = z.object({
  layout: z.literal('blank'),
  durationInFrames: z.number(),
});

const textImageSplit = z.object({
  layout: z.literal('text-image-split'),
  text: z.string(),
  image: z.string(),
  durationInFrames: z.number(),
  animation: animationMode.optional(),
});

const centeredImageCaption = z.object({
  layout: z.literal('centered-image-caption'),
  image: z.string(),
  caption: z.string().optional(),
  durationInFrames: z.number(),
  animation: animationMode.optional(),
  objectFit: z.enum(['cover', 'contain']).optional(),
});

const centeredQuote = z.object({
  layout: z.literal('centered-quote'),
  text: z.string(),
  attribution: z.string().optional(),
  durationInFrames: z.number(),
  animation: animationMode.optional(),
});

const comparison = z.object({
  layout: z.literal('comparison'),
  title: z.string(),
  leftImage: z.string(),
  leftLabel: z.string(),
  rightImage: z.string(),
  rightLabel: z.string(),
  durationInFrames: z.number(),
  animation: animationMode.optional(),
  highlights: z.array(z.object({
    from: z.number(),
    value: z.enum(['left', 'right']).nullable(),
  })).optional(),
  objectFit: z.enum(['cover', 'contain']).optional(),
  showLabels: z.boolean().optional(),
  imageHeight: z.number().optional(),
});

const labelTitleBody = z.object({
  layout: z.literal('label-title-body'),
  label: z.string(),
  title: z.string(),
  body: z.array(z.string()),
  bodyTimings: z.array(z.number()).optional(),
  image: z.string().optional(),
  images: z.array(z.string()).optional(),
  imageTimings: z.array(z.number()).optional(),
  imageHeight: z.number().optional(),
  imageZoom: z.object({
    centerX: z.number(),
    scale: z.number().optional(),
    startFrame: z.number().optional(),
  }).optional(),
  imageZoomKeyframes: z.array(z.object({
    startFrame: z.number(),
    centerX: z.number().optional(),
    centerY: z.number().optional(),
    scale: z.number().optional(),
  })).optional(),
  imageZoomNoEntry: z.boolean().optional(),
  hideAvatar: z.boolean().optional(),
  hideLogo: z.boolean().optional(),
  imageFullScreen: z.boolean().optional(),
  bodyRight: z.boolean().optional(),
  bodyCards: z.boolean().optional(),
  bodyCardIcons: z.array(z.string()).optional(),
  bodyXList: z.boolean().optional(),
  imageLeft: z.boolean().optional(),
  highlights: z.array(z.object({
    from: z.number(),
    value: z.enum(['left', 'right']).nullable(),
  })).optional(),
  durationInFrames: z.number(),
  animation: animationMode.optional(),
});

const centeredChart = z.object({
  layout: z.literal('centered-chart'),
  image: z.string(),
  source: z.string().optional(),
  durationInFrames: z.number(),
});

const bigStatement = z.object({
  layout: z.literal('big-statement'),
  text: z.string(),
  highlight: z.string().optional(),
  label: z.string().optional(),
  size: z.enum(['hero', 'title']).optional(),
  fontSize: z.number().optional(),
  animation: z.enum(['kinetic', 'fade']).optional(),
  lineTimings: z.array(z.number()).optional(),
  wordJumps: z.array(z.object({ wordIndex: z.number(), frame: z.number() })).optional(),
  image: z.string().optional(),
  imageDelay: z.number().optional(),
  inverted: z.boolean().optional(),
  leftAlign: z.boolean().optional(),
  splitLabelRight: z.boolean().optional(),
  labelSub: z.string().optional(),
  textDelay: z.number().optional(),
  durationInFrames: z.number(),
});

const statHero = z.object({
  layout: z.literal('stat-hero'),
  stat: z.string(),
  label: z.string(),
  unit: z.string().optional(),
  context: z.string(),
  contextTiming: z.number().optional(),
  image: z.string().optional(),
  durationInFrames: z.number(),
});

const splitContrast = z.object({
  layout: z.literal('split-contrast'),
  leftLabel: z.string(),
  leftTitle: z.string().optional(),
  leftBody: z.string().optional(),
  leftBodies: z.array(z.string()).optional(),
  leftBodyTimings: z.array(z.number()).optional(),
  leftBodyHighlightIndices: z.array(z.number()).optional(),
  rightLabel: z.string().optional(),
  rightTitle: z.string().optional(),
  rightBody: z.string().optional(),
  rightBodies: z.array(z.string()).optional(),
  rightBodyTimings: z.array(z.number()).optional(),
  dividerLabel: z.string().optional(),
  showDivider: z.boolean().optional(),
  labelsOnly: z.boolean().optional(),
  leftTitleSize: z.number().optional(),
  leftBodyDelay: z.number().optional(),
  rightBodyDelay: z.number().optional(),
  equal: z.boolean().optional(),
  asCards: z.boolean().optional(),
  highlights: z.array(z.object({
    from: z.number(),
    value: z.enum(['left', 'right']).nullable(),
  })).optional(),
  durationInFrames: z.number(),
});

const methodsSlide = z.object({
  layout: z.literal('methods-slide'),
  highlights: z.array(z.object({
    from: z.number(),
    value: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]).nullable(),
  })).optional(),
  durationInFrames: z.number(),
});

const chatMessage = z.object({
  role: z.enum(['user', 'assistant']),
  text: z.string(),
  tags: z.array(z.string()).optional(),
  quality: z.enum(['weak', 'standard', 'strong']).optional(),
});

const chatThread = z.object({
  layout: z.literal('chat-thread'),
  label: z.string().optional(),
  messages: z.array(chatMessage),
  highlights: z.array(z.object({
    from: z.number(),
    value: z.number(),
  })).optional(),
  durationInFrames: z.number(),
});

const checklistSlide = z.object({
  layout: z.literal('checklist-slide'),
  label: z.string(),
  title: z.string(),
  titleHighlight: z.string().optional(),
  items: z.array(z.string()),
  itemTimings: z.array(z.number()).optional(),
  accentIndex: z.number().optional(),
  statement: z.string().optional(),
  statementWordJumps: z.array(z.object({ wordIndex: z.number(), frame: z.number() })).optional(),
  durationInFrames: z.number(),
});

const processSteps = z.object({
  layout: z.literal('process-steps'),
  label: z.string(),
  title: z.string(),
  steps: z.array(z.object({
    title: z.string(),
    body: z.string(),
  })),
  stepTimings: z.array(z.number()).optional(),
  rightLabel: z.string().optional(),
  rightSteps: z.array(z.object({ title: z.string(), body: z.string() })).optional(),
  rightStepTimings: z.array(z.number()).optional(),
  highlights: z.array(z.object({
    from: z.number(),
    value: z.enum(['left', 'right']).nullable(),
  })).optional(),
  animation: animationMode.optional(),
  durationInFrames: z.number(),
});

const threeModeColumns = z.object({
  layout: z.literal('three-mode-columns'),
  label: z.string(),
  title: z.string(),
  columns: z.tuple([
    z.object({ label: z.string(), title: z.string(), body: z.array(z.string()) }),
    z.object({ label: z.string(), title: z.string(), body: z.array(z.string()) }),
    z.object({ label: z.string(), title: z.string(), body: z.array(z.string()) }),
  ]),
  highlights: z.array(z.object({
    from: z.number(),
    value: z.union([z.literal(0), z.literal(1), z.literal(2)]).nullable(),
  })).optional(),
  durationInFrames: z.number(),
});

const modelPickerLocations = z.object({
  layout: z.literal('model-picker-locations'),
  title: z.string(),
  leftImage: z.string(),
  leftLabel: z.string(),
  rightImage: z.string(),
  rightLabel: z.string(),
  leftInnerZoomFrame: z.number(),
  rightAppearFrame: z.number(),
  leftFocusFrame: z.number(),
  durationInFrames: z.number(),
});

const promptExample = z.object({
  layout: z.literal('prompt-example'),
  label: z.string(),
  title: z.string(),
  beforeLabel: z.string().optional(),
  before: z.string(),
  afterLabel: z.string().optional(),
  after: z.string(),
  afterTiming: z.number().optional(),
  durationInFrames: z.number(),
});

const titleSlideTransition = z.object({
  layout: z.literal('title-slide-transition'),
  text: z.string(),
  label: z.string().optional(),
  body: z.array(z.string()).optional(),
  bodyTimings: z.array(z.number()).optional(),
  bodyRows: z.array(z.object({ label: z.string(), prompt: z.string() })).optional(),
  bodyRowTimings: z.array(z.number()).optional(),
  durationInFrames: z.number(),
});

const defineRangeDiagram = z.object({
  layout: z.literal('define-range-diagram'),
  modelAppearFrame: z.number().optional(),
  durationInFrames: z.number(),
});

const cotComparison = z.object({
  layout: z.literal('cot-comparison'),
  question: z.string().optional(),
  wrongAnswer: z.string().optional(),
  reasoningSteps: z.array(z.string()).optional(),
  rightAnswer: z.string().optional(),
  durationInFrames: z.number(),
});

const reasoningChain = z.object({
  layout: z.literal('reasoning-chain'),
  prompt: z.string().optional(),
  steps: z.array(z.string()).optional(),
  answer: z.string().optional(),
  label: z.string().optional(),
  durationInFrames: z.number(),
});

const thinkingTraceUI = z.object({
  layout: z.literal('thinking-trace-ui'),
  userPrompt: z.string().optional(),
  traces: z.array(z.object({ tool: z.string().optional(), text: z.string() })).optional(),
  finalAnswer: z.string().optional(),
  callouts: z.array(z.string()).optional(),
  thinkingAppearFrame: z.number().optional(),
  durationInFrames: z.number(),
});

const problemBlackbox = z.object({
  layout: z.literal('problem-blackbox'),
  label: z.string().optional(),
  text: z.string().optional(),
  highlight: z.string().optional(),
  lineTimings: z.array(z.number()).optional(),
  durationInFrames: z.number(),
});

const promptBoxSplit = z.object({
  layout: z.literal('prompt-box-split'),
  label: z.string().optional(),
  title: z.string().optional(),
  leftLabel: z.string().optional(),
  leftPrompts: z.array(z.string()).optional(),
  leftPromptTimings: z.array(z.number()).optional(),
  rightLabel: z.string().optional(),
  rightPrompts: z.array(z.string()).optional(),
  rightPromptTimings: z.array(z.number()).optional(),
  titleTiming: z.number().optional(),
  durationInFrames: z.number(),
});

const takeawayStack = z.object({
  layout: z.literal('takeaway-stack'),
  label: z.string(),
  title: z.string(),
  takeaways: z.array(z.object({
    kicker: z.string(),
    text: z.string(),
  })),
  timings: z.array(z.number()).optional(),
  durationInFrames: z.number(),
});

const largeLabelBodySplit = z.object({
  layout: z.literal('large-label-body-split'),
  bigLabel: z.string(),
  subtitle: z.string().optional(),
  body: z.array(z.string()),
  bodyTimings: z.array(z.number()).optional(),
  durationInFrames: z.number(),
});

export const sceneSchema = z.discriminatedUnion('layout', [
  titleCardGreen,
  blank,
  textImageSplit,
  centeredImageCaption,
  centeredQuote,
  comparison,
  labelTitleBody,
  centeredChart,
  bigStatement,
  statHero,
  splitContrast,
  methodsSlide,
  chatThread,
  checklistSlide,
  processSteps,
  threeModeColumns,
  modelPickerLocations,
  promptExample,
  titleSlideTransition,
  defineRangeDiagram,
  cotComparison,
  reasoningChain,
  thinkingTraceUI,
  problemBlackbox,
  promptBoxSplit,
  takeawayStack,
  largeLabelBodySplit,
]);

export const videoDataSchema = z.object({
  audioSrc: z.string().optional(),
  avatarSrc: z.string().optional(),
  keywordJumps: z.array(z.object({
    frame: z.number(),
    word: z.string(),
  })).optional(),
  scenes: z.array(sceneSchema),
});
