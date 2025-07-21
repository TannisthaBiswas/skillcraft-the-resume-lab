// src/components/themes/ModernTheme.tsx

import { FC } from "react";
import { ThemeProps } from "@/lib/themes";
import {
  ContactInfo,
  EducationSection,
  NameAndTitle,
  PhotoSection,
  SectionHeading,
  SkillsSection,
  SummarySection,
  WorkExperienceSection,
} from "../ResumeSections";

const ModernTheme: FC<ThemeProps> = ({ resumeData }) => {
  const {
    colorHex,
    photo,
    summary,
    workExperiences,
    educations,
    skills,
  } = resumeData;

  // Ensure a valid accent color for the theme's background
  const themeAccentColor = typeof colorHex === 'string' && colorHex.trim() !== '' ? colorHex : "#1f2937"; // Fallback to a dark gray

  const SidebarHeading = ({ children }: { children: React.ReactNode }) => (
    <SectionHeading
      color="#FFFFFF" // Sidebar headings are always white for contrast
      className={`border-b-2 border-white pb-1 mb-2`}
    >
      {children}
    </SectionHeading>
  );

  return (
    <div className="flex h-full text-sm">
      {/* Left Sidebar */}
      <aside
        className="w-[260px] flex-shrink-0 space-y-6 p-6 text-white"
        style={{ backgroundColor: themeAccentColor }}
      >
        <div className="flex flex-col items-center space-y-4">
          {/* Photo Section */}
          {photo && <PhotoSection resumeData={resumeData} />}

          {/* Contact Info */}
          <ContactInfo
            resumeData={resumeData}
            className="flex-col items-start gap-y-2"
            renderLinks={false} // Links not active in printed resume
            iconClassName="text-white" // Icons white for visibility on dark background
          />
        </div>

        {/* Education Section (conditional rendering) */}
        {educations && educations.length > 0 && (
          <div className="space-y-4 ">
            <SidebarHeading>Education</SidebarHeading>
            <EducationSection resumeData={resumeData} />
          </div>
        )}

        {/* Skills Section (conditional rendering) */}
        {skills && skills.length > 0 && (
          <div className="space-y-2">
            <SidebarHeading>Skills</SidebarHeading>
            <SkillsSection
              resumeData={resumeData}
              // Invert colors for Modern Theme skills
              badgeBgColor="white"          // White badge background
              badgeTextColor={themeAccentColor} // Text color is the accent color
              filledDotColor="white"        // Filled dots are white
              unfilledDotColor={themeAccentColor} // Unfilled dots are accent color
              unfilledDotBorderColor={themeAccentColor} // Border for unfilled dots is also accent color
            />
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-full space-y-6 p-8">
        {/* Name and Title */}
        <NameAndTitle resumeData={resumeData} className="text-left" />

        {/* Summary Section (conditional rendering) */}
        {summary && <SummarySection resumeData={resumeData} />}

        {/* Work Experience Section (conditional rendering) */}
        {workExperiences && workExperiences.length > 0 && (
          <WorkExperienceSection resumeData={resumeData} />
        )}
      </main>
    </div>
  );
};

export default ModernTheme;