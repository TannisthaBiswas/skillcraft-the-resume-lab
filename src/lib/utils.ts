import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResumeServerData, SkillServer } from "./types";
import { ResumeValues, Skill } from "./validation"; // Ensure Skill is imported

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    : value;
}

export function mapToResumeValues(data: ResumeServerData): ResumeValues {
  let mappedSkills: Skill[] = [];

  // Diagnostic log: Keep this for initial testing, then you can remove it.
  console.log("mapToResumeValues - data.skills received:", data.skills, "Type:", typeof data.skills, "Is Array:", Array.isArray(data.skills));

  // Ensure data.skills is not null or undefined before processing
  if (data.skills !== null && data.skills !== undefined) {
    // If skills is already an array (expected for JSON column data)
    if (Array.isArray(data.skills)) {
      try {
        // Assert data.skills as an array where each item can be a SkillServer object or a plain string.
        // This handles both new structured data and potential legacy string-only data within the JSON column.
        mappedSkills = (data.skills as (SkillServer | string)[]).map((item): Skill => {
          let name: string = ''; // Initialize to empty string
          let proficiency: number = 3; // Initialize to default number (as per your Zod schema)

          if (typeof item === 'string') {
            // Case 1: Item is a plain string (legacy data)
            name = item.trim();
            proficiency = 3; // Default proficiency for legacy string skills
          } else if (typeof item === 'object' && item !== null) {
            // Case 2: Item is an object (expected structured data)
            // Ensure 'name' property exists and is a string
            name = typeof item.name === 'string' ? item.name.trim() : '';

            // Ensure 'proficiency' property exists, is a number, and within valid range
            const rawProficiency = (item as SkillServer).proficiency;
            if (typeof rawProficiency === 'number' && rawProficiency >= 0 && rawProficiency <= 5) {
              proficiency = rawProficiency;
            } else {
              proficiency = 3; // Fallback to default if not a valid number
            }
          } else {
            // Case 3: Unexpected item type within the array
            console.warn("Unexpected item type encountered in skills array, skipping:", item);
            // 'name' and 'proficiency' remain at their default initialized values
          }

          return { name, proficiency };
        }).filter(skill => skill.name !== ''); // Remove any skills that ended up with an empty name

      } catch (e) {
        // Log any errors during mapping and default to an empty array
        console.error("Error mapping skills from database JSON to Skill objects:", e);
        mappedSkills = [];
      }
    } else if (typeof data.skills === 'string') {
        // This highly defensive block handles a rare edge case:
        // where the JSON column itself might store a stringified JSON array
        // (e.g., the raw database value is '"[\"skill1\",\"skill2\"]"' instead of `["skill1", "skill2"]`).
        try {
            const parsedSkills = JSON.parse(data.skills) as unknown;
            if (Array.isArray(parsedSkills) && parsedSkills.every(s => typeof s === 'string')) {
                 mappedSkills = (parsedSkills as string[]).map(s => ({ name: s.trim(), proficiency: 3 }));
                 console.warn("Parsed stringified legacy skills data (string[]) with default proficiency.");
            } else {
                 console.warn("Skills data is a string but not a parseable string array:", data.skills);
                 mappedSkills = [];
            }
        } catch (e) {
            console.warn("Skills data is a string but not valid JSON (could not parse):", data.skills, e);
            mappedSkills = [];
        }
    } else {
      // Handles cases where data.skills is present but not an array or a string (e.g., a single object, number, boolean)
      console.warn("Skills data from database is in an unexpected top-level format:", data.skills);
      mappedSkills = [];
    }
  }

  return {
    id: data.id,
    title: data.title || undefined,
    description: data.description || undefined,
    photo: data.photoUrl || undefined,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    jobTitle: data.jobTitle || undefined,
    city: data.city || undefined,
    country: data.country || undefined,
    phone: data.phone || undefined,
    email: data.email || undefined,
    // Use optional chaining and default to empty array if these are null/undefined from data
    workExperiences: data.workExperiences?.map((exp) => ({
      position: exp.position || undefined,
      company: exp.company || undefined,
      startDate: exp.startDate?.toISOString().split("T")[0],
      endDate: exp.endDate?.toISOString().split("T")[0],
      description: exp.description || undefined,
    })) || [],
    educations: data.educations?.map((edu) => ({
      degree: edu.degree || undefined,
      school: edu.school || undefined,
      startDate: edu.startDate?.toISOString().split("T")[0],
      endDate: edu.endDate?.toISOString().split("T")[0],
    })) || [],
    skills: mappedSkills, // Assign the fully transformed and type-safe skills array
    borderStyle: data.borderStyle,
    colorHex: data.colorHex,
    theme: data.theme || undefined,
    summary: data.summary || undefined,
  };
}