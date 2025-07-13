import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "./.env") });

import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import inviteRoutes from "./routes/inviteRoutes.js";
import interestRoutes from "./routes/interestRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/invites", inviteRoutes);
app.use("/api/interests", interestRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Hackollab API is running!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
