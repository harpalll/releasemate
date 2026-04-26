import { describe, it, expect } from "bun:test";
import { releaseService } from "../src/services/release.service";

describe("release service", () => {
  let createdId: string;

  it("creates a release", async () => {
    const release = await releaseService.create({
      name: "Test Release",
      date: "2025-01-15",
    });
    expect(release.name).toBe("Test Release");
    expect(release.completedSteps).toEqual([]);
    createdId = release.id;
  });

  it("lists all releases", async () => {
    const releases = await releaseService.getAll();
    expect(releases.length).toBeGreaterThan(0);
  });

  it("gets a release by id", async () => {
    const release = await releaseService.getById(createdId);
    expect(release).not.toBeNull();
    expect(release!.name).toBe("Test Release");
  });

  it("updates completed steps", async () => {
    const updated = await releaseService.update(createdId, {
      completedSteps: [0, 2, 4],
    });
    expect(updated!.completedSteps).toEqual([0, 2, 4]);
  });

  it("updates additional info", async () => {
    const updated = await releaseService.update(createdId, {
      additionalInfo: "Some notes",
    });
    expect(updated!.additionalInfo).toBe("Some notes");
  });

  it("deletes a release", async () => {
    const result = await releaseService.delete(createdId);
    expect(result).toBe(true);
  });

  it("returns null for non-existent release", async () => {
    const release = await releaseService.getById("non-existent-id");
    expect(release).toBeNull();
  });
});
