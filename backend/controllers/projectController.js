// backend/controllers/projectController.js
import prisma from '../lib/prisma.js';

export const createProject = async (req, res) => {
  try {
    const { title, description, tags, techStack, maxTeamSize, status, creatorId } = req.body;

    // ✅ Find the user using clerkId instead of id
    const user = await prisma.user.findUnique({
      where: { clerkId: creatorId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found for the provided Clerk ID' });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        tags,
        techStack,
        maxTeamSize,
        status,
        creator: {
          connect: { id: user.id }, // ✅ Use the actual Prisma ID now
        },
      },
      include: {
        creator: true
      }
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('❌ Error creating project:', error.message);
    console.error(error); // Full stack trace

    if (
      error.message &&
      (error.message.includes('connect to the database') ||
        error.message.includes("Can't reach database server") ||
        error.constructor.name === 'PrismaClientInitializationError')
    ) {
      return res.status(503).json({ error: 'Database connection failed. Please ensure PostgreSQL is running.' });
    }

    res.status(500).json({ error: error.message || 'Failed to create project' });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        creator: true, // Only works if relation is correctly defined
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error('❌ Error fetching projects:', error.message);
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const getProjectById = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        creator: true
      }
    });

    if (!project) return res.status(404).json({ error: 'Project not found' });

    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    if (error.message && (error.message.includes('connect to the database') ||
      error.message.includes("Can't reach database server") ||
      error.constructor.name === 'PrismaClientInitializationError')) {
      return res.status(503).json({ error: 'Database connection failed. Please ensure PostgreSQL is running.' });
    }
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};
export const getUserByClerkId = async (req, res) => {
  try {
    const { clerkId } = req.params;
    const user = await prisma.user.findUnique({ where: { clerkId } });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
