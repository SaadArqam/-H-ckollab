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
    
    console.log('User data fetched:', user);
    console.log('Featured projects:', user.featuredProjects);
    
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
    projects = [],
  } = req.body;

  console.log('Received update request for firebaseUid:', firebaseUid);
  console.log('Projects data received:', projects);
  console.log('Skills data received:', skills);

  try {
    // Validate and prepare skill relations
    const skillRelations = [];
    const seenSkillIds = new Set();

    for (const skillObj of skills) {
      const skillName = skillObj.skillId?.trim();
      const level = skillObj.level || "Beginner";

      if (!skillName || seenSkillIds.has(skillName)) continue;
      seenSkillIds.add(skillName);

      console.log('Processing skill:', skillName, 'with level:', level);

      // Find or create the skill
      let skill = await prisma.skill.findUnique({
        where: { name: skillName },
      });

      if (!skill) {
        console.log('Creating new skill:', skillName);
        skill = await prisma.skill.create({
          data: { name: skillName },
        });
      }

      skillRelations.push({
        skillId: skill.id,
        level,
      });
    }

    console.log('Final skill relations:', skillRelations);

    // Filter out empty projects
    const filteredProjects = projects.filter(
      (project) =>
        project.title?.trim() !== "" ||
        project.tech?.trim() !== "" ||
        project.link?.trim() !== ""
    );

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
        featuredProjects: filteredProjects,
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
        featuredProjects: filteredProjects,
        skills: {
          create: skillRelations,
        },
      },
      include: {
        skills: {
          include: { skill: true },
        },
      },
    });

    console.log('User updated/created with skills:', user.skills);
    res.json(user);
  } catch (err) {
    console.error("❌ Error in updateUserByFirebaseUid:", err);
    res.status(500).json({ error: err.message });
  }
};
    