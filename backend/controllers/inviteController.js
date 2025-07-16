// inviteController.js
import prisma from "../lib/prisma.js";
import { sendInviteEmail, sendInviteResponseEmail } from "../lib/emailService.js";

// POST /api/invites
export const sendInvite = async (req, res) => {
  try {
    const { projectId, receiverId, role } = req.body;
    const senderFirebaseUid = req.user?.uid;

    console.log("🔥 Incoming invite data:");
    console.log("projectId:", projectId);
    console.log("receiverId (from frontend):", receiverId);
    console.log("role:", role);
    console.log("senderFirebaseUid:", senderFirebaseUid);

    const sender = await prisma.user.findUnique({
      where: { firebaseUid: senderFirebaseUid },
    });

    console.log("👤 Sender from DB:", sender);

    const receiver = await prisma.user.findUnique({
      where: { id: receiverId },
    });

    console.log("👤 Receiver from DB:", receiver);

    if (!sender) return res.status(404).json({ error: "Sender not found" });
    if (!receiver) return res.status(404).json({ error: "Receiver not found" });

    // Get project details for email
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) return res.status(404).json({ error: "Project not found" });

    const invite = await prisma.invite.create({
      data: {
        projectId,
        senderId: sender.id,
        receiverId: receiver.id,
        role,
        status: "pending",
      },
    });

    // Send email notification (don't block the response)
    sendInviteEmail(
      receiver.email,
      receiver.name,
      sender.name,
      project.title,
      role
    ).catch(err => {
      console.error("❌ Failed to send invite email:", err);
    });

    res.status(201).json(invite);
  } catch (err) {
    console.error("❌ Error sending invite:", err);
    res.status(500).json({ error: "Failed to send invite" });
  }
};

// GET /api/invites/received?userId=...
export const getReceivedInvites = async (req, res) => {
  const { userId } = req.query;
  try {
    const invites = await prisma.invite.findMany({
      where: { receiverId: userId },
      include: {
        project: true,
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            githubUrl: true,
          },
        },
      },
    });
    res.json(invites);
  } catch (err) {
    console.error("Error fetching invites:", err);
    res.status(500).json({ error: "Failed to fetch invites" });
  }
};

// GET /api/invites/user/:firebaseUid
export const getUserInvitesByFirebaseUid = async (req, res) => {
  const { firebaseUid } = req.params;
  
  try {
    // First find the user by Firebase UID
    const user = await prisma.user.findUnique({
      where: { firebaseUid },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get all invites for this user
    const invites = await prisma.invite.findMany({
      where: { receiverId: user.id },
      include: {
        project: true,
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(invites);
  } catch (err) {
    console.error("❌ Error fetching user invites:", err);
    res.status(500).json({ error: "Failed to fetch user invites" });
  }
};

// GET /api/invites/project/:projectId
export const getProjectInvites = async (req, res) => {
  const { projectId } = req.params;
  try {
    const invites = await prisma.invite.findMany({
      where: { projectId },
      include: {
        receiver: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(invites);
  } catch (err) {
    console.error("❌ Error fetching project invites:", err);
    res.status(500).json({ error: "Failed to fetch project invites" });
  }
};

// PATCH /api/invites/:inviteId
export const updateInviteStatus = async (req, res) => {
  const { inviteId } = req.params;
  const { status } = req.body;

  try {
    // Update invite status
    const invite = await prisma.invite.update({
      where: { id: inviteId },
      data: { status },
      include: { project: true, receiver: true },
    });

    // If accepted, add user to collaboratedProjects
    if (status === "accepted") {
      await prisma.project.update({
        where: { id: invite.projectId },
        data: {
          collaborators: {
            connect: { id: invite.receiverId },
          },
        },
      });
    }

    res.json(invite);
  } catch (err) {
    console.error("❌ Error updating invite status:", err);
    res.status(500).json({ error: "Failed to update invite status" });
  }
};

// GET /api/invites/sent/:senderId
export const getSentInvites = async (req, res) => {
  const { senderId } = req.params;
  try {
    const invites = await prisma.invite.findMany({
      where: { senderId },
      include: {
        project: true,
        receiver: true,
      },
      orderBy: { createdAt: "desc" },
    });
    res.json(invites);
  } catch (err) {
    console.error("❌ Error fetching sent invites:", err);
    res.status(500).json({ error: "Failed to fetch sent invites" });
  }
};

// Temporary test route for Nodemailer
export const testEmailRoute = async (req, res) => {
  try {
    // This part of the code is now frontend-only, so it cannot use Nodemailer directly.
    // It should be replaced with a frontend-to-backend API call.
    // For demonstration, we'll just log a message.
    console.log("Test email route called. This is a frontend-only route.");
    res.json({
      message: "Test email route called. This is a frontend-only route.",
    });
  } catch (err) {
    console.error("❌ Failed to send test email:", err);
    res
      .status(500)
      .json({ error: "Failed to send test email", details: err.message });
  }
};
