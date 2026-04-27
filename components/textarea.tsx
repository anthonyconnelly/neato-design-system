import type { TextareaHTMLAttributes } from "react";

import { cn } from "../utils/utils";
import { FieldChrome, fieldClasses, fieldErrorClasses, type SharedFieldProps } from "./field";

export function Textarea({ label, helpText, error, className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & SharedFieldProps) {
  return (
    <FieldChrome label={label} helpText={helpText} error={error}>
      <textarea className={cn(fieldClasses, "min-h-24 resize-y", error && fieldErrorClasses, className)} {...props} />
    </FieldChrome>
  );
}
