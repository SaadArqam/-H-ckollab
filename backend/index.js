import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "./.env") });

import express from "express";
import cors from "cors";

// Routes
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import inviteRoutes from "./routes/inviteRoutes.js";
import interestRoutes from "./routes/interestRoutes.js";
import hackathonRoutes from "./routes/hackathonRoutes.js"; 

const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS setup
const allowedOrigins = [
  "http://localhost:3000",
  "https://h-ckollab.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Request logger
app.use((req, res, next) => {
  console.log(`➡️  Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

// Route bindings
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/invites", inviteRoutes);
app.use("/api/interests", interestRoutes);
app.use("/api/hackathons", hackathonRoutes); 

// Error handler (must be after all routes)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// Fallback for undefined routes
app.use((req, res) => {
  console.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ error: "Route not found" });
});

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Hackollab API is running!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
