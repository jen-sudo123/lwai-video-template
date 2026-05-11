import React from 'react';
import { Composition } from 'remotion';
import { Video, calculateTotalFrames } from './Video';
import { layout } from './tokens';
import { sampleVideo } from './data/sample-scenes';
import { welcomeToAiLeaderAdvanced } from './data/welcome-to-ai-leader-advanced';
import { advancedPromptingIntro } from './data/advanced-prompting-intro';
import { iterativePrompting } from './data/iterative-prompting';
import { askingForOptions } from './data/asking-for-options';
import { chainOfThought } from './data/chain-of-thought';
import { fewShotPrompting } from './data/few-shot-prompting';
import { templateGallery } from './data/template-gallery';
import { copilot } from './data/copilot';
import { gptThinkingPro } from './data/gpt-thinking-pro';
import { videoDataSchema } from './scenes/schemas';

// Register one composition per video you want to render.
// To create a new video, copy this block and pass in different scene data.
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LwaiVideo"
        component={Video}
        durationInFrames={calculateTotalFrames(sampleVideo.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={sampleVideo}
      />
      <Composition
        id="WelcomeToAiLeaderAdvanced"
        component={Video}
        durationInFrames={calculateTotalFrames(welcomeToAiLeaderAdvanced.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={welcomeToAiLeaderAdvanced}
      />
      <Composition
        id="AdvancedPromptingIntro"
        component={Video}
        durationInFrames={calculateTotalFrames(advancedPromptingIntro.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={advancedPromptingIntro}
      />
      <Composition
        id="IterativePrompting"
        component={Video}
        durationInFrames={calculateTotalFrames(iterativePrompting.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={iterativePrompting}
      />
      <Composition
        id="AskingForOptions"
        component={Video}
        durationInFrames={calculateTotalFrames(askingForOptions.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={askingForOptions}
      />
      <Composition
        id="ChainOfThought"
        component={Video}
        durationInFrames={calculateTotalFrames(chainOfThought.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={chainOfThought}
      />
      <Composition
        id="FewShotPrompting"
        component={Video}
        durationInFrames={calculateTotalFrames(fewShotPrompting.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={fewShotPrompting}
      />
      <Composition
        id="Copilot"
        component={Video}
        durationInFrames={calculateTotalFrames(copilot.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={copilot}
      />
      <Composition
        id="TemplateGallery"
        component={Video}
        durationInFrames={calculateTotalFrames(templateGallery.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={templateGallery}
      />
      <Composition
        id="GPTThinkingPro"
        component={Video}
        durationInFrames={calculateTotalFrames(gptThinkingPro.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={gptThinkingPro}
      />
    </>
  );
};
