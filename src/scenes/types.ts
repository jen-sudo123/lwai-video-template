// Scene types. This is what you fill in when creating a video.
// Every scene needs a `durationInFrames` (30 frames = 1 second at 30fps).

export type AnimationMode = 'kinetic' | 'fade' | 'auto';

export type Scene =
  | {
      // Recap note: title left, reminder note right whose items tick off on the VO words,
      // then an optional dark "next" bar and serif kicker. See ReminderNote.tsx.
      layout: 'reminder';
      label: string;
      title: string;
      noteTitle: string;
      noteMeta?: string;
      items: Array<{ text: string; from: number }>;
      next?: { label: string; text: string; from: number };
      kicker?: { text: string; from: number };
      durationInFrames: number;
    }
  | {
      // Screenshot tutorial that behaves like a screen recording: virtual camera, spotlight,
      // cursor + click, typed input, revealed replies, drawn marks, before/after compare.
      // See ScreenDemo.tsx for the shot fields (rects/points in screenshot pixels).
      layout: 'screen-demo';
      label: string;
      steps: Array<{ from: number; text: string; label?: string }>;
      shots: import('./ScreenDemo').ScreenDemoShot[];
      durationInFrames: number;
    }
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
      imageZoom?: {
        centerX: number;
        centerY?: number;
        scale?: number;
        startFrame?: number;
      };
    }
  | {
      layout: 'centered-quote';
      text: string;
      attribution?: string;
      durationInFrames: number;
      animation?: AnimationMode;
      highlight?: string;
      // Frame at which the highlighted span bounces/pops and switches to lime.
      // Omit to have it lime from the moment the line itself appears.
      highlightFrame?: number;
      lineTimings?: number[];
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
      leftObjectPosition?: string;
      rightObjectPosition?: string;
      showLabels?: boolean;
      imageHeight?: number;
      imagesTop?: number;
    }
  | {
      layout: 'label-title-body';
      label: string;
      labelSize?: number;
      title: string;
      // Substring of `title` to render in lime (e.g. the initial letter of "D Is for Doubt").
      titleHighlight?: string;
      body: string[];
      // Per-item delay in frames (within the scene) before each body line fades in.
      // Index matches body[]. Defaults to 0 for any item without an entry.
      bodyTimings?: number[];
      // Optional image path under /public/ — shown on the right with a punchy pop-in animation.
      image?: string;
      // Renders a built-in animated diagram in the image column instead of a static image.
      // Its parts reveal one-by-one; diagramTimings gives per-step frame offsets (defaults built in).
      diagram?: 'fluency-pipeline' | 'ai-human-decision' | 'personalization-gap' | 'skill-stack';
      diagramTimings?: number[];
      // Optional array of image paths — renders a stacked column on the right (overrides `image`).
      images?: string[];
      // Per-image reveal delay in frames (matches images[]). Defaults to 0.
      imageTimings?: number[];
      // Override the single-image container height (default 580).
      imageHeight?: number;
      // When true, the image fills the entire canvas behind the text column.
      imageFullScreen?: boolean;
      // Pricing grid: label+title top-right, first 4 cards in 2×2 grid, 5th card centered below.
      pricingGrid?: boolean;
      // When true, label+title sit in the left column and body items appear as a list on the right.
      bodyRight?: boolean;
      // When true (with bodyRight), each body string is split at ": " and rendered as a card.
      bodyCards?: boolean;
      // Heroicon name per card (e.g. 'bolt', 'sparkles'). Matches index of body[].
      bodyCardIcons?: string[];
      // When true, renders body cards in compact mode (smaller padding + text). Use with 4+ cards.
      bodyCardCompact?: boolean;
      bodyCardBouncy?: boolean;
      bodyCardAccents?: boolean[];
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
      // Crossfade the single image to another src at a scene-local frame (e.g. move a highlight).
      imageSwaps?: Array<{ from: number; src: string }>;
      // Hide the persistent avatar overlay for this scene.
      hideAvatar?: boolean;
      // Hide the LogoFooter for this scene.
      hideLogo?: boolean;
      // bodyRight only: crossfade lit/dim between left title and right cards.
      highlights?: Array<{ from: number; value: 'left' | 'right' | null }>;
      // bodyRight only: small note rendered below the title in the left column.
      titleNote?: string;
      titleNoteDelay?: number;
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
      label?: string;
      /** Small subtitle rendered directly below the stat (e.g. "message in the conversation") */
      unit?: string;
      context?: string;
      contextTiming?: number;
      // Optional image shown to the right of the stat (path under /public/)
      image?: string;
      // Optional array of image paths — renders a stacked column on the right
      // (overrides `image`). Use for source citations (e.g. a definition card
      // plus a report cover).
      images?: string[];
      // Per-image reveal delay in frames (matches images[]). Defaults to 0.
      imageTimings?: number[];
      // Per-image zoom-in effect (matches images[] index) — zooms into a region
      // of that image after it appears. Omit an entry to leave that image static.
      imageZoom?: Array<{ centerX: number; centerY?: number; scale?: number; startFrame?: number } | undefined>;
      split?: boolean;
      // When true, skips the giant stat number — use when the image(s) already
      // show the number and repeating it is redundant.
      hideStat?: boolean;
      // When true, the image(s) render on the left and the stat column on the
      // right, centered within its column.
      imageLeft?: boolean;
      // 'side-by-side' renders exactly two images as equal left/right panels
      // filling the frame — no stat number, label, or context.
      imagesLayout?: 'stack' | 'side-by-side' | 'center';
      // Natural width/height ratio per image (matches images[] index) — sizes
      // each side-by-side panel to fit without letterbox bars. Default 16/9.
      imageAspect?: number[];
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
      // When true, the right title shatters into individual characters that
      // fly apart with rotation, like breaking glass.
      rightTitleBreak?: boolean;
      rightTitleBreakFrame?: number;
      // When set, the right column renders dimmed from frame 0 and transitions
      // to fully lit starting at this frame (independent of rightTitleBreak timing).
      rightLightUpFrame?: number;
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
      activeTimings?: number[];
      rightLabel?: string;
      rightSteps?: Array<{ title: string; body: string }>;
      rightStepTimings?: number[];
      rightActiveTimings?: number[];
      highlights?: Array<{ from: number; value: 'left' | 'right' | null }>;
      animation?: AnimationMode;
      // When true (single-column mode only), steps lay out left-to-right in a
      // row instead of stacked vertically — a horizontal stepper/timeline.
      horizontal?: boolean;
      // When true (horizontal mode only), each step renders as a bordered
      // rounded card (matching the three-mode-columns card look) instead of
      // the thin top-line + numbered-square stepper.
      cardStyle?: boolean;
      // Override the horizontal-mode title font size (default 64).
      titleSize?: number;
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
      highlights?: Array<{ from: number; value: 0 | 1 | 2 | Array<0 | 1 | 2> | null }>;
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
      beforeOutcome?: string;
      afterOutcome?: string;
      beforeTiming?: number;
      beforeOutcomeTiming?: number;
      afterOutcomeTiming?: number;
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
      // When true, renders bodyRows as a row of bordered cards instead of
      // stacked label | prompt rows.
      bodyRowsAsCards?: boolean;
      // When true, the title stays centered on screen instead of dragging
      // from the right-column position to the top-left corner.
      centered?: boolean;
      durationInFrames: number;
    }
  | {
      layout: 'define-range-diagram';
      modelAppearFrame?: number;
      durationInFrames: number;
    }
  | {
      // Automation-bias 2x2 diagram. Axes + "Defer to AI" quadrant are present
      // from frame 0; "Apply your judgment" quadrant fades in on top at
      // judgmentAppearFrame, without swapping or redrawing the rest.
      layout: 'automation-bias-diagram';
      judgmentAppearFrame?: number;
      // Scene-relative frame at which the camera zooms into and holds on the
      // "Apply your judgment" corner. Omit to disable the zoom.
      zoomStartFrame?: number;
      zoomScale?: number;
      durationInFrames: number;
    }
  | {
      // Pilot-flying / pilot-monitoring cockpit cross-check diagram (Challenge →
      // Response → Cross-check). Cockpit frame + both figures fade in at
      // pilotsAppearFrame; labels light up lime at their own frames; the center
      // process column reveals step-by-step; an optional zoom pushes in on the
      // pilot-monitoring side and holds.
      layout: 'cockpit-cross-check-diagram';
      pilotsAppearFrame?: number;
      flyingLabelFrame?: number;
      monitoringLabelFrame?: number;
      challengeAppearFrame?: number;
      responseAppearFrame?: number;
      crossCheckAppearFrame?: number;
      zoomStartFrame?: number;
      zoomScale?: number;
      durationInFrames: number;
    }
  | {
      // AI document card (confident, polished report) vs. a plain "CONFIDENT ≠
      // CORRECT" statement — illustrates that a fluent answer isn't proof it's
      // right. Used for the "D Is for Doubt" beat.
      layout: 'doubt-confidence-diagram';
      label?: string;
      title?: string;
      titleHighlight?: string;
      cardAppearFrame?: number;
      confidentAppearFrame?: number;
      notEqualAppearFrame?: number;
      durationInFrames: number;
    }
  | {
      // AI Output → Assumptions → Evidence → Conclusion pipeline, with a human
      // figure using a magnifying glass to find a weak link between an
      // assumption and its evidence. Used for the "R Is for Reason" beat.
      layout: 'reason-evidence-diagram';
      label?: string;
      title?: string;
      titleHighlight?: string;
      outputAppearFrame?: number;
      assumptionsAppearFrame?: number;
      evidenceAppearFrame?: number;
      conclusionAppearFrame?: number;
      humanAppearFrame?: number;
      weakConnectionAppearFrame?: number;
      zoomStartFrame?: number;
      zoomScale?: number;
      durationInFrames: number;
    }
  | {
      // A human and an AI mid-conversation, each with a speech bubble and
      // their own lime "emphasis" marks. Used for the "A Is for Alternatives" beat.
      layout: 'alternatives-conversation-diagram';
      label?: string;
      title?: string;
      titleHighlight?: string;
      humanAppearFrame?: number;
      aiAppearFrame?: number;
      humanEmphasisFrame?: number;
      aiEmphasisFrame?: number;
      humanQuote?: string;
      humanQuoteFrame?: number;
      aiQuote?: string;
      aiQuoteFrame?: number;
      durationInFrames: number;
    }
  | {
      // An AI document with four checkable claims (a euro figure, a date, a
      // percentage, a proper noun), each getting its own magnifying-glass
      // verification and checkmark. Used for the "F Is for Facts and
      // Sources" beat.
      layout: 'facts-verification-diagram';
      label?: string;
      title?: string;
      titleHighlight?: string;
      documentAppearFrame?: number;
      moneyCheckFrame?: number;
      dateCheckFrame?: number;
      percentCheckFrame?: number;
      companyCheckFrame?: number;
      durationInFrames: number;
    }
  | {
      // Low stakes (a quick internal message, checked with just D + F) vs
      // high stakes (a client or leadership deliverable, checked with the
      // full DRAFT and a deeper verification pass).
      layout: 'stakes-verification-diagram';
      leftAppearFrame?: number;
      rightAppearFrame?: number;
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
      flyingTexts?: string[];
      answerColor?: string;
      answerLabel?: string;
      answerIcon?: string;
      answerWidth?: number;
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
      layout: 'video-clip';
      videoSrc: string;
      videoStartTime: number;
      label?: string;
      title?: string;
      body?: string[];
      bodyTimings?: number[];
      overlayPosition?: 'bottom' | 'top' | 'right' | 'top-right' | 'center';
      overlayHideFrom?: number;
      bodyOpenFrom?: number;
      bodyAnimation?: AnimationMode;
      openBodyAnimation?: AnimationMode;
      openBodyVariant?: 'default' | 'quote';
      openBodyHideFrom?: number;
      titleCentered?: boolean;
      logoPosition?: 'bottom-left' | 'bottom-right';
      panelLayout?: 'text-left' | 'cards-left' | 'quote-cards-left';
      panelLeft?: number;
      clipTransform?: {
        scale?: number;
        translateX?: number;
        translateY?: number;
      };
      clipZoom?: { scale: number; originX: number; originY: number };
      clipZoomKeyframes?: Array<{ startFrame: number; scale: number; originX: number; originY: number }>;
      skipCardAnimation?: boolean;
      cardDelay?: number;
      // Plain white rectangle painted over the video for this scene's full duration —
      // used to cover baked-in text in source footage that's since gone stale.
      whiteoutBox?: { top: number; left: number; width: number; height: number };
      durationInFrames: number;
    }
  | {
      layout: 'takeaway-stack';
      label: string;
      title?: string;
      takeaways: Array<{
        kicker: string;
        text: string;
      }>;
      timings?: number[];
      centered?: boolean;
      durationInFrames: number;
    }
  | {
      layout: 'image-marquee';
      label?: string;
      title?: string;
      subtitle?: string;
      /** Image paths under /public/ — displayed in two scrolling rows */
      images: string[];
      durationInFrames: number;
    }
  | {
      layout: 'acronym-spotlight';
      label: string;
      items: Array<{ letter: string; word: string }>;
      /** Which item to spotlight and when (scene-relative frame) */
      spotlight?: { index: number; from: number };
      durationInFrames: number;
    }
  | {
      layout: 'line-chart';
      title?: string;
      data?: Array<{ label: string; value: number }>;
      durationInFrames: number;
    }
  | {
      // Full-screen jagged-frontier illustration (title + good/struggle zones
      // appear immediately; the zigzag line draws itself along its own path).
      layout: 'jagged-frontier-diagram';
      // Scene-local frame at which the line begins drawing. Default 0.
      lineStartFrame?: number;
      // How many frames the draw-on animation takes. Default 100.
      lineDrawFrames?: number;
      // Scene-local frame the graduate-level-problem card appears. Defaults
      // to right when the line finishes drawing.
      graduateCardFrame?: number;
      // Scene-local frame the tiny-unfamiliar-game card appears. Defaults to
      // shortly after the graduate card.
      gameCardFrame?: number;
      durationInFrames: number;
    }
  | {
      // Meeting-prep checklist: title + dividers present from frame 0, each
      // row checks off (lime fill, checkmark, darkened text) at its own
      // itemTimings entry and stays checked afterward.
      layout: 'meeting-checklist-diagram';
      itemTimings?: number[];
      durationInFrames: number;
    }
  | {
      // Two linked icons — a connector (work context) feeding, via an arrow,
      // into a checklist-with-repeat (reusable workflow) — with the VO
      // sentence as a caption underneath.
      layout: 'access-workflow-diagram';
      arrowFrame?: number;
      durationInFrames: number;
    }
  | {
      // AI-side card (boundary, chip, use tools / analyze / draft) handing off
      // via an arrow to a human-side card (approval / judgment / accountability).
      // Each section fades in at its own frame, timed to the VO.
      layout: 'bounded-autonomy-diagram';
      aiFrame?: number;
      humanFrame?: number;
      approvalFrame?: number;
      judgmentFrame?: number;
      accountabilityFrame?: number;
      durationInFrames: number;
    }
  | {
      // Four input cards (training data, available context, language, prompt
      // framing) feeding top-down into a funnel labeled "AI model", narrowing
      // to a single "AI answer" output.
      layout: 'bias-funnel-diagram';
      cardTimings?: [number, number, number, number];
      modelAppearFrame?: number;
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
  // Optional frame offset before the audio starts playing.
  audioStartFrame?: number;
  // Cut the main audioSrc at each cutFrame and resume at resumeFrame, playing a
  // separate clip (e.g. a news-update VO) in the gap. By default the main track
  // just pauses and resumes from exactly where it left off (no drift, no content
  // lost — same pattern as avatarCutFrame). Set skipFrames to also discard that
  // many frames of the ORIGINAL track's own content (a true cut-and-replace,
  // rather than a pause) — e.g. when the insert clip replaces a VO passage
  // outright instead of just standing in for a pause. Sort order doesn't matter;
  // entries are applied in cutFrame order.
  audioInserts?: Array<{
    cutFrame: number;
    resumeFrame: number;
    src: string;
    from?: number; // composition frame the insert clip starts. Defaults to cutFrame.
    skipFrames?: number;
  }>;
  // Optional presenter avatar video path under /public/ — renders as a circular overlay.
  avatarSrc?: string;
  avatarStartFrame?: number;
  // Optional continuous background video (e.g. screen recording) that plays behind all scenes.
  // When set, video-clip scenes only render their text overlay — the video layer is shared.
  clipSrc?: string;
  clipStartFrame?: number;
  clipMuted?: boolean;
  // Absolute composition frames where a keyword should visibly jump.
  keywordJumps?: Array<{
    frame: number;
    word: string;
  }>;
  // Animate the avatar overlay between corner and center positions.
  // Each keyframe is when that state begins transitioning; transitions take 30 frames.
  avatarKeyframes?: Array<{
    frame: number;
    /** corner = top-right small; center = large centered; right-column = large, centered in right 54% */
    position: 'corner' | 'center' | 'right-column';
    size?: number;
  }>;
  // Absolute frame ranges where the avatar overlay should be hidden.
  avatarHideRanges?: Array<{ from: number; to: number }>;
  // Cut the avatar at this composition frame and resume at avatarResumeFrame,
  // picking up the avatar video from exactly where it left off (no drift).
  avatarCutFrame?: number;
  avatarResumeFrame?: number;
  // Opt-in scene-to-scene transition. 'slide': each scene slides in from the right while the
  // previous one slides out left. Scene start frames are unchanged (the outgoing scene stays
  // mounted for the extra frames), so VO timings don't move. Default 15 frames.
  // between: 'scenes' (default) slides at every scene change; 'images' only where one image
  // scene follows another with a different image — all other changes stay hard cuts.
  sceneTransition?: { type: 'slide'; durationInFrames?: number; between?: 'scenes' | 'images' };
  // Word-level captions for karaoke-style subtitle overlay.
  captions?: import('../CaptionOverlay').WordCaption[];
};
