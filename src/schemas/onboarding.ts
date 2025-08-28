import { z } from "zod";

export const usernameSchema = z.preprocess(
  (v) => (typeof v === "string" ? v.trim().toLowerCase() : v),
  z
    .string()
    .min(3, "Min 3 characters")
    .max(20, "Max 20 characters")
    .regex(
      /^(?!_)(?!.*__)(?!.*_$)[a-z0-9_]+$/,
      "Use lowercase letters, numbers, underscores; no leading/trailing/double underscores",
    ),
);

export const step1Schema = z.object({
  fullName: z.string().min(1, "Required").min(2),
  bio: z
    .string()
    .max(280)
    .optional()
    .transform((v) => v ?? ""),
});

export const step2Schema = z.object({
  role: z.string(),
  interests: z.array(z.string()).default([]),
});

export const step3Schema = z.object({
  username: usernameSchema,
  website: z.string().url().optional().or(z.literal("")),
});

export const step4Schema = z.object({
  frequency: z.string(),
  channels: z.array(z.string()).min(1, "Select at least one"),
});

export const fullSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema);

export type OnboardingFormSchema = z.infer<typeof fullSchema>;
