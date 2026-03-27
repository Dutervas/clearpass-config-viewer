interface FieldRowProps {
  label: string;
  value: string;
}

export function FieldRow({ label, value }: FieldRowProps) {
  return (
    <div className="flex gap-3 py-2">
      <span className="font-semibold text-secondary-foreground min-w-[180px]">
        {label}:
      </span>
      <span className="text-foreground">{value || "—"}</span>
    </div>
  );
}
