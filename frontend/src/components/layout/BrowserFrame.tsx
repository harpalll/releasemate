import type { ReactNode } from "react";

export function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-4xl rounded-2xl bg-surface shadow-lg overflow-hidden">
      <div className="flex items-center gap-2 bg-[#e8ebf0] px-4 py-3" aria-hidden="true">
        <span className="h-3 w-3 rounded-full bg-[#c4c9d4]" />
        <span className="h-3 w-3 rounded-full bg-[#c4c9d4]" />
        <span className="h-3 w-3 rounded-full bg-[#c4c9d4]" />
      </div>
      <div className="p-6 md:p-10">{children}</div>
    </div>
  );
}
