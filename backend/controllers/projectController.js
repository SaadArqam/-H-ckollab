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
      collaborationType,
      inviteStatus,
    } = req.body;

    const user = req.user; // set by verifyFirebaseToken

    if (!user) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    if (
      !collaborationType ||
      typeof collaborationType !== "string" ||
      !collaborationType.trim()
    ) {
      return res
        .status(400)
        .json({ error: "collaborationType is required and must not be empty" });
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
    console.error("❌ Error creating project:", error);
    if (error.message?.includes("connect to the database")) {
      return res.status(503).json({
        error: "Database connection failed. Please ensure PostgreSQL is running.",
      });
    }
    res.status(500).json({ error: error.message || "Failed to create project" });
  }
};

// PATCH /api/projects/:id - Edit project details
export const editProject = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return res.status(404).json({ error: "Project not found" });

    const dbUser = await prisma.user.findUnique({
      where: { firebaseUid: user.uid },
    });

    if (!dbUser || dbUser.id !== project.creatorId) {
      return res
        .status(403)
        .json({ error: "Unauthorized: Only project owner can edit" });
    }

    const allowedFields = [
      "title",
      "description",
      "tags",
      "techStack",
      "maxTeamSize",
      "status",
      "difficulty",
      "rolesNeeded",
      "deadline",
      "collaborationType",
      "visibility",
    ];

    const updateData = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    }

    const updated = await prisma.project.update({
      where: { id },
      data: updateData,
    });

    res.json(updated);
  } catch (error) {
    console.error("Error editing project:", error);
    res.status(500).json({ error: "Failed to edit project" });
  }
};

// PATCH /api/projects/:id/delete - Soft delete project
export const softDeleteProject = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return res.status(404).json({ error: "Project not found" });

    const dbUser = await prisma.user.findUnique({
      where: { firebaseUid: user.uid },
    });

    if (!dbUser || dbUser.id !== project.creatorId) {
      return res
        .status(403)
        .json({ error: "Unauthorized: Only project owner can delete" });
    }

    const updated = await prisma.project.update({
      where: { id },
      data: { isDeleted: true },
    });

    res.json({ message: "Project deleted (soft)", project: updated });
  } catch (error) {
    console.error("Error soft deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
};

// PATCH /api/projects/:id/archive - Archive/Mark as Full
export const archiveProject = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return res.status(404).json({ error: "Project not found" });

    const dbUser = await prisma.user.findUnique({
      where: { firebaseUid: user.uid },
    });

    if (!dbUser || dbUser.id !== project.creatorId) {
      return res
        .status(403)
        .json({ error: "Unauthorized: Only project owner can archive" });
    }

    const updated = await prisma.project.update({
      where: { id },
      data: { isOpen: false },
    });

    res.json({ message: "Project archived/marked as full", project: updated });
  } catch (error) {
    console.error("Error archiving project:", error);
    res.status(500).json({ error: "Failed to archive project" });
  }
};

// Get all public projects
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
      include: { creator: true, collaborators: true },
      orderBy: { createdAt: "desc" },
    });

    const projectsWithTeamSize = projects.map((p) => ({
      ...p,
      teamSize: p.collaborators.length,
      maxTeamSize: p.maxTeamSize,
    }));

    res.status(200).json(projectsWithTeamSize);
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
        interestedUsers: { select: { id: true, name: true, email: true } },
      },
    });

    if (!project) return res.status(404).json({ error: "Project not found" });

    const collaborators = await prisma.collaborator.findMany({
      where: { projectId: id },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    const collaboratorIds = collaborators.map((c) => c.userId);

    const pendingInterests = project.interestedUsers.filter(
      (user) => !collaboratorIds.includes(user.id)
    );

    const collaboratorsWithJoinMethod = collaborators.map((c) => ({
      id: c.user.id,
      name: c.user.name,
      email: c.user.email,
      joinedVia: c.joinedVia,
    }));

    res.json({
      ...project,
      pendingInterests,
      collaboratorsWithJoinMethod,
    });
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
    const firebaseUid = req.user?.uid;
    if (!firebaseUid) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({ where: { firebaseUid } });
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

// Update invite status of a project
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

// Get user by Firebase UID
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

// Accept a user's interest and add as collaborator
export const acceptInterest = async (req, res) => {
  try {
    const { projectId, userId } = req.body;
    // Add to Collaborator table with joinedVia: 'interest'
    await prisma.collaborator.create({
      data: {
        projectId,
        userId,
        joinedVia: "interest",
      },
    });
    res.status(201).json({ message: "User added as collaborator via interest." });
  } catch (error) {
    console.error("❌ Error accepting interest:", error);
    res.status(500).json({ error: "Failed to accept interest." });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return res.status(404).json({ error: "Project not found" });
    const dbUser = await prisma.user.findUnique({ where: { firebaseUid: user.uid } });
    if (!dbUser || dbUser.id !== project.creatorId) {
      return res.status(403).json({ error: "Unauthorized: Only project owner can delete" });
    }
    await prisma.project.delete({ where: { id } });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ error: "Failed to delete project" });
  }
};
