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
      creatorId,
    } = req.body;

    const user = await prisma.user.findUnique({
      where: { clerkId: creatorId },
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found for the provided Clerk ID" });
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
        inviteStatus: "Pending",
        creator: { connect: { id: user.id } },
      },
      include: { creator: true },
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("❌ Error creating project:", error.message);
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
          connect: { id: userId }
        }
      }
    });

    res.status(200).json(project);
  } catch (error) {
    console.error("❌ Error showing interest:", error);
    res.status(500).json({ error: "Failed to show interest in project" });
  }
};

// Get projects created by current user
export const getMyProjects = async (req, res) => {
  const { clerkId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const projects = await prisma.project.findMany({
      where: { creatorId: user.id },
      include: { creator: true },
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

// Optional helper
export const getUserByClerkId = async (req, res) => {
  try {
    const { clerkId } = req.params;
    const user = await prisma.user.findUnique({ where: { clerkId } });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
