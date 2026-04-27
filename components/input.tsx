import type { InputHTMLAttributes } from "react";

import { cn } from "../utils/utils";
import { FieldChrome, fieldClasses, fieldErrorClasses, type SharedFieldProps } from "./field";

export function Input({ label, helpText, error, className, ...props }: InputHTMLAttributes<HTMLInputElement> & SharedFieldProps) {
  return (
    <FieldChrome label={label} helpText={helpText} error={error}>
      <input className={cn(fieldClasses, error && fieldErrorClasses, className)} {...props} />
    </FieldChrome>
  );
}
