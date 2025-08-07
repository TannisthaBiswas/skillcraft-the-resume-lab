// src/components/CoverLetterDialog.tsx

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clipboard, ClipboardCheck } from "lucide-react";

interface CoverLetterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  text: string | null;
}

export default function CoverLetterDialog({ isOpen, onClose, text }: CoverLetterDialogProps) {
  const [hasCopied, setHasCopied] = useState(false);
  
  if (!text) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Generated Cover Letter</DialogTitle>
          <DialogDescription>
            Review the generated letter below. You can copy it and paste it into any editor.
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <Button
            size="icon"
            variant="ghost"
            onClick={handleCopy}
            className="absolute top-2 right-2 z-10 h-8 w-8"
          >
            {hasCopied ? <ClipboardCheck className="h-5 w-5 text-green-500" /> : <Clipboard className="h-5 w-5" />}
          </Button>
          <div className="prose prose-sm max-h-[60vh] overflow-y-auto rounded-md border bg-secondary p-4 whitespace-pre-wrap">
            {text}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}