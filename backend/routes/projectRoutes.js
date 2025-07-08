import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  showInterest,
  getMyProjects,
  updateProjectInviteStatus, // ✅
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", createProject); // Create new project
router.get("/", getAllProjects); // Explore page
router.get("/:id", getProjectById); // Single project
router.post('/:projectId/interest', showInterest);
router.get("/my-projects/:clerkId", getMyProjects); // My projects
router.patch("/:id", updateProjectInviteStatus); // ✅ Update invite status

export default router;
