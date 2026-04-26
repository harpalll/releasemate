import type { ReleaseStatus } from "../../types/release";

const config: Record<ReleaseStatus, { bg: string; text: string; label: string }> = {
  planned: { bg: "bg-status-planned/15", text: "text-status-planned", label: "Planned" },
  ongoing: { bg: "bg-status-ongoing/15", text: "text-status-ongoing", label: "Ongoing" },
  done: { bg: "bg-status-done/15", text: "text-status-done", label: "Done" },
};

export function StatusBadge({ status }: { status: ReleaseStatus }) {
  const c = config[status];
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${c.bg} ${c.text}`}
    >
      {c.label}
    </span>
  );
}
