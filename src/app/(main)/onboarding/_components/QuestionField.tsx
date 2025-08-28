"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import type { Question } from "./types";

export function QuestionField({ question }: { question: Question }) {
  const form = useFormContext<Record<string, unknown>>();

  return (
    <FormField
      control={form.control}
      name={question.id as never}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{question.title}</FormLabel>
          {question.description ? (
            <FormDescription>{question.description}</FormDescription>
          ) : null}
          <FormControl>
            {question.type === "text" ? (
              <Input placeholder={question.placeholder} {...field} />
            ) : question.type === "textarea" ? (
              <Textarea placeholder={question.placeholder} {...field} />
            ) : question.type === "multipleChoice" ? (
              question.allowMultiple ? (
                <div className="space-y-1">
                  {question.options.map((opt) => {
                    const raw = field.value as unknown;
                    const currentValues: string[] = Array.isArray(raw)
                      ? (raw as string[])
                      : [];
                    return (
                      <label
                        key={opt.value}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          checked={currentValues.includes(opt.value)}
                          onCheckedChange={(checked) => {
                            const set = new Set<string>(currentValues);
                            if (checked) set.add(opt.value);
                            else set.delete(opt.value);
                            field.onChange(Array.from(set));
                          }}
                        />
                        <span>{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
              ) : (
                <RadioGroup
                  value={(field.value as string) ?? ""}
                  onValueChange={field.onChange}
                  className="space-y-1"
                >
                  {question.options.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2">
                      <RadioGroupItem value={opt.value} />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </RadioGroup>
              )
            ) : null}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
