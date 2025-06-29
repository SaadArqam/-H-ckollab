import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// GET /api/users
export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: { skills: true },
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// GET /api/users/:id
export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { id }, //  use string ID
            include: { skills: true },
        });

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user);
    } catch (err) {
        console.error('Error in getUserById:', err);
        res.status(500).json({ error: 'Error fetching user' });
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
        skills, // [{ skillId, level }]
    } = req.body;

    if (!clerkId || !email) {
        return res.status(400).json({ error: 'clerkId and email are required' });
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
                    create: skills?.map((skill) => ({
                        skillId: skill.skillId,
                        level: skill.level,
                    })) || [],
                },
            },
            include: { skills: true },
        });

        res.json(user);
    } catch (err) {
        console.error('❌ Error in createOrUpdateUser:', err); //  log full error
        res.status(500).json({ error: 'Failed to create or update user' });
    }
};
