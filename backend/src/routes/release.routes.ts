import { Router } from "express";
import { releaseController } from "../controllers/release.controller";

const router = Router();

router.get("/", releaseController.list);
router.get("/:id", releaseController.get);
router.post("/", releaseController.create);
router.patch("/:id", releaseController.update);
router.delete("/:id", releaseController.delete);

export default router;
