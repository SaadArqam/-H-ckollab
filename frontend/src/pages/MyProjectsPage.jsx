import { prisma } from "../prisma/index.js";

// Create Project
export const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      tags,
      techStack,
      maxTeamSize,
      status,
      difficulty,
      visibility,
      collaborationType,
      inviteStatus,
    } = req.body;

    const user = req.user; // set by verifyFirebaseToken middleware

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    if (
      !collaborationType ||
      typeof collaborationType !== "string" ||
      !collaborationType.trim()
    ) {
      return res.status(400).json({
        error: "collaborationType is required and must not be empty",
      });
    }

    console.log("🔥 Decoded Firebase UID:", user?.uid);

    // Fetch the user from the DB using firebaseUid
    let dbUser = await prisma.user.findUnique({
      where: { firebaseUid: user.uid },
    });

    if (!dbUser || !dbUser.id) {
      console.log(`[createProject] User with firebaseUid ${user.uid} not found. Creating user.`);
      dbUser = await prisma.user.create({
        data: {
          firebaseUid: user.uid,
          id: user.uid, // Optional: only use if Firebase UID is primary ID
        },
      });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        tags,
        techStack,
        maxTeamSize,
        status,
        difficulty,
        visibility,
        collaborationType,
        inviteStatus: inviteStatus || "Pending",
        creatorId: dbUser.id, // ✅ Add this
        creator: {
          connect: { id: dbUser.id },
        },
      },
      include: {
        creator: true,
      },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("❌ Error creating project:", error);
    if (error.message?.includes("connect to the database")) {
      return res.status(503).json({
        error:
          "Database connection failed. Please ensure PostgreSQL is running.",
      });
    }
    res.status(500).json({
      error: error.message || "Failed to create project",
    });
  }
};
