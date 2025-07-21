import ResumePreview from "@/components/ResumePreview";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import BorderStyleButton from "./BorderStyleButton";
import ColorPicker from "./ColorPicker";
import ThemePicker from "./ThemePicker";
import { ThemeName } from "@/lib/themes";

interface ResumePreviewSectionProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
  className?: string;
}

export default function ResumePreviewSection({
  resumeData,
  setResumeData,
  className,
}: ResumePreviewSectionProps) {
  return (
    <div
      className={cn("group relative hidden w-full md:flex md:w-1/2 flex-col", className)} // ADDED 'flex-col' HERE
    >
      
      <div className="flex flex-row items-center justify-start gap-4 bg-secondary p-3 flex-shrink-0"> {/* Added flex-shrink-0 */}
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle })
          }
        />
<ThemePicker
  theme={resumeData.theme as ThemeName}
  onChange={(theme) =>
    setResumeData({ ...resumeData, theme })
  }
/>


      </div>

      {/* Container for the resume preview, now takes remaining space */}
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3 flex-grow"> {/* Added flex-grow */}
        <ResumePreview
          resumeData={resumeData}
          className="max-w-2xl shadow-md"
          theme={resumeData.theme}
        />
      </div>
    </div>
  );
}
