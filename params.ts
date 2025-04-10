import { z } from "zod";
import { findGuideParamsPrompt } from "./utils.js";


export const getGuideParams = z.object({
  guideLink: z.string().describe(findGuideParamsPrompt),
});

export const testAgentResponseParams = z.object({
  code: z.array(z.string()).describe("The code generated by the agent that needs to be tested"),
});

