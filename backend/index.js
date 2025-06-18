require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { body, validationResult, param, query } = require("express-validator");

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// Validation error handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: "Validation failed",
      details: errors.array()
    });
  }
  next();
};

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : "Something went wrong"
  });
});

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    res.status(500).json({ status: "error", database: "disconnected" });
  }
});

// API documentation endpoint
app.get("/api", (req, res) => {
  res.json({
    message: "H@ckollab API",
    version: "1.0.0",
    endpoints: {
      users: "GET /api/users, POST /api/users, GET /api/users/:id, PUT /api/users/:id",
      projects: "GET /api/projects, POST /api/projects, GET /api/projects/:id, PUT /api/projects/:id",
      skills: "GET /api/skills, POST /api/skills",
      search: "GET /api/search?q=:query&type=:type"
    }
  });
});

// User routes
app.get("/api/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        skills: {
          include: {
            skill: true
          }
        },
        ownedProjects: {
          include: {
            members: true,
            skills: {
              include: {
                skill: true
              }
            }
          }
        }
      }
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        skills: {
          include: {
            skill: true
          }
        },
        ownedProjects: {
          include: {
            members: true,
            skills: {
              include: {
                skill: true
              }
            }
          }
        },
        projectMembers: {
          include: {
            project: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { clerkId, email, firstName, lastName, ...userData } = req.body;
    
    const user = await prisma.user.create({
      data: {
        clerkId,
        email,
        firstName,
        lastName,
        ...userData
      }
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Project routes
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        owner: true,
        members: {
          include: {
            user: true
          }
        },
        skills: {
          include: {
            skill: true
          }
        }
      }
    });
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

app.get("/api/projects/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        owner: true,
        members: {
          include: {
            user: true
          }
        },
        skills: {
          include: {
            skill: true
          }
        },
        invites: {
          include: {
            user: true
          }
        }
      }
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    const { ownerId, title, description, skills, ...projectData } = req.body;
    
    const project = await prisma.project.create({
      data: {
        ownerId,
        title,
        description,
        ...projectData,
        skills: skills ? {
          create: skills.map(skillId => ({
            skillId
          }))
        } : undefined
      },
      include: {
        owner: true,
        skills: {
          include: {
            skill: true
          }
        }
      }
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// Skills routes
app.get("/api/skills", async (req, res) => {
  try {
    const skills = await prisma.skill.findMany({
      include: {
        _count: {
          select: {
            userSkills: true,
            projectSkills: true
          }
        }
      }
    });
    res.json(skills);
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

app.post("/api/skills", async (req, res) => {
  try {
    const { name, category, description } = req.body;
    
    const skill = await prisma.skill.create({
      data: {
        name,
        category,
        description
      }
    });

    res.status(201).json(skill);
  } catch (error) {
    console.error("Error creating skill:", error);
    res.status(500).json({ error: "Failed to create skill" });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API Documentation available at: http://localhost:${PORT}/api`);
});

module.exports = app;
