import { Prisma } from "@prisma/client";
import { ResumeValues } from "./validation";

export interface EditorFormProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

export const resumeDataInclude = {
  workExperiences: true,
  educations: true,
} satisfies Prisma.ResumeInclude;

// Explicitly override the 'skills' field to ensure it's treated as Prisma.JsonValue
export type ResumeServerData = Omit<Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude;
}>, 'skills'> & {
  skills: Prisma.JsonValue; // Explicitly declare skills as Prisma.JsonValue
};

export type SkillServer = {
  name: string;
  proficiency: number;
};