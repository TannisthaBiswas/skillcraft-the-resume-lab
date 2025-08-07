// src/app/api/calculate-ats-score/route.ts

import { ResumeValues } from "@/lib/validation";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Get the API key from your environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    responseMimeType: "application/json", // Instruct the model to output JSON
  },
});

export async function POST(req: Request) {
  try {
    const { resumeData, jobDescription } = (await req.json()) as {
      resumeData: ResumeValues;
      jobDescription: string;
    };

    // A detailed prompt for better results
    const prompt = `
      You are an expert ATS (Applicant Tracking System) simulation tool. Your task is to analyze a resume against a job description and provide a score and actionable feedback.

      Job Description:
      ---
      ${jobDescription}
      ---

      Resume Data (in JSON format):
      ---
      ${JSON.stringify(resumeData)}
      ---

      Analyze the resume based on the job description, focusing on keywords, skills, experience relevance, and overall fit.

      Provide your response in a valid JSON format with the following structure:
      {
        "score": <a number between 0 and 100 representing the match percentage>,
        "matchAnalysis": "<a brief, one-paragraph summary of how well the resume matches the job>",
        "suggestions": [
          "<actionable suggestion 1 to improve the resume for this specific job>",
          "<actionable suggestion 2>",
          "<actionable suggestion 3>"
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const parsedResponse = JSON.parse(responseText);

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error("Error calculating ATS score:", error);
    return NextResponse.json(
      { error: "Failed to calculate ATS score" },
      { status: 500 }
    );
  }
}