import prisma from "../lib/prisma.js";

// Get all users with optional skill stack filter
export const getUsers = async (req, res) => {
  try {
    console.log('📦 Fetching all users...');
    const { stack, page = 1, limit = 0 } = req.query;
    let where = {};

    if (stack) {
      const skillNames = stack.split(",").map((s) => s.trim()).filter(Boolean);
      if (skillNames.length > 0) {
        where.skills = {
          some: {
            skill: {
              name: { in: skillNames },
            },
          },
        };
      }
    }

    const take = parseInt(limit, 10) || undefined;
    const skip = take ? (parseInt(page, 10) - 1) * take : undefined;

    const users = await prisma.user.findMany({
      where,
      include: {
        skills: { include: { skill: true } },
      },
      ...(take && { take }),
      ...(skip && { skip }),
    });
    console.log('✅ Users found:', users.length);

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    if (
      error.message?.includes("connect to the database") ||
      error.message?.includes("Can't reach database server") ||
      error.constructor.name === "PrismaClientInitializationError"
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
        skills: { include: { skill: true } },
        projects: true,
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Error fetching user by Firebase UID:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  let { firebaseUid, name, email, skills = [], featuredProjects = [], projects, ...rest } = req.body;
  skills = skills.filter((s) => s.skillId?.trim());

  try {
    const existingUser = await prisma.user.findUnique({ where: { firebaseUid } });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const skillRelations = [];
    const seenSkillIds = new Set();

    for (const s of skills) {
      const skillName = s.skillId.trim();
      const level = s.level || "Beginner";
      if (seenSkillIds.has(skillName)) continue;
      seenSkillIds.add(skillName);

      let skill = await prisma.skill.findUnique({ where: { name: skillName } });
      if (!skill) {
        skill = await prisma.skill.create({ data: { name: skillName } });
      }

      skillRelations.push({ skillId: skill.id, level });
    }

    const userData = {
      firebaseUid,
      name,
      email,
      featuredProjects,
      ...rest,
      ...(skillRelations.length > 0 && { skills: { create: skillRelations } }),
    };

    // Final safeguard: remove projects if present
    delete userData.projects;

    console.log("userData being sent to Prisma:", userData);
    // Final destructure to ensure 'projects' is not present
    const { projects: _removed, ...userDataSafe } = userData;
    const user = await prisma.user.create({ data: userDataSafe });

    res.status(201).json(user);
  } catch (err) {
    console.error("❌ Error in createUser:", err);
    res.status(500).json({ error: err.message });
  }
};

// Update or create user by Firebase UID
export const updateUserByFirebaseUid = async (req, res) => {
  const { firebaseUid } = req.params;
  let {
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
    featuredProjects = [],
  } = req.body;

  skills = skills.filter((s) => s.skillId?.trim());

  try {
    const skillRelations = [];
    const seenSkillIds = new Set();

    for (const s of skills) {
      const skillName = s.skillId.trim();
      const level = s.level || "Beginner";
      if (seenSkillIds.has(skillName)) continue;
      seenSkillIds.add(skillName);

      let skill = await prisma.skill.findUnique({ where: { name: skillName } });
      if (!skill) {
        skill = await prisma.skill.create({ data: { name: skillName } });
      }

      skillRelations.push({ skillId: skill.id, level });
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
        featuredProjects,
        skills: {
          deleteMany: {},
          ...(skillRelations.length > 0 && { create: skillRelations }),
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
        featuredProjects,
        ...(skillRelations.length > 0 && { skills: { create: skillRelations } }),
      },
      include: {
        skills: { include: { skill: true } },
      },
    });

    res.json(user);
  } catch (err) {
    console.error("❌ Error in updateUserByFirebaseUid:", err);
    res.status(500).json({ error: err.message });
  }
};
