// backend/controllers/projectController.js
import prisma from '../lib/prisma.js';

export const createProject = async (req, res) => {
  try {
    const { title, description, tags, techStack, maxTeamSize, status, creatorId } = req.body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        tags,
        techStack,
        maxTeamSize,
        status,
        creatorId,
      },
      include: {
        creator: true
      }
    });

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    // Check for database connection error
    if (error.message && (error.message.includes('connect to the database') || 
        error.message.includes("Can't reach database server") || 
        error.constructor.name === 'PrismaClientInitializationError')) {
      return res.status(503).json({ error: 'Database connection failed. Please ensure PostgreSQL is running.' });
    }
    res.status(500).json({ error: 'Failed to create project' });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        creator: true
      }
    });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Check for database connection error
    if (error.message && (error.message.includes('connect to the database') || 
        error.message.includes("Can't reach database server") || 
        error.constructor.name === 'PrismaClientInitializationError')) {
      return res.status(503).json({ error: 'Database connection failed. Please ensure PostgreSQL is running.' });
    }
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
    // Check for database connection error
    if (error.message && (error.message.includes('connect to the database') || 
        error.message.includes("Can't reach database server") || 
        error.constructor.name === 'PrismaClientInitializationError')) {
      return res.status(503).json({ error: 'Database connection failed. Please ensure PostgreSQL is running.' });
    }
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};