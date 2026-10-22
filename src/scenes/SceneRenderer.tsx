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
import { AutomationBiasDiagram } from './AutomationBiasDiagram';
import { CockpitCrossCheckDiagram } from './CockpitCrossCheckDiagram';
import { DoubtConfidenceDiagram } from './DoubtConfidenceDiagram';
import { ReasonEvidenceDiagram } from './ReasonEvidenceDiagram';
import { AlternativesConversationDiagram } from './AlternativesConversationDiagram';
import { FactsVerificationDiagram } from './FactsVerificationDiagram';
import { StakesVerificationDiagram } from './StakesVerificationDiagram';
import { CoTComparison } from './CoTComparison';
import { ReasoningChain } from './ReasoningChain';
import { ThinkingTraceUI } from './ThinkingTraceUI';
import { ProblemBlackBox } from './ProblemBlackBox';
import { PromptBoxSplit } from './PromptBoxSplit';
import { ThreeModeColumns } from './ThreeModeColumns';
import { ModelPickerLocations } from './ModelPickerLocations';
import { LargeLabelBodySplit } from './LargeLabelBodySplit';
import { VideoClip } from './VideoClip';
import { ImageMarquee } from './ImageMarquee';
import { AcronymSpotlight } from './AcronymSpotlight';
import { LineChart } from './LineChart';
import { JaggedFrontierDiagram } from './diagrams/JaggedFrontierDiagram';
import { MeetingChecklistDiagram } from './diagrams/MeetingChecklistDiagram';
import { AccessWorkflowDiagram } from './diagrams/AccessWorkflowDiagram';
import { BoundedAutonomyDiagram } from './diagrams/BoundedAutonomyDiagram';
import { BiasFunnelDiagram } from './diagrams/BiasFunnelDiagram';
import { BuildPlanCodoDiagram } from './diagrams/BuildPlanCodoDiagram';

// Routes a scene to its component. Add new layouts here as you create them.
export const SceneRenderer: React.FC<{ scene: Scene; hasClipLayer?: boolean }> = ({ scene, hasClipLayer }) => {
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
          imageZoom={scene.imageZoom}
        />
      );
    case 'centered-quote':
      return (
        <CenteredQuote
          text={scene.text}
          attribution={scene.attribution}
          animation={scene.animation}
          highlight={scene.highlight}
          highlightFrame={scene.highlightFrame}
          lineTimings={scene.lineTimings}
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
          titleHighlight={scene.titleHighlight}
          body={scene.body}
          bodyTimings={scene.bodyTimings}
          image={scene.image}
          diagram={scene.diagram}
          diagramTimings={scene.diagramTimings}
          imageZoom={scene.imageZoom}
          imageZoomKeyframes={scene.imageZoomKeyframes}
          imageZoomNoEntry={scene.imageZoomNoEntry}
          imageSwaps={scene.imageSwaps}
          hideLogo={scene.hideLogo}
          imageFullScreen={scene.imageFullScreen}
          pricingGrid={scene.pricingGrid}
          bodyRight={scene.bodyRight}
          bodyCards={scene.bodyCards}
          bodyCardIcons={scene.bodyCardIcons}
          bodyCardCompact={scene.bodyCardCompact}
          bodyCardBouncy={scene.bodyCardBouncy}
          bodyCardAccents={scene.bodyCardAccents}
          bodyXList={scene.bodyXList}
          titleNote={scene.titleNote}
          titleNoteDelay={scene.titleNoteDelay}
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
          images={scene.images}
          imageTimings={scene.imageTimings}
          imageZoom={scene.imageZoom}
          split={scene.split}
          hideStat={scene.hideStat}
          imageLeft={scene.imageLeft}
          imagesLayout={scene.imagesLayout}
          imageAspect={scene.imageAspect}
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
          rightTitleBreak={scene.rightTitleBreak}
          rightTitleBreakFrame={scene.rightTitleBreakFrame}
          rightLightUpFrame={scene.rightLightUpFrame}
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
          activeTimings={scene.activeTimings}
          rightLabel={scene.rightLabel}
          rightSteps={scene.rightSteps}
          rightStepTimings={scene.rightStepTimings}
          rightActiveTimings={scene.rightActiveTimings}
          highlights={scene.highlights}
          animation={scene.animation}
          horizontal={scene.horizontal}
          cardStyle={scene.cardStyle}
          titleSize={scene.titleSize}
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
          beforeOutcome={scene.beforeOutcome}
          afterOutcome={scene.afterOutcome}
          beforeTiming={scene.beforeTiming}
          beforeOutcomeTiming={scene.beforeOutcomeTiming}
          afterOutcomeTiming={scene.afterOutcomeTiming}
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
    case 'automation-bias-diagram':
      return (
        <AutomationBiasDiagram
          judgmentAppearFrame={scene.judgmentAppearFrame}
          zoomStartFrame={scene.zoomStartFrame}
          zoomScale={scene.zoomScale}
        />
      );
    case 'cockpit-cross-check-diagram':
      return (
        <CockpitCrossCheckDiagram
          pilotsAppearFrame={scene.pilotsAppearFrame}
          flyingLabelFrame={scene.flyingLabelFrame}
          monitoringLabelFrame={scene.monitoringLabelFrame}
          challengeAppearFrame={scene.challengeAppearFrame}
          responseAppearFrame={scene.responseAppearFrame}
          crossCheckAppearFrame={scene.crossCheckAppearFrame}
          zoomStartFrame={scene.zoomStartFrame}
          zoomScale={scene.zoomScale}
        />
      );
    case 'doubt-confidence-diagram':
      return (
        <DoubtConfidenceDiagram
          label={scene.label}
          title={scene.title}
          titleHighlight={scene.titleHighlight}
          cardAppearFrame={scene.cardAppearFrame}
          confidentAppearFrame={scene.confidentAppearFrame}
          notEqualAppearFrame={scene.notEqualAppearFrame}
        />
      );
    case 'reason-evidence-diagram':
      return (
        <ReasonEvidenceDiagram
          label={scene.label}
          title={scene.title}
          titleHighlight={scene.titleHighlight}
          outputAppearFrame={scene.outputAppearFrame}
          assumptionsAppearFrame={scene.assumptionsAppearFrame}
          evidenceAppearFrame={scene.evidenceAppearFrame}
          conclusionAppearFrame={scene.conclusionAppearFrame}
          humanAppearFrame={scene.humanAppearFrame}
          weakConnectionAppearFrame={scene.weakConnectionAppearFrame}
          zoomStartFrame={scene.zoomStartFrame}
          zoomScale={scene.zoomScale}
        />
      );
    case 'alternatives-conversation-diagram':
      return (
        <AlternativesConversationDiagram
          label={scene.label}
          title={scene.title}
          titleHighlight={scene.titleHighlight}
          humanAppearFrame={scene.humanAppearFrame}
          aiAppearFrame={scene.aiAppearFrame}
          humanEmphasisFrame={scene.humanEmphasisFrame}
          aiEmphasisFrame={scene.aiEmphasisFrame}
          humanQuote={scene.humanQuote}
          humanQuoteFrame={scene.humanQuoteFrame}
          aiQuote={scene.aiQuote}
          aiQuoteFrame={scene.aiQuoteFrame}
        />
      );
    case 'facts-verification-diagram':
      return (
        <FactsVerificationDiagram
          label={scene.label}
          title={scene.title}
          titleHighlight={scene.titleHighlight}
          documentAppearFrame={scene.documentAppearFrame}
          moneyCheckFrame={scene.moneyCheckFrame}
          dateCheckFrame={scene.dateCheckFrame}
          percentCheckFrame={scene.percentCheckFrame}
          companyCheckFrame={scene.companyCheckFrame}
        />
      );
    case 'stakes-verification-diagram':
      return (
        <StakesVerificationDiagram
          leftAppearFrame={scene.leftAppearFrame}
          rightAppearFrame={scene.rightAppearFrame}
        />
      );
    case 'title-slide-transition':
      return <TitleSlideTransition text={scene.text} label={scene.label} body={scene.body} bodyTimings={scene.bodyTimings} bodyRows={scene.bodyRows} bodyRowTimings={scene.bodyRowTimings} bodyRowsAsCards={scene.bodyRowsAsCards} centered={scene.centered} />;
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
          flyingTexts={scene.flyingTexts}
          answerColor={scene.answerColor}
          answerLabel={scene.answerLabel}
          answerIcon={scene.answerIcon}
          answerWidth={scene.answerWidth}
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
    case 'video-clip':
      return (
        <VideoClip
          videoSrc={scene.videoSrc}
          videoStartTime={scene.videoStartTime}
          label={scene.label}
          title={scene.title}
          body={scene.body}
          bodyTimings={scene.bodyTimings}
          overlayPosition={scene.overlayPosition}
          overlayHideFrom={scene.overlayHideFrom}
          bodyOpenFrom={scene.bodyOpenFrom}
          bodyAnimation={scene.bodyAnimation}
          openBodyAnimation={scene.openBodyAnimation}
          openBodyVariant={scene.openBodyVariant}
          openBodyHideFrom={scene.openBodyHideFrom}
          titleCentered={scene.titleCentered}
          logoPosition={scene.logoPosition}
          panelLayout={scene.panelLayout}
          panelLeft={scene.panelLeft}
          clipTransform={scene.clipTransform}
          clipZoomKeyframes={(scene as any).clipZoomKeyframes}
          skipVideo={!!hasClipLayer}
          skipCardAnimation={scene.skipCardAnimation}
          cardDelay={scene.cardDelay}
          whiteoutBox={scene.whiteoutBox}
        />
      );
    case 'takeaway-stack':
      return (
        <TakeawayStack
          label={scene.label}
          title={scene.title}
          takeaways={scene.takeaways}
          timings={scene.timings}
          centered={scene.centered}
        />
      );
    case 'image-marquee':
      return (
        <ImageMarquee
          label={scene.label}
          title={scene.title}
          subtitle={scene.subtitle}
          images={scene.images}
        />
      );
    case 'acronym-spotlight':
      return (
        <AcronymSpotlight
          label={scene.label}
          items={scene.items}
          spotlight={scene.spotlight}
          durationInFrames={scene.durationInFrames}
        />
      );
    case 'line-chart':
      return <LineChart title={scene.title} data={scene.data} />;
    case 'jagged-frontier-diagram':
      return (
        <JaggedFrontierDiagram
          lineStartFrame={scene.lineStartFrame}
          lineDrawFrames={scene.lineDrawFrames}
          graduateCardFrame={scene.graduateCardFrame}
          gameCardFrame={scene.gameCardFrame}
        />
      );
    case 'meeting-checklist-diagram':
      return <MeetingChecklistDiagram itemTimings={scene.itemTimings} />;
    case 'access-workflow-diagram':
      return <AccessWorkflowDiagram arrowFrame={scene.arrowFrame} />;
    case 'bounded-autonomy-diagram':
      return (
        <BoundedAutonomyDiagram
          aiFrame={scene.aiFrame}
          humanFrame={scene.humanFrame}
          approvalFrame={scene.approvalFrame}
          judgmentFrame={scene.judgmentFrame}
          accountabilityFrame={scene.accountabilityFrame}
        />
      );
    case 'bias-funnel-diagram':
      return (
        <BiasFunnelDiagram
          cardTimings={scene.cardTimings}
          modelAppearFrame={scene.modelAppearFrame}
        />
      );
    case 'build-plan-codo-diagram':
      return (
        <BuildPlanCodoDiagram
          sectionFrames={scene.sectionFrames}
          codoFrames={scene.codoFrames}
          allFrame={scene.allFrame}
        />
      );
  }
};
