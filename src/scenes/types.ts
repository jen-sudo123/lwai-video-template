// Scene types. This is what you fill in when creating a video.
// Every scene needs a `durationInFrames` (30 frames = 1 second at 30fps).

export type AnimationMode = 'kinetic' | 'fade' | 'auto';

export type Scene =
  | {
      layout: 'title-card-green';
      title: string;
      subtitle?: string;
      label?: string;
      durationInFrames: number;
    }
  | {
      layout: 'blank';
      durationInFrames: number;
    }
  | {
      layout: 'text-image-split';
      text: string;
      image: string; // path under /public/
      durationInFrames: number;
      animation?: AnimationMode;
    }
  | {
      layout: 'centered-image-caption';
      image: string;
      caption?: string;
      durationInFrames: number;
      animation?: AnimationMode;
      objectFit?: 'cover' | 'contain';
      imageWidth?: number;
    }
  | {
      layout: 'centered-quote';
      text: string;
      attribution?: string;
      durationInFrames: number;
      animation?: AnimationMode;
    }
  | {
      layout: 'comparison';
      title: string;
      leftImage: string;
      leftLabel: string;
      rightImage: string;
      rightLabel: string;
      durationInFrames: number;
      animation?: AnimationMode;
      highlights?: Array<{ from: number; value: 'left' | 'right' | null }>;
      objectFit?: 'cover' | 'contain';
      showLabels?: boolean;
      imageHeight?: number;
    }
  | {
      layout: 'label-title-body';
      label: string;
      title: string;
      body: string[];
      // Per-item delay in frames (within the scene) before each body line fades in.
      // Index matches body[]. Defaults to 0 for any item without an entry.
      bodyTimings?: number[];
      // Optional image path under /public/ — shown on the right with a punchy pop-in animation.
      image?: string;
      // Optional array of image paths — renders a stacked column on the right (overrides `image`).
      images?: string[];
      // Per-image reveal delay in frames (matches images[]). Defaults to 0.
      imageTimings?: number[];
      // Override the single-image container height (default 580).
      imageHeight?: number;
      // When true, the image fills the entire canvas behind the text column.
      imageFullScreen?: boolean;
      // When true, label+title sit in the left column and body items appear as a list on the right.
      bodyRight?: boolean;
      // When true (with bodyRight), each body string is split at ": " and rendered as a card.
      bodyCards?: boolean;
      // Heroicon name per card (e.g. 'bolt', 'sparkles'). Matches index of body[].
      bodyCardIcons?: string[];
      // When true (with bodyRight), each body item is prefixed with a red ✕ icon.
      bodyXList?: boolean;
      // When true, image appears on the left and text column on the right.
      imageLeft?: boolean;
      // When set, the image zooms into a specific horizontal region after appearing.
      imageZoom?: {
        // 0–1 normalised X centre of the region (0=left edge, 0.5=centre, 1=right edge)
        centerX: number;
        // Target zoom multiplier, e.g. 2.2 (default 2)
        scale?: number;
        // Frame within the scene to start zooming (default 30)
        startFrame?: number;
      };
      // Multi-keyframe zoom/pan — springs from each state to the next.
      imageZoomKeyframes?: Array<{
        startFrame: number;
        centerX?: number;
        centerY?: number;
        scale?: number;
      }>;
      // Skip the entry pop-in for imageZoomKeyframes (use when continuing from previous scene).
      imageZoomNoEntry?: boolean;
      // Hide the persistent avatar overlay for this scene.
      hideAvatar?: boolean;
      // Hide the LogoFooter for this scene.
      hideLogo?: boolean;
      // bodyRight only: crossfade lit/dim between left title and right cards.
      highlights?: Array<{ from: number; value: 'left' | 'right' | null }>;
      durationInFrames: number;
      animation?: AnimationMode;
    }
  | {
      layout: 'centered-chart';
      image: string;
      source?: string;
      durationInFrames: number;
    }
  | {
      layout: 'big-statement';
      text: string;
      highlight?: string;
      label?: string;
      size?: 'hero' | 'title';
      // Direct px font size override — takes precedence over size when set.
      fontSize?: number;
      animation?: 'kinetic' | 'fade';
      // Per-line fade delays in frames (fade mode only). Matches \n-split lines.
      lineTimings?: number[];
      // Kinetic only: bounce a word (by zero-based index) at a specific scene frame.
      wordJumps?: Array<{ wordIndex: number; frame: number }>;
      // Optional image path under /public/ — fades in below the text.
      image?: string;
      imageDelay?: number;
      inverted?: boolean;
      leftAlign?: boolean;
      splitLabelRight?: boolean;
      labelSub?: string;
      textDelay?: number;
      durationInFrames: number;
    }
  | {
      layout: 'stat-hero';
      stat: string;
      label: string;
      /** Small subtitle rendered directly below the stat (e.g. "message in the conversation") */
      unit?: string;
      context: string;
      contextTiming?: number;
      // Optional image shown to the right of the stat (path under /public/)
      image?: string;
      durationInFrames: number;
    }
  | {
      layout: 'split-contrast';
      leftLabel: string;
      leftTitle?: string;
      leftBody?: string;
      leftBodies?: string[];
      leftBodyTimings?: number[];
      rightLabel?: string;
      rightTitle?: string;
      rightBody?: string;
      rightBodies?: string[];
      rightBodyTimings?: number[];
      dividerLabel?: string;
      showDivider?: boolean;
      labelsOnly?: boolean;
      leftTitleSize?: number;
      leftBodyDelay?: number;
      rightBodyDelay?: number;
      // When true, both columns use identical neutral styling — no lime, no dimming.
      equal?: boolean;
      // Zero-based indices of leftBodies items to render in lime.
      leftBodyHighlightIndices?: number[];
      // Crossfade highlight schedule (same pattern as methods-slide).
      // null = both sides full; 'left'/'right' = that side lit, other dimmed.
      highlights?: Array<{ from: number; value: 'left' | 'right' | null }>;
      durationInFrames: number;
    }
  | {
      // Shows the four-techniques slide from lead_with_ai_prompting_slide.jsx.
      // highlights: ordered schedule of highlight changes within the scene.
      //   from  — frame offset (within this scene) when the change fires
      //   value — null = all cards equal, 1–4 = spotlight that technique
      // The slide fades in once; highlights crossfade at each transition.
      layout: 'methods-slide';
      highlights?: Array<{ from: number; value: 1 | 2 | 3 | 4 | null }>;
      durationInFrames: number;
    }
  | {
      // A cinematic chat-thread UI with bottom-anchored messages.
      // Messages reveal progressively: highlights[].value = count of visible messages.
      // User bubbles: light-green (#F0F9E8), right-aligned.
      // AI bubbles: white with quality left-border (weak=grey, strong=lime).
      // Constraint tags: lime pill badges rendered above the user bubble.
      layout: 'chat-thread';
      label?: string;
      messages: ChatMessage[];
      highlights?: Array<{ from: number; value: number }>;
      durationInFrames: number;
    }
  | {
      layout: 'checklist-slide';
      label: string;
      title: string;
      titleHighlight?: string;
      items: string[];
      itemTimings?: number[];
      // Zero-based item index to render with lime emphasis.
      accentIndex?: number;
      // When set, replaces the title with a large kinetic statement in the left column.
      statement?: string;
      statementWordJumps?: Array<{ wordIndex: number; frame: number }>;
      durationInFrames: number;
    }
  | {
      layout: 'process-steps';
      label: string;
      title: string;
      steps: Array<{ title: string; body: string }>;
      stepTimings?: number[];
      rightLabel?: string;
      rightSteps?: Array<{ title: string; body: string }>;
      rightStepTimings?: number[];
      highlights?: Array<{ from: number; value: 'left' | 'right' | null }>;
      animation?: AnimationMode;
      durationInFrames: number;
    }
  | {
      layout: 'three-mode-columns';
      label: string;
      title: string;
      columns: [
        { label: string; title: string; body: string[] },
        { label: string; title: string; body: string[] },
        { label: string; title: string; body: string[] },
      ];
      highlights?: Array<{ from: number; value: 0 | 1 | 2 | null }>;
      durationInFrames: number;
    }
  | {
      layout: 'model-picker-locations';
      title: string;
      leftImage: string;
      leftLabel: string;
      rightImage: string;
      rightLabel: string;
      leftInnerZoomFrame: number;
      rightAppearFrame: number;
      leftFocusFrame: number;
      durationInFrames: number;
    }
  | {
      layout: 'prompt-example';
      label: string;
      title: string;
      beforeLabel?: string;
      before: string;
      afterLabel?: string;
      after: string;
      afterTiming?: number;
      durationInFrames: number;
    }
  | {
      layout: 'title-slide-transition';
      text: string;
      label?: string;
      body?: string[];
      bodyTimings?: number[];
      bodyRows?: Array<{ label: string; prompt: string }>;
      bodyRowTimings?: number[];
      durationInFrames: number;
    }
  | {
      layout: 'define-range-diagram';
      modelAppearFrame?: number;
      durationInFrames: number;
    }
  | {
      layout: 'cot-comparison';
      question?: string;
      wrongAnswer?: string;
      reasoningSteps?: string[];
      rightAnswer?: string;
      durationInFrames: number;
    }
  | {
      layout: 'reasoning-chain';
      prompt?: string;
      steps?: string[];
      answer?: string;
      label?: string;
      durationInFrames: number;
    }
  | {
      layout: 'thinking-trace-ui';
      userPrompt?: string;
      traces?: Array<{ tool?: string; text: string }>;
      finalAnswer?: string;
      callouts?: string[];
      thinkingAppearFrame?: number;
      durationInFrames: number;
    }
  | {
      layout: 'problem-blackbox';
      label?: string;
      text?: string;
      highlight?: string;
      lineTimings?: number[];
      durationInFrames: number;
    }
  | {
      layout: 'prompt-box-split';
      label?: string;
      title?: string;
      leftLabel?: string;
      leftPrompts?: string[];
      leftPromptTimings?: number[];
      rightLabel?: string;
      rightPrompts?: string[];
      rightPromptTimings?: number[];
      titleTiming?: number;
      durationInFrames: number;
    }
  | {
      layout: 'takeaway-stack';
      label: string;
      title: string;
      takeaways: Array<{
        kicker: string;
        text: string;
      }>;
      timings?: number[];
      durationInFrames: number;
    };

export type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
  /** Lime pill badges rendered above a user bubble */
  tags?: string[];
  /** Controls the AI bubble left-border colour */
  quality?: 'weak' | 'standard' | 'strong';
};

export type VideoData = {
  scenes: Scene[];
  // Optional voiceover audio path under /public/, e.g. 'audio/voiceover.mp3'
  audioSrc?: string;
  // Optional presenter avatar video path under /public/ — renders as a circular overlay.
  avatarSrc?: string;
  // Absolute composition frames where a keyword should visibly jump.
  keywordJumps?: Array<{
    frame: number;
    word: string;
  }>;
};
