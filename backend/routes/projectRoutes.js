import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  showInterest,
  getMyProjects,
  updateProjectInviteStatus,
  inviteCollaborators,
  acceptInterest,
} from "../controllers/projectController.js";
import { verifyFirebaseToken } from "../middleware/firebaseAuth.js";
const router = express.Router();
// Routes
router.post("/", verifyFirebaseToken, createProject); // ✅ Create new project
router.get("/mine", verifyFirebaseToken, getMyProjects); // ✅ My projects (must come before /:id)
router.get("/", getAllProjects); // ✅ Explore projects
router.get("/:id", getProjectById); // ✅ Get single project by ID
router.post("/:projectId/interest", showInterest); // ✅ Show interest
router.patch("/:id", updateProjectInviteStatus); // ✅ Update invite status
router.post("/:id/invite", verifyFirebaseToken, inviteCollaborators); // ✅ Invite collaborators
router.post("/accept-interest", verifyFirebaseToken, acceptInterest);

export default router;
