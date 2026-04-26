import type { Request, Response } from "express";
import { z } from "zod";
import { releaseService } from "../services/release.service";

const dateString = z.string().refine((val) => !isNaN(Date.parse(val)), {
  message: "Invalid date format",
});

const createSchema = z.object({
  name: z.string().min(1),
  date: dateString,
  additionalInfo: z.string().optional(),
});

const updateSchema = z
  .object({
    name: z.string().min(1).optional(),
    date: dateString.optional(),
    additionalInfo: z.string().optional(),
    completedSteps: z.array(z.number().int().min(0)).optional(),
  })
  .refine((obj) => Object.values(obj).some((v) => v !== undefined), {
    message: "At least one field is required",
  });

export const releaseController = {
  async list(_req: Request, res: Response) {
    const releases = await releaseService.getAll();
    res.json(releases);
  },

  async get(req: Request, res: Response) {
    const release = await releaseService.getById(req.params.id);
    if (!release) {
      res.status(404).json({ error: "Release not found" });
      return;
    }
    res.json(release);
  },

  async create(req: Request, res: Response) {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Validation failed", details: parsed.error.format() });
      return;
    }
    const release = await releaseService.create(parsed.data);
    res.status(201).json(release);
  },

  async update(req: Request, res: Response) {
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Validation failed", details: parsed.error.format() });
      return;
    }
    const release = await releaseService.update(req.params.id, parsed.data);
    if (!release) {
      res.status(404).json({ error: "Release not found" });
      return;
    }
    res.json(release);
  },

  async delete(req: Request, res: Response) {
    const result = await releaseService.delete(req.params.id);
    if (!result) {
      res.status(404).json({ error: "Release not found" });
      return;
    }
    res.status(204).send();
  },
};
