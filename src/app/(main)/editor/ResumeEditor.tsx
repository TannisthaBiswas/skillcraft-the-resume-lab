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

// --- REMOVED: AtsResult interface (now in FeaturePanel) ---

export default function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
  const searchParams = useSearchParams();

  const [resumeData, setResumeData] = useState<ResumeValues>(
    resumeToEdit ? mapToResumeValues(resumeToEdit) : defaultEmptyResumeValues,
  );

  const [showSmResumePreview, setShowSmResumePreview] = useState(false);
  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);
  useUnloadWarning(hasUnsavedChanges);

  // --- REMOVED: All AI feature states (jobDescription, isAtsLoading, etc.) ---
  // --- REMOVED: All AI feature handler functions (handleCalculateAts, handleGenerateCoverLetter) ---

  const currentStep = searchParams.get("step") || steps[0].key;
  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }
  const FormComponent = steps.find((step) => step.key === currentStep)?.component;

  return (
    <div className="flex grow flex-col">
      {/* --- REMOVED: AtsScoreDialog and CoverLetterDialog JSX rendering --- */}
      {/* They will now be rendered inside FeaturePanel */}

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

            {/* FeaturePanel is now just a button here, opening a modal */}
            {/* It receives resumeData directly to perform AI operations */}
            <div className="pt-4">
              <FeaturePanel
                resumeData={resumeData} // Pass resumeData directly to FeaturePanel
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


// // ResumeEditor.tsx

// "use client";

// import useUnloadWarning from "@/hooks/useUnloadWarning";
// import { ResumeServerData } from "@/lib/types";
// import { cn, mapToResumeValues } from "@/lib/utils";
// import { ResumeValues } from "@/lib/validation";
// import { useSearchParams } from "next/navigation";
// import { useState } from "react"; // Ensure useState is imported

// // --- 1. Import new components and types ---
// import AtsScoreDialog from "@/components/AtsScoreDialog";
// import CoverLetterDialog from "@/components/CoverLetterDialog";
// import FeaturePanel from "@/components/FeaturePanel";

// import Breadcrumbs from "./Breadcrumbs";
// import Footer from "./Footer";
// import ResumePreviewSection from "./ResumePreviewSection";
// import { steps } from "./steps";
// import useAutoSaveResume from "./useAutoSaveResume";

// interface ResumeEditorProps {
//   resumeToEdit: ResumeServerData | null;
// }

// const defaultEmptyResumeValues: ResumeValues = {
//   // ... your default values remain unchanged
//   title: "",
//   description: "",
//   photo: null,
//   firstName: "",
//   lastName: "",
//   jobTitle: "",
//   city: "",
//   country: "",
//   phone: "",
//   email: "",
//   workExperiences: [],
//   educations: [],
//   skills: [],
//   summary: "",
//   colorHex: "",
//   borderStyle: "",
//   theme: "classic",
// };

// // Define types for API results
// interface AtsResult {
//   score: number;
//   matchAnalysis: string;
//   suggestions: string[];
// }

// export default function ResumeEditor({ resumeToEdit }: ResumeEditorProps) {
//   const searchParams = useSearchParams();

//   const [resumeData, setResumeData] = useState<ResumeValues>(
//     resumeToEdit ? mapToResumeValues(resumeToEdit) : defaultEmptyResumeValues,
//   );

//   const [showSmResumePreview, setShowSmResumePreview] = useState(false);
//   const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);
//   useUnloadWarning(hasUnsavedChanges);

//   // --- 2. Add state for AI features ---
//   const [jobDescription, setJobDescription] = useState("");
//   const [isAtsLoading, setIsAtsLoading] = useState(false);
//   const [isCoverLetterLoading, setIsCoverLetterLoading] = useState(false);
//   const [atsResult, setAtsResult] = useState<AtsResult | null>(null);
//   const [coverLetterText, setCoverLetterText] = useState<string | null>(null);

//   // --- 3. Implement the handler functions ---
//   const handleCalculateAts = async () => {
//     if (!jobDescription) return;
//     setIsAtsLoading(true);
//     try {
//       const response = await fetch("/api/calculate-ats-score", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ resumeData, jobDescription }),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to get ATS score");
//       }
//       const resultData = await response.json();
//       setAtsResult(resultData);
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred while calculating the ATS score.");
//     } finally {
//       setIsAtsLoading(false);
//     }
//   };

//   const handleGenerateCoverLetter = async () => {
//     if (!jobDescription) return;
//     setIsCoverLetterLoading(true);
//     try {
//       const response = await fetch("/api/generate-cover-letter", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ resumeData, jobDescription }),
//       });
//       if (!response.ok) {
//         throw new Error("Failed to generate cover letter");
//       }
//       const resultData = await response.json();
//       setCoverLetterText(resultData.coverLetter);
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred while generating the cover letter.");
//     } finally {
//       setIsCoverLetterLoading(false);
//     }
//   };

//   const currentStep = searchParams.get("step") || steps[0].key;
//   function setStep(key: string) {
//     const newSearchParams = new URLSearchParams(searchParams);
//     newSearchParams.set("step", key);
//     window.history.pushState(null, "", `?${newSearchParams.toString()}`);
//   }
//   const FormComponent = steps.find((step) => step.key === currentStep)?.component;

//   return (
//     <div className="flex grow flex-col">
//       {/* --- 4. Add Dialogs to the JSX --- */}
//       <AtsScoreDialog isOpen={!!atsResult} onClose={() => setAtsResult(null)} result={atsResult} />
//       <CoverLetterDialog isOpen={!!coverLetterText} onClose={() => setCoverLetterText(null)} text={coverLetterText} />

//       <header className="space-y-1.5 border-b px-3 py-5 text-center">
//         {/* ... header content ... */}
//         <h1 className="text-2xl font-bold">Design your resume</h1>
//         <p className="text-sm text-muted-foreground">
//           Follow the steps below to create your resume. Your progress will be
//           saved automatically.
//         </p>
//       </header>

//       <main className="relative grow">
//         <div className="absolute bottom-0 top-0 flex w-full">
//           <div
//             className={cn(
//               "w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2",
//               showSmResumePreview && "hidden",
//             )}
//           >
//             <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
//             {FormComponent && (
//               <FormComponent
//                 resumeData={resumeData}
//                 setResumeData={setResumeData}
//               />
//             )}

//             {/* --- 5. Place the FeaturePanel in the UI --- */}
//             <div className="pt-4">
//               <FeaturePanel
//                 jobDescription={jobDescription}
//                 setJobDescription={setJobDescription}
//                 onCalculateAts={handleCalculateAts}
//                 onGenerateCoverLetter={handleGenerateCoverLetter}
//                 isAtsLoading={isAtsLoading}
//                 isCoverLetterLoading={isCoverLetterLoading}
//               />
//             </div>

//           </div>
//           <div className="grow md:border-r" />
//           <ResumePreviewSection
//             resumeData={resumeData}
//             setResumeData={setResumeData}
//             className={cn(showSmResumePreview && "flex")}
//           />
//         </div>
//       </main>

//       <Footer
//         currentStep={currentStep}
//         setCurrentStep={setStep}
//         showSmResumePreview={showSmResumePreview}
//         setShowSmResumePreview={setShowSmResumePreview}
//         isSaving={isSaving}
//       />
//     </div>
//   );
// }