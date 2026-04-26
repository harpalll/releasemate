import path from "path";
import express from "express";
import cors from "cors";
import { config } from "./config";
import releaseRoutes from "./routes/release.routes";
import { errorHandler } from "./middleware/error-handler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/releases", releaseRoutes);

const publicDir = path.join(import.meta.dir, "..", "public");
app.use(express.static(publicDir));
app.get("*", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

export default app;
