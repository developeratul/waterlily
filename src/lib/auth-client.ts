import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: String(env.NEXT_PUBLIC_BASE_URL),
});
