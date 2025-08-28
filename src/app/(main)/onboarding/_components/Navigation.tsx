"use client";

import { Button } from "@/components/ui/button";

export function Navigation({
  canGoPrev,
  isLast,
  onPrev,
  onNext,
  isSubmitting,
}: {
  canGoPrev: boolean;
  isLast: boolean;
  onPrev: () => void;
  onNext: () => void;
  isSubmitting: boolean;
}) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <Button
        type="button"
        variant="secondary"
        onClick={onPrev}
        disabled={!canGoPrev}
      >
        Previous
      </Button>
      <Button
        type={isLast ? "submit" : "button"}
        onClick={!isLast ? onNext : undefined}
        disabled={isSubmitting}
      >
        {isLast ? "Submit" : "Next"}
      </Button>
    </div>
  );
}
