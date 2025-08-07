// src/components/AtsScoreDialog.tsx

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle2, Target } from "lucide-react";

// Define the structure of the ATS result based on your API
interface AtsResult {
  score: number;
  matchAnalysis: string;
  suggestions: string[];
}

interface AtsScoreDialogProps {
  isOpen: boolean;
  onClose: () => void;
  result: AtsResult | null;
}

export default function AtsScoreDialog({ isOpen, onClose, result }: AtsScoreDialogProps) {
  if (!result) return null;

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">ATS Score Report</DialogTitle>
          <DialogDescription>
            This score estimates how well your resume matches the job description.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="text-center">
            <p className={`text-7xl font-bold ${getScoreColor(result.score)}`}>
              {result.score}
              <span className="text-3xl">%</span>
            </p>
            <p className="font-semibold text-lg">Match Score</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center"><Target className="mr-2 h-5 w-5" />Match Analysis</h3>
            <p className="text-sm text-muted-foreground p-3 bg-secondary rounded-md">{result.matchAnalysis}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center"><CheckCircle2 className="mr-2 h-5 w-5" />Suggestions for Improvement</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              {result.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}