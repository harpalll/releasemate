import type {
  Release,
  CreateReleasePayload,
  UpdateReleasePayload,
} from "../types/release";

const BASE = "/api/releases";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const releasesApi = {
  list: () => request<Release[]>(BASE),

  get: (id: string) => request<Release>(`${BASE}/${id}`),

  create: (data: CreateReleasePayload) =>
    request<Release>(BASE, { method: "POST", body: JSON.stringify(data) }),

  update: (id: string, data: UpdateReleasePayload) =>
    request<Release>(`${BASE}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    request<void>(`${BASE}/${id}`, { method: "DELETE" }),
};
