// src/app/api/generate-cover-letter/route.ts

import { ResumeValues } from "@/lib/validation";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(req: Request) {
  try {
    const { resumeData, jobDescription } = (await req.json()) as {
      resumeData: ResumeValues;
      jobDescription: string;
    };

    // The theme color from the resume can be used to guide the tone
    const themeColor = resumeData.colorHex || 'professional';

    const prompt = `
      You are a professional career coach and expert copywriter. Your task is to write a compelling, professional, and personalized cover letter.

      Use the provided resume data and job description to craft the letter. The tone should be confident and align with the industry. The visual theme color chosen for the resume is ${themeColor}, which should subtly influence the letter's tone (e.g., a bright color suggests a more energetic tone, a dark blue suggests a more formal one).

      Job Description:
      ---
      ${jobDescription}
      ---

      Applicant's Resume Data (in JSON format):
      ---
      ${JSON.stringify(resumeData)}
      ---

      Instructions:
      1. Address the letter to the "Hiring Manager" if no specific name is available.
      2. Start with a strong opening that grabs attention and states the desired position.
      3. In the body, highlight 2-3 key experiences or skills from the resume that directly match the most important requirements in the job description. Use specific examples.
      4. Do not just list skills; explain how those skills can benefit the company.
      5. End with a strong closing, expressing enthusiasm for the role and including a call to action (e.g., "I am eager to discuss how my skills can contribute to your team's success").
      6. The output should be only the text of the cover letter, without any extra titles, headings, or explanations.
    `;
    
    const result = await model.generateContent(prompt);
    const coverLetterText = result.response.text();

    return NextResponse.json({ coverLetter: coverLetterText });
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return NextResponse.json(
      { error: "Failed to generate cover letter" },
      { status: 500 }
    );
  }
}