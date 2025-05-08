"use server";

import {
  GoogleGenAI,
} from '@google/genai';
import {
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { env } from '@/env';

export async function generateSummary(input: GenerateSummaryInput) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const userMessage = `
Please generate only one professional resume summary in paragraph format from this data:

Job title: ${jobTitle || "N/A"}

Work experience:
${workExperiences
  ?.map(
    (exp) => `
  Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}

  Description:
  ${exp.description || "N/A"}
  `,
  )
  .join("\n\n")}

Education:
${educations
  ?.map(
    (edu) => `
  Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}
  `,
  )
  .join("\n\n")}

Skills:
${skills}
`;

  const ai = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,
    //process.env.GEMINI_API_KEY,
  });

  const config = {
    thinkingConfig: {
      thinkingBudget: 1,
    },
    responseMimeType: 'text/plain',
  };

  const model = 'gemini-2.5-pro-exp-03-25';
  //'gemini-1.5-pro-exp-0827';
  //'gemini-2.5-pro-exp-03-25';
  //'gemini-2.5-pro-preview-03-25';
  // 'gemini-1.5-pro-latest';

  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: userMessage,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let finalOutput = '';
  for await (const chunk of response) {
    finalOutput += chunk.text;
  }

  if (!finalOutput) {
    throw new Error("Failed to generate AI response");
  }

  return finalOutput;
}
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function generateWorkExperience(input: GenerateWorkExperienceInput) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Uncomment if using subscription validation
  // const subscriptionLevel = await getUserSubscriptionLevel(userId);
  // if (!canUseAITools(subscriptionLevel)) {
  //   throw new Error("Upgrade your subscription to use this feature");
  // }

  const { description } = generateWorkExperienceSchema.parse(input);

  const systemMessage = `
You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
Your response must adhere to the following structure. You can omit fields if they can't be inferred from the provided data, but don't add any new ones.

Job title: <job title>
Company: <company name>
Start date: <format: YYYY-MM-DD> (only if provided)
End date: <format: YYYY-MM-DD> (only if provided)
Description: <an optimized description in bullet format, might be inferred from the job title>
`;

  const userMessage = `
Please provide a work experience entry from this description:
${description}
`;

  const contents = [
    {
      role: "user",
      parts: [{ text: `${systemMessage}\n${userMessage}` }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model: 'gemini-2.5-pro-exp-03-25',
    //"gemini-1.5-pro-latest",
    contents,
    config: { responseMimeType: "text/plain" },
  });

  let finalOutput = "";
  for await (const chunk of response) {
    finalOutput += chunk.text;
  }

  if (!finalOutput) {
    throw new Error("Failed to generate AI response");
  }

  console.log("Gemini response:", finalOutput);

  return {
    position: finalOutput.match(/Job title: (.*)/)?.[1]?.trim() || "",
    company: finalOutput.match(/Company: (.*)/)?.[1]?.trim() || "",
    description: (finalOutput.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
    startDate: finalOutput.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: finalOutput.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
  } satisfies WorkExperience;
}