import { SignInForm } from "./sign-in-form";

export default async function HomeLoginPage() {
  return (
    <div className="flex h-dvh w-dvw items-center justify-center">
      <div className="w-full max-w-sm px-4">
        <SignInForm />
      </div>
    </div>
  );
}
