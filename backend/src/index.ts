import express from "express";
import cors from "cors";
import { config } from "./config";
import releaseRoutes from "./routes/release.routes";
import { errorHandler } from "./middleware/error-handler";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/releases", releaseRoutes);

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

export default app;
