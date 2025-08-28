import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import { MultiStepForm } from "./_components/MultiStepForm";

export default async function OnboardingPage() {
  const user = await api.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  if (user.isOnboarded) {
    return redirect("/dashboard");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4">
      <h1 className="text-2xl font-semibold">Onboarding</h1>
      <MultiStepForm />
    </div>
  );
}
