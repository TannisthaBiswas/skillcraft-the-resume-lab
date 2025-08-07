// src/components/FeaturePanel.tsx

"use client"; // Make sure this is at the very top if it's not already

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card"; // Removed CardHeader as we're using DialogHeader
// Import all necessary Dialog components
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Lightbulb, FileText, Sparkles } from "lucide-react"; // Removed X icon as it's not needed for custom button

import AtsScoreDialog from "@/components/AtsScoreDialog";
import CoverLetterDialog from "@/components/CoverLetterDialog"; // Assuming this is the correct component name
import { ResumeValues } from "@/lib/validation";

// Define types for API results
interface AtsResult {
  score: number;
  matchAnalysis: string;
  suggestions: string[];
}

interface FeaturePanelProps {
  resumeData: ResumeValues;
}

export default function FeaturePanel({ resumeData }: FeaturePanelProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // AI Feature States
  const [jobDescription, setJobDescription] = useState("");
  const [isAtsLoading, setIsAtsLoading] = useState(false);
  const [isCoverLetterLoading, setIsCoverLetterLoading] = useState(false);
  const [atsResult, setAtsResult] = useState<AtsResult | null>(null);
  const [coverLetterText, setCoverLetterText] = useState<string | null>(null);

  // AI Feature Handlers
  const handleCalculateAts = async () => {
    if (!jobDescription) return;
    setIsAtsLoading(true);
    try {
      const response = await fetch("/api/calculate-ats-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData, jobDescription }),
      });
      if (!response.ok) {
        throw new Error("Failed to get ATS score");
      }
      const resultData = await response.json();
      setAtsResult(resultData);
    } catch (error) {
      console.error(error);
      alert("An error occurred while calculating the ATS score.");
    } finally {
      setIsAtsLoading(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!jobDescription) return;
    setIsCoverLetterLoading(true);
    try {
      const response = await fetch("/api/generate-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeData, jobDescription }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate cover letter");
      }
      const resultData = await response.json();
      setCoverLetterText(resultData.coverLetter);
    } catch (error) {
      console.error(error);
      alert("An error occurred while generating the cover letter.");
    } finally {
      setIsCoverLetterLoading(false);
    }
  };

  return (
    <>
      {/* The trigger button in the main content area */}
       <div className="flex justify-center md:justify-center md:pl-6 pt-4">
      <Button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold"
        variant="outline"
      >
        <Sparkles className="mr-2 h-5 w-5 text-purple-500" />
        AI Assistant <span className="ml-2 text-sm text-muted-foreground hidden sm:inline">(ATS & Cover Letter)</span>
      </Button>
</div>
      {/* The main AI Dialog/Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {/* We want DialogContent to manage the overall modal padding */}
        <DialogContent className="sm:max-w-[600px] p-0"> {/* Reverted to p-0 here */}
          <DialogHeader className="p-6 pb-4"> {/* Added padding to DialogHeader */}
            <DialogTitle className="flex items-center text-2xl font-bold">
              <Sparkles className="mr-2 h-7 w-7 text-purple-500" />
              AI Assistant
            </DialogTitle>
            <DialogDescription className="sr-only">
              Use these tools to analyze your resume against a job description or generate a cover letter.
            </DialogDescription>
          </DialogHeader>

          {/* The Card now just contains the main form content */}
          {/* Removed negative margins from Card and added padding to CardContent */}
          <Card className="w-full shadow-none border-none rounded-none">
            <CardContent className="p-6 pt-0 space-y-4"> {/* Added padding to CardContent */}
              <div>
                <Label htmlFor="job-description" className="font-semibold">
                  Job Description
                </Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Paste the job description here for better results.
                </p>
                <Textarea
                  id="job-description"
                  placeholder="e.g., We are looking for a proactive Senior React Developer with 5+ years of experience..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={10}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleCalculateAts}
                  disabled={!jobDescription || isAtsLoading || isCoverLetterLoading}
                  className="w-full"
                >
                  {isAtsLoading ? (
                    "Calculating..."
                  ) : (
                    <>
                      <Lightbulb className="mr-2 h-4 w-4" />
                      Calculate ATS Score
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleGenerateCoverLetter}
                  disabled={!jobDescription || isAtsLoading || isCoverLetterLoading}
                  className="w-full"
                >
                  {isCoverLetterLoading ? (
                    "Generating..."
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Cover Letter
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>

      {/* ATS Score Dialog */}
      <AtsScoreDialog
        isOpen={!!atsResult}
        onClose={() => setAtsResult(null)}
        result={atsResult}
      />

      {/* Cover Letter Dialog */}
      <CoverLetterDialog
        isOpen={!!coverLetterText}
        onClose={() => setCoverLetterText(null)}
        text={coverLetterText}
      />
    </>
  );
}

// // src/components/FeaturePanel.tsx

// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Lightbulb, FileText, Sparkles } from "lucide-react";

// interface FeaturePanelProps {
//   jobDescription: string;
//   setJobDescription: (value: string) => void;
//   onCalculateAts: () => void;
//   onGenerateCoverLetter: () => void;
//   isAtsLoading: boolean;
//   isCoverLetterLoading: boolean;
// }

// export default function FeaturePanel({
//   jobDescription,
//   setJobDescription,
//   onCalculateAts,
//   onGenerateCoverLetter,
//   isAtsLoading,
//   isCoverLetterLoading,
// }: FeaturePanelProps) {
//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle className="flex items-center">
//           <Sparkles className="mr-2 h-5 w-5 text-purple-500" />
//           AI Assistant
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div>
//           <Label htmlFor="job-description" className="font-semibold">
//             Job Description
//           </Label>
//           <p className="text-sm text-muted-foreground mb-2">
//             Paste the job description here for better results.
//           </p>
//           <Textarea
//             id="job-description"
//             placeholder="e.g., We are looking for a proactive Senior React Developer with 5+ years of experience..."
//             value={jobDescription}
//             onChange={(e) => setJobDescription(e.target.value)}
//             rows={8}
//           />
//         </div>
//         <div className="flex flex-col sm:flex-row gap-3">
//           <Button
//             onClick={onCalculateAts}
//             disabled={!jobDescription || isAtsLoading || isCoverLetterLoading}
//             className="w-full"
//           >
//             {isAtsLoading ? (
//               "Calculating..."
//             ) : (
//               <>
//                 <Lightbulb className="mr-2 h-4 w-4" />
//                 Calculate ATS Score
//               </>
//             )}
//           </Button>
//           <Button
//             onClick={onGenerateCoverLetter}
//             disabled={!jobDescription || isAtsLoading || isCoverLetterLoading}
//             className="w-full"
//           >
//             {isCoverLetterLoading ? (
//               "Generating..."
//             ) : (
//               <>
//                 <FileText className="mr-2 h-4 w-4" />
//                 Generate Cover Letter
//               </>
//             )}
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

