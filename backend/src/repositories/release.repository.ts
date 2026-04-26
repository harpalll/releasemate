import prisma from "../db";
import type { Prisma } from "../../generated/prisma/client";

export const releaseRepository = {
  findAll() {
    return prisma.release.findMany({ orderBy: { date: "desc" } });
  },

  findById(id: string) {
    return prisma.release.findUnique({ where: { id } });
  },

  create(data: Prisma.ReleaseCreateInput) {
    return prisma.release.create({ data });
  },

  update(id: string, data: Prisma.ReleaseUpdateInput) {
    return prisma.release.update({ where: { id }, data });
  },

  delete(id: string) {
    return prisma.release.delete({ where: { id } });
  },
};
