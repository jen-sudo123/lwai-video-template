import React from 'react';
import { Scene } from './types';
import { TitleCardGreen } from './TitleCardGreen';
import { BlankBase } from './BlankBase';
import { TextImageSplit } from './TextImageSplit';
import { CenteredImageCaption } from './CenteredImageCaption';
import { CenteredQuote } from './CenteredQuote';
import { Comparison } from './Comparison';
import { LabelTitleBody } from './LabelTitleBody';
import { CenteredChart } from './CenteredChart';
import { BigStatement } from './BigStatement';
import { StatHero } from './StatHero';
import { SplitContrast } from './SplitContrast';
import { MethodsSlide } from './MethodsSlide';
import { ChatThread } from './ChatThread';
import { ChecklistSlide } from './ChecklistSlide';
import { ProcessSteps } from './ProcessSteps';
import { PromptExample } from './PromptExample';
import { TakeawayStack } from './TakeawayStack';
import { TitleSlideTransition } from './TitleSlideTransition';
import { DefineRangeDiagram } from './DefineRangeDiagram';
import { CoTComparison } from './CoTComparison';
import { ReasoningChain } from './ReasoningChain';
import { ThinkingTraceUI } from './ThinkingTraceUI';
import { ProblemBlackBox } from './ProblemBlackBox';
import { PromptBoxSplit } from './PromptBoxSplit';
import { ThreeModeColumns } from './ThreeModeColumns';
import { ModelPickerLocations } from './ModelPickerLocations';
import { LargeLabelBodySplit } from './LargeLabelBodySplit';

// Routes a scene to its component. Add new layouts here as you create them.
export const SceneRenderer: React.FC<{ scene: Scene }> = ({ scene }) => {
  switch (scene.layout) {
    case 'title-card-green':
      return (
        <TitleCardGreen
          title={scene.title}
          subtitle={scene.subtitle}
          label={scene.label}
        />
      );
    case 'blank':
      return <BlankBase />;
    case 'text-image-split':
      return (
        <TextImageSplit
          text={scene.text}
          image={scene.image}
          animation={scene.animation}
        />
      );
    case 'centered-image-caption':
      return (
        <CenteredImageCaption
          image={scene.image}
          caption={scene.caption}
          animation={scene.animation}
          objectFit={scene.objectFit}
          imageWidth={scene.imageWidth}
        />
      );
    case 'centered-quote':
      return (
        <CenteredQuote
          text={scene.text}
          attribution={scene.attribution}
          animation={scene.animation}
        />
      );
    case 'comparison':
      return (
        <Comparison
          title={scene.title}
          leftImage={scene.leftImage}
          leftLabel={scene.leftLabel}
          rightImage={scene.rightImage}
          rightLabel={scene.rightLabel}
          animation={scene.animation}
          highlights={scene.highlights}
          objectFit={scene.objectFit}
          showLabels={scene.showLabels}
          imageHeight={scene.imageHeight}
        />
      );
    case 'label-title-body':
      return (
        <LabelTitleBody
          label={scene.label}
          title={scene.title}
          body={scene.body}
          bodyTimings={scene.bodyTimings}
          image={scene.image}
          imageZoom={scene.imageZoom}
          imageZoomKeyframes={scene.imageZoomKeyframes}
          imageZoomNoEntry={scene.imageZoomNoEntry}
          hideLogo={scene.hideLogo}
          imageFullScreen={scene.imageFullScreen}
          bodyRight={scene.bodyRight}
          bodyCards={scene.bodyCards}
          bodyCardIcons={scene.bodyCardIcons}
          bodyXList={scene.bodyXList}
          imageLeft={scene.imageLeft}
          images={scene.images}
          imageTimings={scene.imageTimings}
          imageHeight={scene.imageHeight}
          animation={scene.animation}
          highlights={scene.highlights}
        />
      );
    case 'centered-chart':
      return <CenteredChart image={scene.image} source={scene.source} />;
    case 'big-statement':
      return (
        <BigStatement
          text={scene.text}
          highlight={scene.highlight}
          label={scene.label}
          size={scene.size}
          fontSize={scene.fontSize}
          animation={scene.animation}
          lineTimings={scene.lineTimings}
          wordJumps={scene.wordJumps}
          image={scene.image}
          imageDelay={scene.imageDelay}
          inverted={scene.inverted}
          leftAlign={scene.leftAlign}
          splitLabelRight={scene.splitLabelRight}
          labelSub={scene.labelSub}
          textDelay={scene.textDelay}
        />
      );
    case 'stat-hero':
      return (
        <StatHero
          stat={scene.stat}
          label={scene.label}
          unit={scene.unit}
          context={scene.context}
          contextTiming={scene.contextTiming}
          image={scene.image}
        />
      );
    case 'split-contrast':
      return (
        <SplitContrast
          leftLabel={scene.leftLabel}
          leftTitle={scene.leftTitle}
          leftBody={scene.leftBody}
          leftBodies={scene.leftBodies}
          leftBodyTimings={scene.leftBodyTimings}
          rightLabel={scene.rightLabel}
          rightTitle={scene.rightTitle}
          rightBody={scene.rightBody}
          rightBodies={scene.rightBodies}
          rightBodyTimings={scene.rightBodyTimings}
          dividerLabel={scene.dividerLabel}
          showDivider={scene.showDivider}
          labelsOnly={scene.labelsOnly}
          leftTitleSize={scene.leftTitleSize}
          leftBodyDelay={scene.leftBodyDelay}
          rightBodyDelay={scene.rightBodyDelay}
          highlights={scene.highlights}
          equal={scene.equal}
          leftBodyHighlightIndices={scene.leftBodyHighlightIndices}
          asCards={(scene as any).asCards}
        />
      );
    case 'methods-slide':
      return <MethodsSlide highlights={scene.highlights} />;
    case 'chat-thread':
      return (
        <ChatThread
          label={scene.label}
          messages={scene.messages}
          highlights={scene.highlights}
        />
      );
    case 'checklist-slide':
      return (
        <ChecklistSlide
          label={scene.label}
          title={scene.title}
          titleHighlight={scene.titleHighlight}
          items={scene.items}
          itemTimings={scene.itemTimings}
          accentIndex={scene.accentIndex}
          statement={scene.statement}
          statementWordJumps={scene.statementWordJumps}
        />
      );
    case 'process-steps':
      return (
        <ProcessSteps
          label={scene.label}
          title={scene.title}
          steps={scene.steps}
          stepTimings={scene.stepTimings}
          rightLabel={scene.rightLabel}
          rightSteps={scene.rightSteps}
          rightStepTimings={scene.rightStepTimings}
          highlights={scene.highlights}
          animation={scene.animation}
        />
      );
    case 'prompt-example':
      return (
        <PromptExample
          label={scene.label}
          title={scene.title}
          beforeLabel={scene.beforeLabel}
          before={scene.before}
          afterLabel={scene.afterLabel}
          after={scene.after}
          afterTiming={scene.afterTiming}
        />
      );
    case 'three-mode-columns':
      return (
        <ThreeModeColumns
          label={scene.label}
          title={scene.title}
          columns={scene.columns}
          highlights={scene.highlights}
        />
      );
    case 'model-picker-locations':
      return (
        <ModelPickerLocations
          title={scene.title}
          leftImage={scene.leftImage}
          leftLabel={scene.leftLabel}
          rightImage={scene.rightImage}
          rightLabel={scene.rightLabel}
          leftInnerZoomFrame={scene.leftInnerZoomFrame}
          rightAppearFrame={scene.rightAppearFrame}
          leftFocusFrame={scene.leftFocusFrame}
        />
      );
    case 'define-range-diagram':
      return <DefineRangeDiagram modelAppearFrame={scene.modelAppearFrame} />;
    case 'title-slide-transition':
      return <TitleSlideTransition text={scene.text} label={scene.label} body={scene.body} bodyTimings={scene.bodyTimings} bodyRows={scene.bodyRows} bodyRowTimings={scene.bodyRowTimings} />;
    case 'cot-comparison':
      return (
        <CoTComparison
          question={scene.question}
          wrongAnswer={scene.wrongAnswer}
          reasoningSteps={scene.reasoningSteps}
          rightAnswer={scene.rightAnswer}
        />
      );
    case 'reasoning-chain':
      return (
        <ReasoningChain
          prompt={scene.prompt}
          steps={scene.steps}
          answer={scene.answer}
          label={scene.label}
        />
      );
    case 'thinking-trace-ui':
      return (
        <ThinkingTraceUI
          userPrompt={scene.userPrompt}
          traces={scene.traces}
          finalAnswer={scene.finalAnswer}
          callouts={scene.callouts}
          thinkingAppearFrame={scene.thinkingAppearFrame}
        />
      );
    case 'problem-blackbox':
      return (
        <ProblemBlackBox
          label={scene.label}
          text={scene.text}
          highlight={scene.highlight}
          lineTimings={scene.lineTimings}
        />
      );
    case 'prompt-box-split':
      return (
        <PromptBoxSplit
          label={scene.label}
          title={scene.title}
          leftLabel={scene.leftLabel}
          leftPrompts={scene.leftPrompts}
          leftPromptTimings={scene.leftPromptTimings}
          rightLabel={scene.rightLabel}
          rightPrompts={scene.rightPrompts}
          rightPromptTimings={scene.rightPromptTimings}
          titleTiming={scene.titleTiming}
        />
      );
    case 'large-label-body-split':
      return (
        <LargeLabelBodySplit
          bigLabel={(scene as any).bigLabel}
          subtitle={(scene as any).subtitle}
          body={(scene as any).body}
          bodyTimings={(scene as any).bodyTimings}
        />
      );
    case 'takeaway-stack':
      return (
        <TakeawayStack
          label={scene.label}
          title={scene.title}
          takeaways={scene.takeaways}
          timings={scene.timings}
        />
      );
  }
};
