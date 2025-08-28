"use client";

import { Progress } from "@/components/ui/progress";

export function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const value = total > 0 ? Math.round(((current + 1) / total) * 100) : 0;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span>
          Step {current + 1} / {total}
        </span>
        <span>{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  );
}
