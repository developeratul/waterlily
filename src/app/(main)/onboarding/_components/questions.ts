import type { StepsDefinition } from "./types";

export const onboardingSteps = [
  {
    id: "intro",
    title: "About you",
    questions: [
      {
        id: "fullName",
        type: "text",
        title: "What is your full name?",
        placeholder: "Jane Doe",
        required: true,
        minLength: 2,
      },
      {
        id: "bio",
        type: "textarea",
        title: "Tell us about yourself",
        description: "A short sentence or two.",
        maxLength: 280,
      },
    ],
  },
  {
    id: "prefs",
    title: "Preferences",
    questions: [
      {
        id: "role",
        type: "multipleChoice",
        title: "What best describes you?",
        required: true,
        options: [
          { value: "student", label: "Student" },
          { value: "founder", label: "Founder" },
          { value: "engineer", label: "Engineer" },
        ],
      },
      {
        id: "interests",
        type: "multipleChoice",
        title: "Topics you are interested in",
        description: "Select any that apply",
        allowMultiple: true,
        options: [
          { value: "ai", label: "AI" },
          { value: "design", label: "Design" },
          { value: "product", label: "Product" },
        ],
      },
    ],
  },
  {
    id: "account",
    title: "Account details",
    questions: [
      {
        id: "username",
        type: "text",
        title: "Choose a username",
        required: true,
        minLength: 3,
      },
      {
        id: "website",
        type: "text",
        title: "Website (optional)",
        placeholder: "https://example.com",
      },
    ],
  },
  {
    id: "notifications",
    title: "Notifications",
    questions: [
      {
        id: "frequency",
        type: "multipleChoice",
        title: "How often should we notify you?",
        required: true,
        options: [
          { value: "daily", label: "Daily" },
          { value: "weekly", label: "Weekly" },
          { value: "monthly", label: "Monthly" },
        ],
      },
      {
        id: "channels",
        type: "multipleChoice",
        title: "Preferred channels",
        description: "Select at least one",
        allowMultiple: true,
        required: true,
        options: [
          { value: "email", label: "Email" },
          { value: "sms", label: "SMS" },
          { value: "push", label: "Push" },
        ],
      },
    ],
  },
] as const satisfies StepsDefinition;

export type OnboardingFieldValues = {
  [K in (typeof onboardingSteps)[number]["questions"][number] as K["id"]]: K extends {
    type: "multipleChoice";
    allowMultiple: true;
  }
    ? string[]
    : string;
};
