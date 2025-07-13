// inviteController.js
import prisma from "../lib/prisma.js";

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

    const invite = await prisma.invite.create({
      data: {
        projectId,
        senderId: sender.id,
        receiverId: receiver.id,
        role,
        status: "pending",
      },
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

// PATCH /api/invites/:id
export const respondToInvite = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // "accepted" or "declined"

  try {
    const updatedInvite = await prisma.invite.update({
      where: { id },
      data: { status },
    });

    if (status === "accepted") {
      // Add receiver as collaborator
      await prisma.project.update({
        where: { id: updatedInvite.projectId },
        data: {
          collaborators: {
            connect: { id: updatedInvite.receiverId },
          },
        },
      });
    }

    res.json(updatedInvite);
  } catch (err) {
    console.error("Error updating invite:", err);
    res.status(500).json({ error: "Failed to respond to invite" });
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
