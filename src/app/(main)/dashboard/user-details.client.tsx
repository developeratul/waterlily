"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { redirect } from "next/navigation";

export default function UserDetailsCard() {
  const [data] = api.onboarding.get.useSuspenseQuery();

  if (!data) {
    return redirect("/onboarding");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="text-muted-foreground text-sm">Name</div>
          <div className="text-base">{data.fullName ?? "Not provided"}</div>
        </div>
        <div>
          <div className="text-muted-foreground text-sm">Bio</div>
          <div className="text-base whitespace-pre-wrap">
            {data.bio ?? "Not provided"}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground text-sm">Role</div>
          <div className="text-base font-medium">
            {data.role ?? "Not provided"}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground mb-2 text-sm">Interests</div>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(data.interests) && data.interests.length ? (
              data.interests.map((i: string) => (
                <span key={i} className="rounded border px-3 py-1 text-sm">
                  {i}
                </span>
              ))
            ) : (
              <i className="text-muted-foreground text-sm">Not provided</i>
            )}
          </div>
        </div>
        <div>
          <div className="text-muted-foreground text-sm">Username</div>
          <div className="text-base">{data.username ?? "Not provided"}</div>
        </div>
        <div>
          <div className="text-muted-foreground text-sm">Website</div>
          <div className="text-base">{data.website ?? "Not provided"}</div>
        </div>
      </CardContent>
    </Card>
  );
}
