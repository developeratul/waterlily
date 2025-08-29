import LogoutButton from "@/components/logout";
import { api, HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import UserDetailsCard from "./user-details.client";

export default function Page() {
  void api.onboarding.get.prefetch();

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-8">
      <HydrateClient>
        <Suspense fallback={<h1>Loading data...</h1>}>
          <UserDetailsCard />
        </Suspense>
      </HydrateClient>
      <LogoutButton />
    </div>
  );
}
