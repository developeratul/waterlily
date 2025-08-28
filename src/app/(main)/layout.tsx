import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const result = await auth.api.getSession({ headers: headersList });

  if (!result?.session) {
    redirect("/");
  }

  return <>{children}</>;
}
