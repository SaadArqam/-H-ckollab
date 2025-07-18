import express from "express";
import { createHackathon, getAllHackathons } from "../controllers/hackathonController.js";
import { verifyFirebaseToken } from "../middleware/firebaseAuth.js";

const router = express.Router();

router.post("/", verifyFirebaseToken, createHackathon);
router.get("/", getAllHackathons);

export default router;
