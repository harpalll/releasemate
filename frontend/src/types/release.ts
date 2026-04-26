export interface Release {
  id: string;
  name: string;
  date: string;
  additionalInfo: string;
  completedSteps: number[];
  createdAt: string;
  updatedAt: string;
}

export type ReleaseStatus = "planned" | "ongoing" | "done";

export interface CreateReleasePayload {
  name: string;
  date: string;
  additionalInfo?: string;
}

export interface UpdateReleasePayload {
  name?: string;
  date?: string;
  additionalInfo?: string;
  completedSteps?: number[];
}
