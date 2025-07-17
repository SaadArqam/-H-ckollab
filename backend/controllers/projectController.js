import prisma from "../lib/prisma.js";

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
    } = req.body;
    const { collaborationType, inviteStatus } = req.body;

    const user = req.user; // set by verifyFirebaseToken

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }
    if (!collaborationType || typeof collaborationType !== 'string' || !collaborationType.trim()) {
      return res.status(400).json({ error: "collaborationType is required and must not be empty" });
    }

    console.log("🔥 Decoded Firebase UID:", user?.uid);

    // Fetch the user from the DB using firebaseUid
    let dbUser = await prisma.user.findUnique({ where: { firebaseUid: user.uid } });
    if (!dbUser || !dbUser.id) {
      console.log(`[createProject] User with firebaseUid ${user.uid} not found. Creating user.`);
      dbUser = await prisma.user.create({ data: { id: user.uid, firebaseUid: user.uid } });
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
        creator: {
          connect: { id: dbUser.id },
        },
        collaborationType,
        inviteStatus: inviteStatus || "Pending",
      },
      include: { creator: true },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("❌ Error creating project:", error); // Log full error object
    if (error.message?.includes("connect to the database")) {
      return res.status(503).json({
        error:
          "Database connection failed. Please ensure PostgreSQL is running.",
      });
    }
    res
      .status(500)
      .json({ error: error.message || "Failed to create project" });
  }
};

// Get all public projects (Explore)
export const getAllProjects = async (req, res) => {
  try {
    const { tech, tags, difficulty } = req.query;

    const filters = {
      visibility: "Open to All",
      ...(tech && { techStack: { hasSome: tech.split(",") } }),
      ...(tags && { tags: { hasSome: tags.split(",") } }),
      ...(difficulty && { difficulty }),
    };

    const projects = await prisma.project.findMany({
      where: filters,
      include: { creator: true },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error("❌ Error fetching projects:", error.message);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

// Get project by ID
export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        creator: true,
        interestedUsers: true,
      },
    });

    if (!project) return res.status(404).json({ error: "Project not found" });

    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

// Show interest in a project
export const showInterest = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;

    const project = await prisma.project.update({
      where: { id: projectId },
      data: {
        interestedUsers: {
          connect: { id: userId },
        },
      },
    });

    res.status(200).json(project);
  } catch (error) {
    console.error("❌ Error showing interest:", error);
    res.status(500).json({ error: "Failed to show interest in project" });
  }
};

// Get projects created by current user
export const getMyProjects = async (req, res) => {
  try {
    // Use Firebase UID from authenticated user
    console.log("[getMyProjects] req.user:", req.user);
    const firebaseUid = req.user?.uid;
    console.log("[getMyProjects] Firebase UID:", firebaseUid);
    if (!firebaseUid) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await prisma.user.findUnique({ where: { firebaseUid } });
    console.log("[getMyProjects] DB User:", user);
    if (!user) return res.status(404).json({ error: "User not found" });
    const projects = await prisma.project.findMany({
      where: { creatorId: user.id },
      include: { creator: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(projects);
  } catch (error) {
    console.error("Error fetching my projects:", error);
    res.status(500).json({ error: "Failed to fetch user projects" });
  }
};

// ✅ Update invite status of a project
export const updateProjectInviteStatus = async (req, res) => {
  const { id } = req.params;
  const { inviteStatus } = req.body;

  try {
    const updated = await prisma.project.update({
      where: { id },
      data: { inviteStatus },
    });

    res.json(updated);
  } catch (error) {
    console.error("Error updating invite status:", error);
    res.status(500).json({ error: "Failed to update invite status" });
  }
};

// Get user by Firebase UID (used if not using Clerk)
export const getUserByFirebaseUid = async (req, res) => {
  try {
    const { firebaseUid } = req.params;
    const user = await prisma.user.findUnique({ where: { firebaseUid } });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Invite collaborators to a project
// Invite collaborators to a project
export const inviteCollaborators = async (req, res) => {
  const { id } = req.params; // projectId
  const { userIds, role } = req.body;

  if (!Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).json({ error: "No users selected for invite" });
  }

  try {
    const invites = await Promise.all(
      userIds.map(async (userId) => {
        return await prisma.invite.create({
          data: {
            projectId: id,
            senderId: req.user.id,
            receiverId: userId,
            role,
            status: "pending",
          },
        });
      })
    );

    res.status(201).json({ message: "Invites sent", invites });
  } catch (err) {
    console.error("❌ Failed to send invites:", err);
    res.status(500).json({ error: "Failed to send invites" });
  }
};
