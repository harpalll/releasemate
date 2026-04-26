import { forwardRef, useId, type TextareaHTMLAttributes } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  function Textarea({ label, error, className = "", ...rest }, ref) {
    const generatedId = useId();
    const inputId = rest.id ?? generatedId;
    return (
      <div className={className}>
        <label
          htmlFor={inputId}
          className="mb-1 block text-sm font-medium text-text"
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          rows={4}
          className={`w-full rounded-lg border px-3 py-2 text-sm text-text placeholder:text-text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y ${
            error ? "border-red-400" : "border-border"
          }`}
          {...rest}
        />
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);
