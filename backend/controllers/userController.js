
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// GET /api/users?stack=react,node&page=1&limit=10
export const getAllUsers = async (req, res) => {
  try {
    const { stack, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const take = parseInt(limit);

    let users;

    if (stack) {
      const skillsArray = stack.split(",").map((s) => s.trim().toLowerCase());

      users = await prisma.user.findMany({
        where: {
          skills: {
            some: {
              skill: {
                name: {
                  in: skillsArray,
                  mode: "insensitive", // case-insensitive match
                },
              },
            },
          },
        },
        include: { skills: { include: { skill: true } } },
        skip,
        take,
      });
    } else {
      users = await prisma.user.findMany({
        include: { skills: { include: { skill: true } } },
        skip,
        take,
      });
    }

    res.json(users);
  } catch (err) {
    console.error("❌ Error in getAllUsers:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// GET /api/users/:id
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { skills: { include: { skill: true } } },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Error in getUserById:", err);
    res.status(500).json({ error: "Error fetching user" });
  }
};

// POST /api/users
export const createOrUpdateUser = async (req, res) => {
  const {
    clerkId,
    name,
    email,
    bio,
    githubUrl,
    portfolioUrl,
    availability,
    skills, // Array of objects: [{ skillId, level }]
  } = req.body;

  if (!clerkId || !email) {
    return res.status(400).json({ error: "clerkId and email are required" });
  }

  try {
    const user = await prisma.user.upsert({
      where: { clerkId },
      update: {
        name,
        email,
        bio,
        githubUrl,
        portfolioUrl,
        availability,
        // Optionally update skills here too if needed
      },
      create: {
        clerkId,
        name,
        email,
        bio,
        githubUrl,
        portfolioUrl,
        availability,
        skills: {
          create:
            skills?.map((skill) => ({
              skillId: skill.skillId,
              level: skill.level,
            })) || [],
        },
      },
      include: { skills: { include: { skill: true } } },
    });

    res.json(user);
  } catch (err) {
    console.error("❌ Error in createOrUpdateUser:", err);
    res.status(500).json({ error: "Failed to create or update user" });
  }
};

