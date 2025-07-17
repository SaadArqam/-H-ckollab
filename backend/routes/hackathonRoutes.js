const express = require("express");
const router = express.Router();
const {
  createHackathon,
  getAllHackathons,
} = require("../controllers/hackathonController");
const authenticate = require("../middleware/firebaseAuth");

router.post("/", authenticate, createHackathon);
router.get("/", getAllHackathons);

module.exports = router;
