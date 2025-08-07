// ResumeEditor.tsx

"use client";

import useUnloadWarning from "@/hooks/useUnloadWarning";
import { ResumeServerData } from "@/lib/types";
import { cn, mapToResumeValues } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

// --- REMOVED: AtsScoreDialog and CoverLetterDialog imports ---
import FeaturePanel from "@/components/FeaturePanel"; // This component will now manage its own dialogs

import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import ResumePreviewSection from "./ResumePreviewSection";
import { steps } from "./steps";
import useAutoSaveResume from "./useAutoSaveResume";

interface ResumeEditorProps {
  resumeToEdit: ResumeServerData | null;
}

const defaultEmptyResumeValues: ResumeValues = {
  title: "",
  description: "",
  photo: null,
  firstName: "",
  lastName: "",
  jobTitle: "",
  city: "",
  country: "",
  phone: "",
  email: "",
  workExperiences: [],
  educations: [],
  skills: [],
  summary: "",
  colorHex: "",
  borderStyle: "",
  theme: "classic",
};


export default function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
  const searchParams = useSearchParams();

  const [resumeData, setResumeData] = useState<ResumeValues>(
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
  const FormComponent = steps.find((step) => step.key === currentStep)?.component;

  return (
    <div className="flex grow flex-col">

    <header className="bg-gradient-to-r from-purple-400 to-purple-600 px-6 py-6 text-center text-white shadow-lg sm:px-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Build Your Career Story
        </h1>
        <p className="mt-2 text-sm font-light opacity-90">
          Easily create a stunning resume that lands you the job you want. Your progress is saved automatically.
        </p>
      </div>
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

            <div className="pt-4">
              <FeaturePanel
                resumeData={resumeData} 
              />
            </div>

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
