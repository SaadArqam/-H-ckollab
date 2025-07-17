const prisma = require("../lib/prisma");

exports.createHackathon = async (req, res) => {
  const {
    title,
    description,
    theme,
    hackathonDate,
    deadline,
    location,
    organizer,
    eventMode,
    hackathonLink,
    registrationFee,
    rounds,
    tags = [],
    techStack = [],
    rolesNeeded = [],
    maxTeamSize,
    visibility,
  } = req.body;
  // userId from Firebase auth middleware
  const userId = req.user?.id || req.userId;

  try {
    const newHackathon = await prisma.hackathon.create({
      data: {
        title,
        description,
        theme,
        hackathonDate: hackathonDate ? new Date(hackathonDate) : null,
        deadline: deadline ? new Date(deadline) : null,
        location,
        organizer,
        eventMode,
        hackathonLink,
        registrationFee,
        rounds: Array.isArray(rounds) ? rounds.join(",") : rounds || null,
        tags,
        techStack,
        rolesNeeded,
        maxTeamSize: maxTeamSize ? Number(maxTeamSize) : 1,
        visibility: visibility || "Public",
        userId,
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
    // Parse rounds string to array for each hackathon
    const result = hackathons.map(h => ({
      ...h,
      rounds: h.rounds ? h.rounds.split(",") : [],
    }));
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch hackathons." });
  }
};
