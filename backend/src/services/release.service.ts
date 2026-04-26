import { releaseRepository } from "../repositories/release.repository";

export const releaseService = {
  getAll() {
    return releaseRepository.findAll();
  },

  getById(id: string) {
    return releaseRepository.findById(id);
  },

  create(data: { name: string; date: string; additionalInfo?: string }) {
    return releaseRepository.create({
      name: data.name,
      date: new Date(data.date),
      additionalInfo: data.additionalInfo ?? null,
    });
  },

  async update(
    id: string,
    data: {
      name?: string;
      date?: string;
      additionalInfo?: string;
      completedSteps?: number[];
    },
  ) {
    try {
      return await releaseRepository.update(id, {
        ...(data.name !== undefined && { name: data.name }),
        ...(data.date !== undefined && { date: new Date(data.date) }),
        ...(data.additionalInfo !== undefined && {
          additionalInfo: data.additionalInfo,
        }),
        ...(data.completedSteps !== undefined && {
          completedSteps: data.completedSteps,
        }),
      });
    } catch (err: unknown) {
      if (isPrismaNotFound(err)) return null;
      throw err;
    }
  },

  async delete(id: string) {
    try {
      await releaseRepository.delete(id);
      return true;
    } catch (err: unknown) {
      if (isPrismaNotFound(err)) return null;
      throw err;
    }
  },
};

function isPrismaNotFound(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as { code: string }).code === "P2025"
  );
}
