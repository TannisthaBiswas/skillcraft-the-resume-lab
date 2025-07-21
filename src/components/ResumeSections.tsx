// src/components/ResumeSections.tsx

import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
import { ResumeValues } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";

interface ResumeSectionProps {
  resumeData: ResumeValues;
}

// ... (existing SectionHeading, PhotoSection, NameAndTitle, ContactInfo, SummarySection, WorkExperienceSection, EducationSection components - these remain unchanged)

export function SectionHeading({
  children,
  color,
  className,
}: {
  children: React.ReactNode;
  color?: string | null;
  className?: string;
}) {
  return (
    <h2
      className={cn("text-lg font-bold uppercase", className)}
      style={{ color: color || undefined }}
    >
      {children}
    </h2>
  );
}

export function PhotoSection({ resumeData }: ResumeSectionProps) {
  const { photo, borderStyle } = resumeData;
  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    if (photo instanceof File) {
      const objectUrl = URL.createObjectURL(photo);
      setPhotoSrc(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (photo === null) {
      setPhotoSrc("");
    }
  }, [photo]);

  if (!photoSrc) return null;

  return (
    <Image
      src={photoSrc}
      width={100}
      height={100}
      alt="Author photo"
      className="aspect-square object-cover"
      style={{
        borderRadius:
          borderStyle === BorderStyles.SQUARE
            ? "0px"
            : borderStyle === BorderStyles.CIRCLE
            ? "9999px"
            : "10%",
      }}
    />
  );
}

export function NameAndTitle({
  resumeData,
  className,
}: ResumeSectionProps & { className?: string }) {
  const { firstName, lastName, jobTitle, colorHex } = resumeData;
  return (
    <div className={cn("space-y-1 text-center", className)}>
      <h1 className="text-3xl font-bold">
        {firstName} {lastName}
      </h1>
      <p className="text-lg font-medium" style={{ color: colorHex }}>
        {jobTitle}
      </p>
    </div>
  );
}

export function ContactInfo({
  resumeData,
  className,
  iconClassName,
  renderLinks = false,
}: ResumeSectionProps & { className?: string; iconClassName?: string; renderLinks?: boolean }) {
  const { email, phone, city, country } = resumeData;
  const location = [city, country].filter(Boolean).join(", ");

  const ContactLink = ({ href, children, target, rel }: { href: string; children: React.ReactNode; target?: string; rel?: string }) => {
    return renderLinks ? (
      <a href={href} className="flex items-center gap-2" target={target} rel={rel}>
        {children}
      </a>
    ) : (
      <span className="flex items-center gap-2">
        {children}
      </span>
    );
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-1 text-sm", className)}>
      {email && (
        <ContactLink href={`mailto:${email}`}>
          <Mail className={cn("h-4 w-4", iconClassName)} /> {email}
        </ContactLink>
      )}
      {phone && (
        <ContactLink href={`tel:${phone}`}>
          <Phone className={cn("h-4 w-4", iconClassName)} /> {phone}
        </ContactLink>
      )}
      {location && (
        <p className="flex items-center gap-2">
          <MapPin className={cn("h-4 w-4", iconClassName)} /> {location}
        </p>
      )}
    </div>
  );
}

export function SummarySection({ resumeData }: ResumeSectionProps) {
  const { summary, colorHex } = resumeData;
  if (!summary) return null;

  return (
    <div className="break-inside-avoid space-y-2">
      <SectionHeading color={colorHex}>Professional Summary</SectionHeading>
      <div className="whitespace-pre-line text-sm">{summary}</div>
    </div>
  );
}

export function WorkExperienceSection({ resumeData }: ResumeSectionProps) {
  const { workExperiences, colorHex } = resumeData;
  const experiences = workExperiences?.filter(
    (exp) => Object.values(exp).filter(Boolean).length > 0,
  );
  if (!experiences?.length) return null;

  return (
    <div className="space-y-3">
      <SectionHeading color={colorHex}>Work Experience</SectionHeading>
      {experiences.map((exp, index) => (
        <div key={index} className="break-inside-avoid space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">{exp.position}</h3>
            {exp.startDate && (
              <p className="text-sm text-gray-600">
                {formatDate(exp.startDate, "MMM yyyy")} -{" "}
                {exp.endDate ? formatDate(exp.endDate, "MMM yyyy") : "Present"}
              </p>
            )}
          </div>
          <p className="text-sm font-medium">{exp.company}</p>
          <div className="whitespace-pre-line text-xs text-gray-700">{exp.description}</div>
        </div>
      ))}
    </div>
  );
}

export function EducationSection({ resumeData }: ResumeSectionProps) {
  const { educations, colorHex } = resumeData;
  const schools = educations?.filter(
    (edu) => Object.values(edu).filter(Boolean).length > 0,
  );
  if (!schools?.length) return null;

  return (
    <div className="space-y-3">
      <SectionHeading color={colorHex}>Education</SectionHeading>
      {schools.map((edu, index) => (
        <div key={index} className="break-inside-avoid space-y-0.5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">{edu.degree}</h3>
            {edu.startDate && (
              <p className="text-sm text-gray-600">
                {formatDate(edu.startDate, "yyyy")} - {edu.endDate ? formatDate(edu.endDate, "yyyy") : "Present"}
              </p>
            )}
          </div>
          <p className="text-sm">{edu.school}</p>
        </div>
      ))}
    </div>
  );
}

// Updated SkillsSection to allow color inversion
export function SkillsSection({
  resumeData,
  badgeBgColor,
  badgeTextColor,
  filledDotColor,
  unfilledDotColor,
  unfilledDotBorderColor,
}: ResumeSectionProps & {
  badgeBgColor?: string;
  badgeTextColor?: string;
  filledDotColor?: string;
  unfilledDotColor?: string;
  unfilledDotBorderColor?: string;
}) {
  const { skills, colorHex, borderStyle } = resumeData;

  // Ensure colorHex is a valid string for badge background and as a fallback
  const accentColor = typeof colorHex === 'string' && colorHex.trim() !== '' ? colorHex : "#000000"; // Default to black

  if (!skills?.length) return null;

  return (
    <div className="break-inside-avoid space-y-2">
      <div className="flex flex-col gap-1">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center justify-between">
            <Badge
              style={{
                backgroundColor: badgeBgColor || accentColor, // Use prop or default accentColor
                color: badgeTextColor || "white", // Use prop or default white
                borderRadius:
                  borderStyle === BorderStyles.SQUARE
                    ? "4px"
                    : borderStyle === BorderStyles.CIRCLE
                      ? "9999px"
                      : "8px",
              }}
            >
              {skill.name}
            </Badge>

            {/* Proficiency Dots */}
            {skill.proficiency > 0 && (
              <span className="flex items-center">
                {[1, 2, 3, 4, 5].map((dotIndex) => {
                  const isFilled = dotIndex <= skill.proficiency;
                  const dotBg = isFilled ? (filledDotColor || accentColor) : (unfilledDotColor || "white");
                  const dotBorder = isFilled ? (filledDotColor || accentColor) : (unfilledDotBorderColor || "#9CA3AF"); // Default to gray-400 for empty borders

                  return (
                    <span
                      key={dotIndex}
                      className="inline-block w-2 h-2 rounded-full mx-[1px]"
                      style={{
                        backgroundColor: dotBg,
                        border: `1px solid ${dotBorder}`,
                      }}
                    />
                  );
                })}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}