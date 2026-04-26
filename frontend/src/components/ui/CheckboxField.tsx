interface Props {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CheckboxField({ label, checked, onChange }: Props) {
  const id = label.toLowerCase().replace(/\s+/g, "-").slice(0, 40);
  return (
    <label
      htmlFor={id}
      className="flex items-start gap-3 py-2 cursor-pointer select-none"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-border text-primary accent-primary cursor-pointer"
      />
      <span
        className={`text-sm leading-snug ${checked ? "text-text-muted line-through" : "text-text"}`}
      >
        {label}
      </span>
    </label>
  );
}
