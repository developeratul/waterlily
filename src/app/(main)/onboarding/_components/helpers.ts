import { onboardingSteps } from "./questions";

export function fieldsForStep(stepIndex: number): string[] {
  const step = onboardingSteps[stepIndex];
  return step?.questions.map((q) => q.id) ?? [];
}
