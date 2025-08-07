"use client";

import usePremiumModal from "@/hooks/usePremiumModal";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";

interface CreateResumeButtonProps {
  canCreate: boolean;
}

export default function CreateResumeButton({ canCreate }: CreateResumeButtonProps) {
  const premiumModal = usePremiumModal();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  const handleNewResumeClick = () => {
    if (!canCreate) {
      premiumModal.setOpen(true);
    }
  };

  const buttonClassName =
    "group relative rounded-lg border border-border p-3 transition-colors bg-secondary hover:border-purple-500 hover:shadow-lg h-full flex flex-col items-center justify-center";

  const buttonContent = (
    <>
      <PlusSquare 
        className="size-8 text-muted-foreground transition-colors group-hover:text-purple-600" 
        strokeWidth={1.5}
      />
      <span className="mt-3 text-lg font-medium text-muted-foreground transition-colors group-hover:text-purple-600">
        Create new resume
      </span>
    </>
  );

  if (canCreate) {
    return (
      <Link
        href="/editor"
        className={buttonClassName}
        onClick={() => startTransition(() => {})}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <div
      onClick={handleNewResumeClick}
      className={`${buttonClassName} cursor-pointer`}
    >
      {buttonContent}
    </div>
  );
}