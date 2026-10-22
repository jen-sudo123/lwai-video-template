import React from 'react';
import { Composition } from 'remotion';
import { Video, calculateTotalFrames } from './Video';
import { layout } from './tokens';
import { sampleVideo } from './data/sample-scenes';
import { lwaiVideoV2 } from './data/lwai-video-v2';
import { welcomeToAiLeaderAdvanced } from './data/welcome-to-ai-leader-advanced';
import { advancedPromptingIntro } from './data/advanced-prompting-intro';
import { iterativePrompting } from './data/iterative-prompting';
import { askingForOptions } from './data/asking-for-options';
import { chainOfThought } from './data/chain-of-thought';
import { fewShotPrompting } from './data/few-shot-prompting';
import { templateGallery } from './data/template-gallery';
import { copilot } from './data/copilot';
import { gptThinkingPro } from './data/gpt-thinking-pro';
import { whyPromptingMatters } from './data/why-prompting-matters';
import { geminiInDocs } from './data/gemini-in-docs';
import { chatGPTInExcel } from './data/chatgpt-in-excel';
import { chatGPTInSheet } from './data/chatgpt-in-sheet';
import { geminiInSheet } from './data/gemini-in-sheet';
import { chatGPTImage } from './data/chatgpt-image';
import { geminiInSlides } from './data/gemini-in-slides';
import { gemini } from './data/gemini';
import { aiVideoIntro } from './data/ai-video-intro';
import { geminiModels } from './data/gemini-models';
import { claudeModels } from './data/claude-models';
import { claudeModelsV2 } from './data/claude-models-v2';
import { claude } from './data/claude';
import { chatGPTVoice } from './data/chatgpt-voice';
import { chatGPTForWriting } from './data/chatgpt-for-writing';
import { geminiLive } from './data/gemini-live';
import { geminiScreenSharing } from './data/gemini-screen-sharing';
import { copilotVoice } from './data/copilot-voice';
import { copilotNotebook } from './data/copilot-notebook';
import { copilotNotebookLarry } from './data/copilot-notebook-larry';
import { copilotScheduledPrompt } from './data/copilot-scheduled-prompt';
import { copilotMeetings } from './data/copilot-meetings';
import { copilotAgentToStudio } from './data/copilot-agent-to-studio';
import { copilotStudioAutonomy } from './data/copilot-studio-autonomy';
import { chatGPTInPowerPoint } from './data/chatgpt-in-powerpoint';
import { coworkScheduledTasks } from './data/cowork-scheduled-tasks';
import { promptingFrontierModels } from './data/prompting-frontier-models';
import { chatgptLiveVideo } from './data/chatgpt-live-video';
import { copilotAgents } from './data/copilot-agents';
import { copilotAgentsLarry } from './data/copilot-agents-larry';
import { customGPTs } from './data/custom-gpts';
import { chatGPTProjects } from './data/chatgpt-projects';
import { promptingGptOpusFable } from './data/prompting-gpt-opus-fable';
import { gptAdvancedModels } from './data/gpt-advanced-models';
import { chatGPTTasks } from './data/chatgpt-tasks';
import { claudeDesign } from './data/claude-design';
import { copilotInWord } from './data/copilot-in-word';
import { copilotInPowerPoint } from './data/copilot-in-powerpoint';
import { copilotInPowerPointV2 } from './data/copilot-in-powerpoint-v2';
import { notebookLMDataAnalysis } from './data/notebooklm-data-analysis';
import { copilotInExcel } from './data/copilot-in-excel';
import { geminiVideoGeneration } from './data/gemini-video-generation';
import { judgingAi } from './data/judging-ai';
import { failureModes } from './data/failure-modes';
import { draftCheck } from './data/draft-check';
import { personalizationPart1 } from './data/personalization-part1';
import { personalizationPart2 } from './data/personalization-part2';
import { geminiPersonalIntelligence } from './data/gemini-personal-intelligence';
import { chatGPTCustomInstructions } from './data/chatgpt-custom-instructions';
import { claudeInstructions } from './data/claude-instructions';
import { copilotInstructions } from './data/copilot-instructions';
import { aiMemory } from './data/ai-memory';
import { aiSkills } from './data/ai-skills';
import { skills } from './data/skills';
import { AiFluency, AI_FLUENCY_DURATION_S, AI_FLUENCY_TITLE_FRAMES } from './compositions/AiFluency';
import { AiAgentic, AI_AGENTIC_DURATION_S, AI_AGENTIC_TITLE_FRAMES } from './compositions/AiAgentic';
import { ChoosingWork, CHOOSING_WORK_DURATION_S, CHOOSING_WORK_TITLE_FRAMES } from './compositions/ChoosingWork';
import { AutonomyDial, AUTONOMY_DIAL_DURATION_S, AUTONOMY_DIAL_TITLE_FRAMES } from './compositions/AutonomyDial';
import { SmallestAgent, SMALLEST_AGENT_DURATION_S, SMALLEST_AGENT_VO_FROM } from './compositions/SmallestAgent';
import { AdvancedModelsChatGPT, ADVANCED_MODELS_DURATION_S, ADVANCED_MODELS_TITLE_FRAMES } from './compositions/AdvancedModelsChatGPT';
import { workContext } from './data/work-context';
import { workspaceStudioSkills } from './data/workspace-studio-skills';
import { whatIsGenerativeAi } from './data/what-is-generative-ai';
import { aiLandscape } from './data/ai-landscape';
import { chatGPTDeepResearch } from './data/chatgpt-deep-research';
import { chatGPTWebSearch } from './data/chatgpt-websearch';
import { aiRisks } from './data/ai-risks';
import { copilotWorkIq } from './data/copilot-work-iq';
import { copilotSkills } from './data/copilot-skills';
import { copilotResearcher } from './data/copilot-researcher';
import { chatGPTPlugins } from './data/chatgpt-plugins';
import { agentInstructions } from './data/agent-instructions';
import { videoDataSchema } from './scenes/schemas';

// Register one composition per video you want to render.
// To create a new video, copy this block and pass in different scene data.
export const RemotionRoot: React.FC = () => {
  return (
    <>
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
        id="LwaiVideoV2"
        component={Video}
        durationInFrames={calculateTotalFrames(lwaiVideoV2.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={lwaiVideoV2}
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
      <Composition
        id="WhyPromptingMatters"
        component={Video}
        durationInFrames={calculateTotalFrames(whyPromptingMatters.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={whyPromptingMatters}
      />
      <Composition
        id="GeminiInDocs"
        component={Video}
        durationInFrames={calculateTotalFrames(geminiInDocs.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={geminiInDocs}
      />
      <Composition
        id="ChatGPTInExcel"
        component={Video}
        durationInFrames={calculateTotalFrames(chatGPTInExcel.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={chatGPTInExcel}
      />
      <Composition
        id="CoworkScheduledTasks"
        component={Video}
        durationInFrames={calculateTotalFrames(coworkScheduledTasks.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={coworkScheduledTasks}
      />
      <Composition
        id="ChatGPTInSheet"
        component={Video}
        durationInFrames={calculateTotalFrames(chatGPTInSheet.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={chatGPTInSheet}
      />
      <Composition
        id="GeminiInSheet"
        component={Video}
        durationInFrames={calculateTotalFrames(geminiInSheet.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={geminiInSheet}
      />
      <Composition
        id="ChatGPTImage"
        component={Video}
        durationInFrames={calculateTotalFrames(chatGPTImage.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={chatGPTImage}
      />
      <Composition
        id="GeminiInSlides"
        component={Video}
        durationInFrames={calculateTotalFrames(geminiInSlides.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={geminiInSlides}
      />
      <Composition
        id="Gemini"
        component={Video}
        durationInFrames={calculateTotalFrames(gemini.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={gemini}
      />
      <Composition
        id="AiVideoIntro"
        component={Video}
        durationInFrames={calculateTotalFrames(aiVideoIntro.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={aiVideoIntro}
      />
      <Composition
        id="GeminiModels"
        component={Video}
        durationInFrames={calculateTotalFrames(geminiModels.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={geminiModels}
      />
      <Composition
        id="GeminiLive"
        component={Video}
        durationInFrames={calculateTotalFrames(geminiLive.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={geminiLive}
      />
      <Composition
        id="GeminiScreenSharing"
        component={Video}
        durationInFrames={calculateTotalFrames(geminiScreenSharing.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={geminiScreenSharing}
      />
      <Composition
        id="ClaudeModels"
        component={Video}
        durationInFrames={calculateTotalFrames(claudeModels.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={claudeModels}
      />
      <Composition
        id="ClaudeModelsV2"
        component={Video}
        durationInFrames={calculateTotalFrames(claudeModelsV2.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={claudeModelsV2}
      />
      <Composition
        id="Claude"
        component={Video}
        durationInFrames={calculateTotalFrames(claude.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={claude}
      />
      <Composition
        id="CopilotVoice"
        component={Video}
        durationInFrames={calculateTotalFrames(copilotVoice.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={copilotVoice}
      />
      <Composition
        id="ChatGPTVoice"
        component={Video}
        durationInFrames={calculateTotalFrames(chatGPTVoice.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={chatGPTVoice}
      />
      <Composition
        id="ChatGPTForWriting"
        component={Video}
        durationInFrames={calculateTotalFrames(chatGPTForWriting.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={chatGPTForWriting}
      />
      <Composition
        id="CopilotNotebook"
        component={Video}
        durationInFrames={calculateTotalFrames(copilotNotebook.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={copilotNotebook}
      />
      <Composition
        id="CopilotNotebookLarry"
        component={Video}
        durationInFrames={calculateTotalFrames(copilotNotebookLarry.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={copilotNotebookLarry}
      />
      <Composition
        id="CopilotScheduledPrompt"
        component={Video}
        durationInFrames={calculateTotalFrames(copilotScheduledPrompt.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={copilotScheduledPrompt}
      />
      <Composition
        id="CopilotMeetings"
        component={Video}
        durationInFrames={calculateTotalFrames(copilotMeetings.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={copilotMeetings}
      />
      <Composition
        id="CopilotAgentToStudio"
        component={Video}
        durationInFrames={calculateTotalFrames(copilotAgentToStudio.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={copilotAgentToStudio}
      />
      <Composition
        id="CopilotStudioAutonomy"
        component={Video}
        durationInFrames={calculateTotalFrames(copilotStudioAutonomy.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={copilotStudioAutonomy}
      />
      <Composition
        id="ChatGPTInPowerPoint"
        component={Video}
        durationInFrames={calculateTotalFrames(chatGPTInPowerPoint.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={chatGPTInPowerPoint}
      />
      <Composition
        id="PromptingFrontierModels"
        component={Video}
        durationInFrames={calculateTotalFrames(promptingFrontierModels.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={promptingFrontierModels}
      />
      <Composition
        id="PromptingGptOpusFable"
        component={Video}
        durationInFrames={calculateTotalFrames(promptingGptOpusFable.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={promptingGptOpusFable}
      />
      <Composition
        id="Skills"
        component={Video}
        durationInFrames={calculateTotalFrames(skills.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={skills}
      />
      <Composition
        id="ChatGPTLiveVideo"
        component={Video}
        durationInFrames={calculateTotalFrames(chatgptLiveVideo.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={chatgptLiveVideo}
      />
      <Composition
        id="CopilotAgentsLarry"
        component={Video}
        durationInFrames={calculateTotalFrames(copilotAgentsLarry.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={copilotAgentsLarry}
      />
      <Composition
        id="CopilotAgents"
        component={Video}
        durationInFrames={calculateTotalFrames(copilotAgents.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={copilotAgents}
      />
      <Composition
        id="CustomGPTs"
        component={Video}
        durationInFrames={calculateTotalFrames(customGPTs.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={customGPTs}
      />
      <Composition
        id="ChatGPTProjects"
        component={Video}
        durationInFrames={calculateTotalFrames(chatGPTProjects.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={chatGPTProjects}
      />
      <Composition
        id="GPTAdvancedModels"
        component={Video}
        durationInFrames={calculateTotalFrames(gptAdvancedModels.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={gptAdvancedModels}
      />
      <Composition
        id="ChatGPTTasks"
        component={Video}
        durationInFrames={calculateTotalFrames(chatGPTTasks.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={chatGPTTasks}
      />
      <Composition
        id="ClaudeDesign"
        component={Video}
        durationInFrames={calculateTotalFrames(claudeDesign.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={claudeDesign}
      />
      <Composition
        id="CopilotInWord"
        component={Video}
        durationInFrames={calculateTotalFrames(copilotInWord.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={copilotInWord}
      />
      <Composition
        id="CopilotInPowerPointV2"
        component={Video}
        durationInFrames={calculateTotalFrames(copilotInPowerPointV2.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={copilotInPowerPointV2}
      />
      <Composition
        id="CopilotInPowerPoint"
        component={Video}
        durationInFrames={calculateTotalFrames(copilotInPowerPoint.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={copilotInPowerPoint}
      />
      <Composition
        id="NotebookLMDataAnalysis"
        component={Video}
        durationInFrames={calculateTotalFrames(notebookLMDataAnalysis.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={notebookLMDataAnalysis}
      />
      <Composition
        id="CopilotInExcel"
        component={Video}
        durationInFrames={calculateTotalFrames(copilotInExcel.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={copilotInExcel}
      />
      <Composition
        id="GeminiVideoGeneration"
        component={Video}
        durationInFrames={calculateTotalFrames(geminiVideoGeneration.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={geminiVideoGeneration}
      />
      <Composition
        id="JudgingAi"
        component={Video}
        durationInFrames={calculateTotalFrames(judgingAi.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={judgingAi}
      />
      <Composition
        id="FailureModes"
        component={Video}
        durationInFrames={calculateTotalFrames(failureModes.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={failureModes}
      />
      <Composition
        id="DraftCheck"
        component={Video}
        durationInFrames={calculateTotalFrames(draftCheck.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={draftCheck}
      />
      <Composition
        id="PersonalizationPart1"
        component={Video}
        durationInFrames={calculateTotalFrames(personalizationPart1.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={personalizationPart1}
      />
      <Composition
        id="PersonalizationPart2"
        component={Video}
        durationInFrames={calculateTotalFrames(personalizationPart2.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={personalizationPart2}
      />
      <Composition
        id="GeminiPersonalIntelligence"
        component={Video}
        durationInFrames={calculateTotalFrames(geminiPersonalIntelligence.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={geminiPersonalIntelligence}
      />
      <Composition
        id="ChatGPTCustomInstructions"
        component={Video}
        durationInFrames={calculateTotalFrames(chatGPTCustomInstructions.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={chatGPTCustomInstructions}
      />
      <Composition
        id="ClaudeInstructions"
        component={Video}
        durationInFrames={calculateTotalFrames(claudeInstructions.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={claudeInstructions}
      />
      <Composition
        id="CopilotInstructions"
        component={Video}
        durationInFrames={calculateTotalFrames(copilotInstructions.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={copilotInstructions}
      />
      <Composition
        id="AiFluency"
        component={AiFluency}
        durationInFrames={AI_FLUENCY_TITLE_FRAMES + Math.ceil(AI_FLUENCY_DURATION_S * layout.fps)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
      />
      <Composition
        id="AiAgentic"
        component={AiAgentic}
        durationInFrames={AI_AGENTIC_TITLE_FRAMES + Math.ceil(AI_AGENTIC_DURATION_S * layout.fps)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
      />
      <Composition
        id="ChoosingWork"
        component={ChoosingWork}
        durationInFrames={CHOOSING_WORK_TITLE_FRAMES + Math.ceil(CHOOSING_WORK_DURATION_S * layout.fps)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
      />
      <Composition
        id="AutonomyDial"
        component={AutonomyDial}
        durationInFrames={AUTONOMY_DIAL_TITLE_FRAMES + Math.ceil(AUTONOMY_DIAL_DURATION_S * layout.fps)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
      />
      <Composition
        id="SmallestAgent"
        component={SmallestAgent}
        durationInFrames={SMALLEST_AGENT_VO_FROM + Math.ceil(SMALLEST_AGENT_DURATION_S * layout.fps)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
      />
      <Composition
        id="AdvancedModelsChatGPT"
        component={AdvancedModelsChatGPT}
        durationInFrames={ADVANCED_MODELS_TITLE_FRAMES + Math.ceil(ADVANCED_MODELS_DURATION_S * layout.fps)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
      />
      <Composition
        id="AiMemory"
        component={Video}
        durationInFrames={calculateTotalFrames(aiMemory.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={aiMemory}
      />
      <Composition
        id="AiSkills"
        component={Video}
        durationInFrames={calculateTotalFrames(aiSkills.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={aiSkills}
      />
      <Composition
        id="WorkContext"
        component={Video}
        durationInFrames={calculateTotalFrames(workContext.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={workContext}
      />
      <Composition
        id="WorkspaceStudioSkills"
        component={Video}
        durationInFrames={calculateTotalFrames(workspaceStudioSkills.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={workspaceStudioSkills}
      />
      <Composition
        id="WhatIsGenerativeAi"
        component={Video}
        durationInFrames={calculateTotalFrames(whatIsGenerativeAi.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={whatIsGenerativeAi}
      />
      <Composition
        id="AiLandscape"
        component={Video}
        durationInFrames={calculateTotalFrames(aiLandscape.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={aiLandscape}
      />
      <Composition
        id="ChatGPTDeepResearch"
        component={Video}
        durationInFrames={calculateTotalFrames(chatGPTDeepResearch.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={chatGPTDeepResearch}
      />
      <Composition
        id="ChatGPTWebSearch"
        component={Video}
        durationInFrames={calculateTotalFrames(chatGPTWebSearch.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={chatGPTWebSearch}
      />
      <Composition
        id="AiRisks"
        component={Video}
        durationInFrames={calculateTotalFrames(aiRisks.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={aiRisks}
      />
      <Composition
        id="CopilotSkills"
        component={Video}
        durationInFrames={calculateTotalFrames(copilotSkills.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={copilotSkills}
      />
      <Composition
        id="CopilotResearcher"
        component={Video}
        durationInFrames={calculateTotalFrames(copilotResearcher.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={copilotResearcher}
      />
      <Composition
        id="CopilotWorkIQ"
        component={Video}
        durationInFrames={calculateTotalFrames(copilotWorkIq.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={copilotWorkIq}
      />
      <Composition
        id="ChatGPTPlugins"
        component={Video}
        durationInFrames={calculateTotalFrames(chatGPTPlugins.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={chatGPTPlugins}
      />
      <Composition
        id="AgentInstructions"
        component={Video}
        durationInFrames={calculateTotalFrames(agentInstructions.scenes)}
        fps={layout.fps}
        width={layout.width}
        height={layout.height}
        schema={videoDataSchema}
        defaultProps={agentInstructions}
      />
    </>
  );
};
