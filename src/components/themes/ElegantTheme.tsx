// src/components/themes/ElegantTheme.tsx

import { FC } from "react";
import { ThemeProps } from "@/lib/themes";
import {
  ContactInfo,
  EducationSection,
  NameAndTitle,
  PhotoSection,
  SkillsSection,
  SummarySection,
  WorkExperienceSection,
} from "../ResumeSections"; // Ensure these components handle empty data gracefully internally if needed, or we explicitly check here.

const ElegantTheme: FC<ThemeProps> = ({ resumeData }) => {
  const {
    photo,
    summary,
    workExperiences,
    educations,
    skills,
    // You can destructure more fields here if needed for other conditions
  } = resumeData;

  return (
    <div className="flex h-full p-2">
      {/* Left Column */}
      <aside className="w-1/3 p-4 space-y-6">
        {/* Conditional rendering for PhotoSection */}
        {photo && ( // Renders PhotoSection only if 'photo' data exists
          <div className="flex justify-start">
            <PhotoSection resumeData={resumeData} />
          </div>
        )}

        {/* ContactInfo typically always rendered, but could be conditional too */}
        <ContactInfo
          resumeData={resumeData}
          className="flex-col items-start gap-y-2"
          renderLinks={false}
        />

        {/* Conditional rendering for EducationSection */}
        {educations && educations.length > 0 && ( // Renders EducationSection only if there are education entries
          <EducationSection resumeData={resumeData} />
        )}

        {/* Conditional rendering for SkillsSection */}
        {skills && skills.length > 0 && ( // Renders SkillsSection only if there are skill entries
          <SkillsSection resumeData={resumeData} />
        )}
      </aside>

      {/* Separator Line - Consider making this conditional if both columns can be empty,
          or if left column is empty, you might want a different layout.
          For now, keeping it always rendered as a visual divider. */}
      <div className="w-px bg-gray-200" />

      {/* Right Column */}
      <main className="w-2/3 p-6 space-y-6">
        {/* NameAndTitle usually always rendered */}
        <NameAndTitle resumeData={resumeData} className="text-left" />

        {/* Conditional rendering for SummarySection */}
        {summary && ( // Renders SummarySection only if 'summary' text exists
          <SummarySection resumeData={resumeData} />
        )}

        {/* Conditional rendering for WorkExperienceSection */}
        {workExperiences && workExperiences.length > 0 && ( // Renders WorkExperienceSection only if there are work experiences
          <WorkExperienceSection resumeData={resumeData} />
        )}
      </main>
    </div>
  );
};

export default ElegantTheme;