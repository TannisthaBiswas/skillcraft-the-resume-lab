"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PaginationControls({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/resumes?${params.toString()}`);
  };

  return (
    <>
      <Button
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
        variant="outline"
      >
        Previous
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </span>
      <Button
        onClick={() => goToPage(page + 1)}
        disabled={page >= totalPages}
        variant="outline"
      >
        Next
      </Button>
    </>
  );
}
