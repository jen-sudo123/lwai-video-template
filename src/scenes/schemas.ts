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
  imageWidth: z.number().optional(),
  imageZoom: z.object({
    centerX: z.number(),
    centerY: z.number().optional(),
    scale: z.number().optional(),
    startFrame: z.number().optional(),
  }).optional(),
});

const centeredQuote = z.object({
  layout: z.literal('centered-quote'),
  text: z.string(),
  attribution: z.string().optional(),
  durationInFrames: z.number(),
  animation: animationMode.optional(),
  highlight: z.string().optional(),
  highlightFrame: z.number().optional(),
  lineTimings: z.array(z.number()).optional(),
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
  leftObjectPosition: z.string().optional(),
  rightObjectPosition: z.string().optional(),
  showLabels: z.boolean().optional(),
  imageHeight: z.number().optional(),
  imagesTop: z.number().optional(),
});

const labelTitleBody = z.object({
  layout: z.literal('label-title-body'),
  label: z.string(),
  labelSize: z.number().optional(),
  title: z.string(),
  titleHighlight: z.string().optional(),
  body: z.array(z.string()),
  bodyTimings: z.array(z.number()).optional(),
  image: z.string().optional(),
  diagram: z.enum(['fluency-pipeline', 'ai-human-decision', 'personalization-gap', 'skill-stack']).optional(),
  diagramTimings: z.array(z.number()).optional(),
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
  imageSwaps: z.array(z.object({ from: z.number(), src: z.string() })).optional(),
  hideAvatar: z.boolean().optional(),
  hideLogo: z.boolean().optional(),
  imageFullScreen: z.boolean().optional(),
  bodyRight: z.boolean().optional(),
  bodyCards: z.boolean().optional(),
  bodyCardIcons: z.array(z.string()).optional(),
  bodyCardCompact: z.boolean().optional(),
  bodyCardBouncy: z.boolean().optional(),
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
  label: z.string().optional(),
  unit: z.string().optional(),
  context: z.string().optional(),
  contextTiming: z.number().optional(),
  image: z.string().optional(),
  images: z.array(z.string()).optional(),
  imageTimings: z.array(z.number()).optional(),
  imageZoom: z.array(z.object({
    centerX: z.number(),
    centerY: z.number().optional(),
    scale: z.number().optional(),
    startFrame: z.number().optional(),
  }).optional()).optional(),
  split: z.boolean().optional(),
  hideStat: z.boolean().optional(),
  imageLeft: z.boolean().optional(),
  imagesLayout: z.enum(['stack', 'side-by-side', 'center']).optional(),
  imageAspect: z.array(z.number()).optional(),
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
  activeTimings: z.array(z.number()).optional(),
  rightLabel: z.string().optional(),
  rightSteps: z.array(z.object({ title: z.string(), body: z.string() })).optional(),
  rightStepTimings: z.array(z.number()).optional(),
  rightActiveTimings: z.array(z.number()).optional(),
  highlights: z.array(z.object({
    from: z.number(),
    value: z.enum(['left', 'right']).nullable(),
  })).optional(),
  animation: animationMode.optional(),
  horizontal: z.boolean().optional(),
  cardStyle: z.boolean().optional(),
  titleSize: z.number().optional(),
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
    value: z.union([
      z.literal(0),
      z.literal(1),
      z.literal(2),
      z.array(z.union([z.literal(0), z.literal(1), z.literal(2)])),
    ]).nullable(),
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
  beforeOutcome: z.string().optional(),
  afterOutcome: z.string().optional(),
  beforeTiming: z.number().optional(),
  beforeOutcomeTiming: z.number().optional(),
  afterOutcomeTiming: z.number().optional(),
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
  bodyRowsAsCards: z.boolean().optional(),
  durationInFrames: z.number(),
});

const defineRangeDiagram = z.object({
  layout: z.literal('define-range-diagram'),
  modelAppearFrame: z.number().optional(),
  durationInFrames: z.number(),
});

const automationBiasDiagram = z.object({
  layout: z.literal('automation-bias-diagram'),
  judgmentAppearFrame: z.number().optional(),
  zoomStartFrame: z.number().optional(),
  zoomScale: z.number().optional(),
  durationInFrames: z.number(),
});

const cockpitCrossCheckDiagram = z.object({
  layout: z.literal('cockpit-cross-check-diagram'),
  pilotsAppearFrame: z.number().optional(),
  flyingLabelFrame: z.number().optional(),
  monitoringLabelFrame: z.number().optional(),
  challengeAppearFrame: z.number().optional(),
  responseAppearFrame: z.number().optional(),
  crossCheckAppearFrame: z.number().optional(),
  zoomStartFrame: z.number().optional(),
  zoomScale: z.number().optional(),
  durationInFrames: z.number(),
});

const doubtConfidenceDiagram = z.object({
  layout: z.literal('doubt-confidence-diagram'),
  label: z.string().optional(),
  title: z.string().optional(),
  titleHighlight: z.string().optional(),
  cardAppearFrame: z.number().optional(),
  confidentAppearFrame: z.number().optional(),
  notEqualAppearFrame: z.number().optional(),
  durationInFrames: z.number(),
});

const reasonEvidenceDiagram = z.object({
  layout: z.literal('reason-evidence-diagram'),
  label: z.string().optional(),
  title: z.string().optional(),
  titleHighlight: z.string().optional(),
  outputAppearFrame: z.number().optional(),
  assumptionsAppearFrame: z.number().optional(),
  evidenceAppearFrame: z.number().optional(),
  conclusionAppearFrame: z.number().optional(),
  humanAppearFrame: z.number().optional(),
  weakConnectionAppearFrame: z.number().optional(),
  zoomStartFrame: z.number().optional(),
  zoomScale: z.number().optional(),
  durationInFrames: z.number(),
});

const alternativesConversationDiagram = z.object({
  layout: z.literal('alternatives-conversation-diagram'),
  label: z.string().optional(),
  title: z.string().optional(),
  titleHighlight: z.string().optional(),
  humanAppearFrame: z.number().optional(),
  aiAppearFrame: z.number().optional(),
  humanEmphasisFrame: z.number().optional(),
  aiEmphasisFrame: z.number().optional(),
  humanQuote: z.string().optional(),
  humanQuoteFrame: z.number().optional(),
  aiQuote: z.string().optional(),
  aiQuoteFrame: z.number().optional(),
  durationInFrames: z.number(),
});

const factsVerificationDiagram = z.object({
  layout: z.literal('facts-verification-diagram'),
  label: z.string().optional(),
  title: z.string().optional(),
  titleHighlight: z.string().optional(),
  documentAppearFrame: z.number().optional(),
  moneyCheckFrame: z.number().optional(),
  dateCheckFrame: z.number().optional(),
  percentCheckFrame: z.number().optional(),
  companyCheckFrame: z.number().optional(),
  durationInFrames: z.number(),
});

const stakesVerificationDiagram = z.object({
  layout: z.literal('stakes-verification-diagram'),
  leftAppearFrame: z.number().optional(),
  rightAppearFrame: z.number().optional(),
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
  flyingTexts: z.array(z.string()).optional(),
  answerColor: z.string().optional(),
  answerLabel: z.string().optional(),
  answerIcon: z.string().optional(),
  answerWidth: z.number().optional(),
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
  title: z.string().optional(),
  takeaways: z.array(z.object({
    kicker: z.string(),
    text: z.string(),
  })),
  timings: z.array(z.number()).optional(),
  centered: z.boolean().optional(),
  durationInFrames: z.number(),
});

const videoClip = z.object({
  layout: z.literal('video-clip'),
  videoSrc: z.string(),
  videoStartTime: z.number(),
  label: z.string().optional(),
  title: z.string().optional(),
  body: z.array(z.string()).optional(),
  bodyTimings: z.array(z.number()).optional(),
  overlayPosition: z.enum(['bottom', 'top', 'right', 'top-right', 'center']).optional(),
  overlayHideFrom: z.number().optional(),
  bodyOpenFrom: z.number().optional(),
  bodyAnimation: animationMode.optional(),
  openBodyAnimation: animationMode.optional(),
  openBodyVariant: z.enum(['default', 'quote']).optional(),
  openBodyHideFrom: z.number().optional(),
  titleCentered: z.boolean().optional(),
  logoPosition: z.enum(['bottom-left', 'bottom-right']).optional(),
  panelLayout: z.enum(['text-left', 'cards-left', 'quote-cards-left']).optional(),
  panelLeft: z.number().optional(),
  clipTransform: z.object({
    scale: z.number().optional(),
    translateX: z.number().optional(),
    translateY: z.number().optional(),
  }).optional(),
  clipZoom: z.object({
    scale: z.number(),
    originX: z.number(),
    originY: z.number(),
  }).optional(),
  clipZoomKeyframes: z.array(z.object({
    startFrame: z.number(),
    scale: z.number(),
    originX: z.number(),
    originY: z.number(),
  })).optional(),
  whiteoutBox: z.object({
    top: z.number(),
    left: z.number(),
    width: z.number(),
    height: z.number(),
  }).optional(),
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

const imageMarquee = z.object({
  layout: z.literal('image-marquee'),
  label: z.string().optional(),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  images: z.array(z.string()),
  durationInFrames: z.number(),
});

const rect = z.tuple([z.number(), z.number(), z.number(), z.number()]);

const screenDemo = z.object({
  layout: z.literal('screen-demo'),
  label: z.string(),
  steps: z.array(z.object({ from: z.number(), text: z.string(), label: z.string().optional() })),
  shots: z.array(z.object({
    from: z.number(),
    image: z.string().optional(),
    imageSize: z.tuple([z.number(), z.number()]),
    transition: z.enum(['slide', 'fade', 'cut']).optional(),
    camera: z.array(z.object({ frame: z.number(), x: z.number(), y: z.number(), zoom: z.number() })).optional(),
    spotlights: z.array(z.object({ rect, from: z.number(), to: z.number().optional() })).optional(),
    marks: z.array(z.object({ type: z.enum(['underline', 'circle']), rect, from: z.number() })).optional(),
    cursor: z.array(z.object({ frame: z.number(), x: z.number(), y: z.number(), click: z.boolean().optional() })).optional(),
    typing: z.object({ rect, text: z.string(), from: z.number(), to: z.number(), fontSize: z.number(), textX: z.number(), lineHeight: z.number().optional() }).optional(),
    reveal: z.object({ rect, from: z.number(), duration: z.number() }).optional(),
    compare: z.object({
      before: z.string(),
      after: z.string(),
      beforeLabel: z.string(),
      afterLabel: z.string(),
      highlight: rect,
      highlightFrom: z.number(),
      stamp: z.string(),
      stampFrom: z.number(),
      statement: z.string(),
      statementHighlight: z.string(),
      statementFrom: z.number(),
      crop: rect.optional(),
    }).optional(),
  })),
  durationInFrames: z.number(),
});

export const sceneSchema = z.discriminatedUnion('layout', [
  titleCardGreen,
  screenDemo,
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
  automationBiasDiagram,
  cockpitCrossCheckDiagram,
  doubtConfidenceDiagram,
  reasonEvidenceDiagram,
  alternativesConversationDiagram,
  factsVerificationDiagram,
  stakesVerificationDiagram,
  cotComparison,
  reasoningChain,
  thinkingTraceUI,
  problemBlackbox,
  promptBoxSplit,
  takeawayStack,
  largeLabelBodySplit,
  videoClip,
  imageMarquee,
  z.object({
    layout: z.literal('acronym-spotlight'),
    label: z.string(),
    items: z.array(z.object({ letter: z.string(), word: z.string(), detail: z.string().optional() })),
    spotlight: z.object({ index: z.number(), from: z.number() }).optional(),
    durationInFrames: z.number(),
  }),
  z.object({
    layout: z.literal('line-chart'),
    title: z.string().optional(),
    data: z.array(z.object({ label: z.string(), value: z.number() })).optional(),
    durationInFrames: z.number(),
  }),
  z.object({
    layout: z.literal('jagged-frontier-diagram'),
    lineStartFrame: z.number().optional(),
    lineDrawFrames: z.number().optional(),
    graduateCardFrame: z.number().optional(),
    gameCardFrame: z.number().optional(),
    durationInFrames: z.number(),
  }),
  z.object({
    layout: z.literal('meeting-checklist-diagram'),
    itemTimings: z.array(z.number()).optional(),
    durationInFrames: z.number(),
  }),
  z.object({
    layout: z.literal('access-workflow-diagram'),
    arrowFrame: z.number().optional(),
    durationInFrames: z.number(),
  }),
  z.object({
    layout: z.literal('bounded-autonomy-diagram'),
    aiFrame: z.number().optional(),
    humanFrame: z.number().optional(),
    approvalFrame: z.number().optional(),
    judgmentFrame: z.number().optional(),
    accountabilityFrame: z.number().optional(),
    durationInFrames: z.number(),
  }),
  z.object({
    layout: z.literal('bias-funnel-diagram'),
    cardTimings: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
    modelAppearFrame: z.number().optional(),
    durationInFrames: z.number(),
  }),
]);

export const videoDataSchema = z.object({
  audioSrc: z.string().optional(),
  audioStartFrame: z.number().optional(),
  avatarSrc: z.string().optional(),
  avatarStartFrame: z.number().optional(),
  clipSrc: z.string().optional(),
  clipStartFrame: z.number().optional(),
  clipMuted: z.boolean().optional(),
  keywordJumps: z.array(z.object({
    frame: z.number(),
    word: z.string(),
  })).optional(),
  captions: z.array(z.object({
    word: z.string(),
    startFrame: z.number(),
    endFrame: z.number(),
  })).optional(),
  sceneTransition: z.object({
    type: z.literal('slide'),
    durationInFrames: z.number().optional(),
    between: z.enum(['scenes', 'images']).optional(),
  }).optional(),
  scenes: z.array(sceneSchema),
});
