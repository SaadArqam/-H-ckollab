// backend/controllers/userController.js
import prisma from "../lib/prisma.js";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const { stack, page = 1, limit = 0 } = req.query;
    let where = {};

    if (stack) {
      const skillNames = stack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (skillNames.length > 0) {
        where = {
          ...where,
          skills: {
            some: {
              skill: {
                name: { in: skillNames },
              },
            },
          },
        };
      }
    }

    const take = parseInt(limit, 10) > 0 ? parseInt(limit, 10) : undefined;
    const skip = take ? (parseInt(page, 10) - 1) * take : undefined;

    const users = await prisma.user.findMany({
      where,
      include: {
        skills: {
          include: { skill: true },
        },
      },
      ...(take && { take }),
      ...(skip && { skip }),
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    if (
      error.message &&
      (error.message.includes("connect to the database") ||
        error.message.includes("Can't reach database server") ||
        error.constructor.name === "PrismaClientInitializationError")
    ) {
      return res.status(503).json({
        error: "Database connection failed. Please ensure PostgreSQL is running.",
      });
    }
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get user by Firebase UID
export const getUserByFirebaseUid = async (req, res) => {
  const { firebaseUid } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { firebaseUid },
      include: {
        skills: {
          include: { skill: true },
        },
        projects: true,
      },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user by Firebase UID:", err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { firebaseUid, name, email, ...rest } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { firebaseUid } });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });
    const user = await prisma.user.create({
      data: { firebaseUid, name, email, ...rest },
    });
    res.status(201).json(user);
  } catch (err) {
    console.error('❌ Error in createUser:', err);
    res.status(500).json({ error: err.message });
  }
};

// Update or create user by Firebase UID
export const updateUserByFirebaseUid = async (req, res) => {
  const { firebaseUid } = req.params;
  const {
    name,
    email,
    bio,
    githubUrl,
    portfolioUrl,
    availability,
    academicYear,
    branch,
    interests,
    skills = [],
  } = req.body;

  try {
    // Validate and prepare skill relations
    const skillRelations = [];

    for (const skillObj of skills) {
      const skillName = skillObj.skillId?.trim();
      const level = skillObj.level || "Beginner";

      if (!skillName) continue;

      const existingSkill = await prisma.skill.findUnique({
        where: { name: skillName },
      });

      if (existingSkill) {
        skillRelations.push({
          skillId: existingSkill.id,
          level,
        });
      }
    }

    const user = await prisma.user.upsert({
      where: { firebaseUid },
      update: {
        name,
        email,
        bio,
        githubUrl,
        portfolioUrl,
        availability,
        academicYear,
        branch,
        interests,
        skills: {
          deleteMany: {}, // remove existing first
          create: skillRelations,
        },
      },
      create: {
        firebaseUid,
        name,
        email,
        bio,
        githubUrl,
        portfolioUrl,
        availability,
        academicYear,
        branch,
        interests,
        skills: {
          create: skillRelations,
        },
      },
    });

    res.json(user);
  } catch (err) {
    console.error("❌ Error in updateUserByFirebaseUid:", err);
    res.status(500).json({ error: err.message });
  }
};
