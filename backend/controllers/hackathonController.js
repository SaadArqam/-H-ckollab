const prisma = require("../lib/prisma");

exports.createHackathon = async (req, res) => {
  const { title, description, techStack, eventDate } = req.body;
  const userId = req.userId;

  try {
    const newHackathon = await prisma.hackathon.create({
      data: {
        title,
        description,
        techStack,
        eventDate: new Date(eventDate),
        createdBy: userId,
        participants: [userId],
      },
    });
    res.status(201).json(newHackathon);
  } catch (err) {
    res.status(500).json({ error: "Failed to create hackathon." });
  }
};

exports.getAllHackathons = async (req, res) => {
  try {
    const hackathons = await prisma.hackathon.findMany();
    res.status(200).json(hackathons);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch hackathons." });
  }
};
