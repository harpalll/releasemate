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
    const existing = await releaseRepository.findById(id);
    if (!existing) return null;

    return releaseRepository.update(id, {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.date !== undefined && { date: new Date(data.date) }),
      ...(data.additionalInfo !== undefined && {
        additionalInfo: data.additionalInfo,
      }),
      ...(data.completedSteps !== undefined && {
        completedSteps: data.completedSteps,
      }),
    });
  },

  async delete(id: string) {
    const existing = await releaseRepository.findById(id);
    if (!existing) return null;
    await releaseRepository.delete(id);
    return true;
  },
};
