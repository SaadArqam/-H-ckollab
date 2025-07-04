// backend/controllers/projectController.js
import prisma from '../lib/prisma.js';

export const createProject = async (req, res) => {
  try {
    const { title, description, tags, techStack, maxTeamSize, status, creatorId, collaborationType } = req.body;

    // Use creatorId directly (Prisma user.id)
    const user = await prisma.user.findUnique({ where: { id: creatorId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found for the provided user ID' });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description,
        tags,
        techStack,
        maxTeamSize,
        status,
        collaborationType,
        creator: {
          connect: { id: creatorId },
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

export const getUserByFirebaseUid = async (req, res) => {
  try {
    const { firebaseUid } = req.params;
    const user = await prisma.user.findUnique({ where: { firebaseUid } });

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const inviteCollaborators = async (req, res) => {
  const { id } = req.params; // projectId
  const { userIds } = req.body;
  if (!Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).json({ error: 'No users selected for invitation' });
  }
  try {
    const invitations = await Promise.all(userIds.map(async (userId) => {
      return await prisma.invitation.create({
        data: {
          projectId: id,
          userId,
          status: 'Pending',
        },
      });
    }));
    res.status(201).json({ message: 'Invitations sent', invitations });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send invitations' });
  }
};
