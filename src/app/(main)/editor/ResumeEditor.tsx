"use client";

import useUnloadWarning from "@/hooks/useUnloadWarning";
import { ResumeServerData } from "@/lib/types";
import { cn, mapToResumeValues } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation"; // This is where ResumeValues comes from
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import ResumePreviewSection from "./ResumePreviewSection";
import { steps } from "./steps";
import useAutoSaveResume from "./useAutoSaveResume";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
}

// Define a default empty ResumeValues object that precisely matches your ResumeValues interface.
// This is constructed based on your provided src/lib/validation.ts
const defaultEmptyResumeValues: ResumeValues = {
  // From GeneralInfoValues (generalInfoSchema)
  title: "",
  description: "",

  // From PersonalInfoValues (personalInfoSchema)
  photo: null, // As per ResumeValues type, which can be File | string | null
  firstName: "",
  lastName: "",
  jobTitle: "",
  city: "",
  country: "",
  phone: "",
  email: "",

  // From WorkExperienceValues (workExperienceSchema)
  workExperiences: [], // Default for optional array

  // From EducationValues (educationSchema)
  educations: [], // Default for optional array

  // From SkillsValues (skillsSchema)
  skills: [], // skillSchema has .default([]) in validation.ts

  // From SummaryValues (summarySchema)
  summary: "",

  // Direct properties in resumeSchema
  colorHex: "",
  borderStyle: "",
  theme: "classic", // Defaulting to "classic" as discussed previously
  // 'id' is an optional property added by Omit/&, so it doesn't need to be explicitly initialized if undefined is acceptable.
};

export default function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
  const searchParams = useSearchParams();

  const [resumeData, setResumeData] = useState<ResumeValues>(
    // If resumeToEdit exists, map it; otherwise, use the correctly structured defaultEmptyResumeValues
    resumeToEdit ? mapToResumeValues(resumeToEdit) : defaultEmptyResumeValues,
  );

  const [showSmResumePreview, setShowSmResumePreview] = useState(false);

  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);

  useUnloadWarning(hasUnsavedChanges);

  const currentStep = searchParams.get("step") || steps[0].key;

  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <div className="flex grow flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Design your resume</h1>
        <p className="text-sm text-muted-foreground">
          Follow the steps below to create your resume. Your progress will be
          saved automatically.
        </p>
      </header>

      <main className="relative grow">

        <div className="absolute bottom-0 top-0 flex w-full">
          <div
            className={cn(
              "w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2",
              showSmResumePreview && "hidden",
            )}
          >
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(showSmResumePreview && "flex")}
          />
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
        isSaving={isSaving}
      />
    </div>
  );
}