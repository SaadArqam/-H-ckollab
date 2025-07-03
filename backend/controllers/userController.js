// backend/controllers/userController.js
import prisma from '../lib/prisma.js';

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        if (error.message && (
            error.message.includes('connect to the database') ||
            error.message.includes("Can't reach database server") ||
            error.constructor.name === 'PrismaClientInitializationError')) {
            return res.status(503).json({ error: 'Database connection failed. Please ensure PostgreSQL is running.' });
        }
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// ✅ Add this function to fix the import error
export const getUserByClerkId = async (req, res) => {
    try {
        const { clerkId } = req.params;
        const user = await prisma.user.findUnique({ where: { clerkId } });

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user);
    } catch (err) {
        console.error('Error fetching user by Clerk ID:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { clerkId, name, email, bio, githubUrl, portfolioUrl, availability, skills } = req.body;
        
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { clerkId } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create user with basic data
        const userData = {
            clerkId,
            name,
            email,
            bio: bio || '',
            githubUrl: githubUrl || '',
            portfolioUrl: portfolioUrl || '',
            availability: availability || 'Available'
        };

        const user = await prisma.user.create({ data: userData });

        // If skills are provided, create them
        if (skills && Array.isArray(skills) && skills.length > 0) {
            for (const skillData of skills) {
                // First, find or create the skill
                let skill = await prisma.skill.findUnique({
                    where: { name: skillData.skillId }
                });
                
                if (!skill) {
                    skill = await prisma.skill.create({
                        data: {
                            name: skillData.skillId,
                            category: 'Custom'
                        }
                    });
                }

                // Create the user-skill relationship
                await prisma.userSkill.create({
                    data: {
                        userId: user.id,
                        skillId: skill.id,
                        level: skillData.level || 'Beginner'
                    }
                });
            }
        }

        res.status(201).json(user);
    } catch (err) {
        console.error('Error creating user:', err.message);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

// Update user by Clerk ID
export const updateUserByClerkId = async (req, res) => {
    try {
        const { clerkId } = req.params;
        // Only pick scalar fields for update
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
            skills // handle separately
        } = req.body;

        // Update user scalar fields
        const user = await prisma.user.update({
            where: { clerkId },
            data: {
                name,
                email,
                bio,
                githubUrl,
                portfolioUrl,
                availability,
                academicYear,
                branch,
                interests
            },
        });

        // If skills are provided, update them
        if (skills && Array.isArray(skills)) {
            // Remove all existing user skills
            await prisma.userSkill.deleteMany({ where: { userId: user.id } });
            // Add new skills
            for (const skillData of skills) {
                // Find or create the skill
                let skill = await prisma.skill.findUnique({ where: { name: skillData.skillId } });
                if (!skill) {
                    skill = await prisma.skill.create({
                        data: {
                            name: skillData.skillId,
                            category: 'Custom'
                        }
                    });
                }
                // Create the user-skill relationship
                await prisma.userSkill.create({
                    data: {
                        userId: user.id,
                        skillId: skill.id,
                        level: skillData.level || 'Beginner'
                    }
                });
            }
        }

        res.json(user);
    } catch (err) {
        console.error('Error updating user:', err.message);
        res.status(500).json({ error: 'Failed to update user' });
    }
};
