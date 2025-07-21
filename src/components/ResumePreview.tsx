import useDimensions from "@/hooks/useDimensions";
import { themes, ThemeName } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import React, { useRef } from "react";

interface ResumePreviewProps {
  resumeData: ResumeValues;
  contentRef?: React.Ref<HTMLDivElement>;
  className?: string;
  theme?: string | null; // This is correctly defined now
}

export default function ResumePreview({
  resumeData,
  contentRef,
  className,
  theme, // <--- 1. Destructure the 'theme' prop here
}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDimensions(containerRef);

  // 2. Use the 'theme' prop directly, not resumeData.theme
  // The 'theme' prop already comes from resume.theme in ResumeItem.tsx
  const themeName = (theme as ThemeName) || "classic"; // Default to 'classic' if prop is null or undefined

  // Select the correct layout component from the themes object
  const ThemeComponent = themes[themeName];

  // Fallback in case the theme is not found
  if (!ThemeComponent) {
    return (
      <div className="p-4">Error: Theme &quot;{themeName}&quot; not found.</div>
    );
  }

  return (
    <div
      className={cn(
        "aspect-[210/297] h-fit w-full bg-white text-black",
        className,
      )}
      ref={containerRef}
    >
      <div
        className={cn("h-full w-full", !width && "invisible")}
        style={{
          // The zoom logic remains to scale the entire preview
          zoom: (1 / 794) * width, // A4 paper width in px
        }}
        ref={contentRef}
        id="resumePreviewContent"
      >
        {/* Render the selected theme component */}
        <ThemeComponent resumeData={resumeData} />
      </div>
    </div>
  );
}

// Ensure ALL section components have been moved out of this file.