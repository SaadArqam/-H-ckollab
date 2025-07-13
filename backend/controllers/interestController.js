import prisma from "../lib/prisma.js";
import { sendInterestEmail } from "../lib/emailService.js";

// POST /api/interests - Show interest in a project
export const showInterest = async (req, res) => {
  try {
    const { userId, projectId } = req.body;
    const senderFirebaseUid = req.user?.uid;

    console.log("🔥 Interest data:", { userId, projectId, senderFirebaseUid });

    // Verify the user is showing interest for themselves
    const sender = await prisma.user.findUnique({
      where: { firebaseUid: senderFirebaseUid },
    });

    if (!sender || sender.id !== userId) {
      return res.status(403).json({ error: "Unauthorized: Can only show interest for yourself" });
    }

    // Get project details
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { creator: true },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Check if already interested
    const existingInterest = await prisma.project.findFirst({
      where: {
        id: projectId,
        interestedUsers: {
          some: { id: userId }
        }
      }
    });

    if (existingInterest) {
      return res.status(400).json({ error: "You have already shown interest in this project" });
    }

    // Add interest
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        interestedUsers: {
          connect: { id: userId },
        },
      },
      include: { creator: true },
    });

    // Send email notification to project creator
    sendInterestEmail(
      project.creator.email,
      project.creator.name,
      sender.name,
      project.title
    ).catch(err => {
      console.error("❌ Failed to send interest email:", err);
    });

    res.status(200).json({ message: "Interest shown successfully" });
  } catch (err) {
    console.error("❌ Error showing interest:", err);
    res.status(500).json({ error: "Failed to show interest" });
  }
};

// GET /api/interests/user/:userId - Get user interests by user ID
export const getUserInterestsById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        interestedIn: {
          include: {
            creator: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.interestedIn);
  } catch (err) {
    console.error("Error fetching user interests by ID:", err);
    res.status(500).json({ error: "Failed to fetch user interests" });
  }
}; 