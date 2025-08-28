export type BaseQuestion = {
  id: string;
  title: string;
  description?: string;
  required?: boolean;
};

export type TextQuestion = BaseQuestion & {
  type: "text";
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
};

export type TextareaQuestion = BaseQuestion & {
  type: "textarea";
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
};

export type MultipleChoiceQuestion = BaseQuestion & {
  type: "multipleChoice";
  options: { value: string; label: string }[];
  allowMultiple?: boolean;
};

export type Question = TextQuestion | TextareaQuestion | MultipleChoiceQuestion;

export type Step = {
  id: string;
  title: string;
  questions: Question[];
};

export type StepsDefinition = readonly Step[];
