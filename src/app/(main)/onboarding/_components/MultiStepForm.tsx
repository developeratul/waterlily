"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { fullSchema, type OnboardingFormSchema } from "@/schemas/onboarding";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { fieldsForStep } from "./helpers";
import { Navigation } from "./Navigation";
import { ProgressBar } from "./ProgressBar";
import { QuestionField } from "./QuestionField";
import { onboardingSteps } from "./questions";

export function MultiStepForm() {
  const router = useRouter();
  const submitMutation = api.onboarding.submit.useMutation();
  const form = useForm({
    resolver: zodResolver(fullSchema),
    defaultValues: {},
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const [step, setStep] = React.useState(0);
  const total = onboardingSteps.length;

  const next = async () => {
    const fields = fieldsForStep(step);
    const valid = await form.trigger(fields as (keyof OnboardingFormSchema)[], {
      shouldFocus: true,
    });
    if (valid) setStep((s) => Math.min(s + 1, total - 1));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const isLast = step === total - 1;

  const handleSubmit = form.handleSubmit(async (values) => {
    await submitMutation.mutateAsync(values);
    router.replace("/dashboard");
  });

  const onboardingStep = onboardingSteps[step];

  if (!onboardingStep) return null;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <ProgressBar current={step} total={total} />
        <Card>
          <CardHeader>
            <CardTitle>{onboardingStep.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {onboardingStep.questions.map((q) => (
              <QuestionField key={q.id} question={q} />
            ))}
          </CardContent>
        </Card>
        <Navigation
          canGoPrev={step > 0}
          isLast={isLast}
          onPrev={prev}
          onNext={next}
          isSubmitting={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
}
