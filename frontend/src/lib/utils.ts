import type { Release, ReleaseStatus } from "../types/release";
import { RELEASE_STEPS } from "./constants";

export function getStatus(completedSteps: number[]): ReleaseStatus {
  if (completedSteps.length === 0) return "planned";
  if (completedSteps.length === RELEASE_STEPS.length) return "done";
  return "ongoing";
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getStatusFromRelease(release: Release): ReleaseStatus {
  return getStatus(release.completedSteps);
}
