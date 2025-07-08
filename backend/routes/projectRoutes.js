import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  showInterest,
  getMyProjects,
  updateProjectInviteStatus,
  inviteCollaborators,
} from "../controllers/projectController.js";
import { verifyFirebaseToken } from "../middleware/firebaseAuth.js";

const router = express.Router();

// Routes
router.post("/", verifyFirebaseToken, createProject); // ✅ Create new project
router.get("/", getAllProjects); // ✅ Explore projects
router.get("/:id", getProjectById); // ✅ Get single project by ID

router.post("/:projectId/interest", showInterest); // ✅ Show interest
router.get("/my-projects/:clerkId", getMyProjects); // ✅ My projects
router.patch("/:id", updateProjectInviteStatus); // ✅ Update invite status

router.post("/:id/invite", verifyFirebaseToken, inviteCollaborators); // ✅ Invite collaborators

export default router;
