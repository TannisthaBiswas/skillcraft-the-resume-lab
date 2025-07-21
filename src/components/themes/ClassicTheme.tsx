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
} from "../ResumeSections";

const ClassicTheme: FC<ThemeProps> = ({ resumeData }) => {
  // Helper to check if a section has content
  const hasContent = (sectionKey: keyof typeof resumeData): boolean => {
    const data = resumeData[sectionKey];

    if (Array.isArray(data)) {
      return data.length > 0;
    }
    if (typeof data === 'string') {
      return data.trim().length > 0;
    }
    // For other types, check if it's not null or undefined
    return !!data;
  };

  const Separator = () => (
    <hr
      className="border-2"
      style={{ borderColor: resumeData.colorHex || "#000" }} // Default to black if no color is set
    />
  );

  const showSummary = hasContent("summary");
  const showWorkExperience = hasContent("workExperiences");
  const showEducation = hasContent("educations");
  const showSkills = hasContent("skills");

  return (
    <div className="p-8 space-y-4">
      <header className="flex items-center justify-between">
        <PhotoSection resumeData={resumeData}/>
        <NameAndTitle resumeData={resumeData} className="text-left" />
        <ContactInfo
          resumeData={resumeData}
          className="flex-col items-end gap-y-1"
          iconClassName="text-gray-600"
          renderLinks={false}
        />
      </header>

      {/* Separator after header if any main section has content */}
      {(showSummary || showWorkExperience || showEducation || showSkills) && (
        <Separator />
      )}

      {showSummary && (
        <>
          <SummarySection resumeData={resumeData} />
          {(showWorkExperience || showEducation || showSkills) && (
            <Separator />
          )}
        </>
      )}

      {showWorkExperience && (
        <>
          <WorkExperienceSection resumeData={resumeData} />
          {(showEducation || showSkills) && (
            <Separator />
          )}
        </>
      )}

      {showEducation && (
        <>
          <EducationSection resumeData={resumeData} />
          {showSkills && (
            <Separator />
          )}
        </>
      )}

      {showSkills && (
        <SkillsSection resumeData={resumeData} />
      )}
    </div>
  );
};

export default ClassicTheme;