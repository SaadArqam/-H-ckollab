import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// POST /api/invites
export const sendInvite = async (req, res) => {
  const { senderId, receiverId, projectId, role } = req.body;
  try {
    const invite = await prisma.invite.create({
      data: {
        senderId,
        receiverId,
        projectId,
        role,
      },
    });
    res.status(201).json(invite);
  } catch (err) {
    console.error('Error sending invite:', err);
    res.status(500).json({ error: 'Failed to send invite' });
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
    console.error('Error fetching invites:', err);
    res.status(500).json({ error: 'Failed to fetch invites' });
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

    if (status === 'accepted') {
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
    console.error('Error updating invite:', err);
    res.status(500).json({ error: 'Failed to respond to invite' });
  }
};