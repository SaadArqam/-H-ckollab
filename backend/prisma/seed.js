// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// async function main() {
//   const skillReact = await prisma.skill.upsert({
//     where: { name: 'React' },
//     update: {},
//     create: {
//       name: 'React',
//       category: 'Frontend',
//     },
//   });

//   const user = await prisma.user.create({
//     data: {
//       clerkId: 'clerk_test_123',
//       name: 'Prem Pyla',
//       email: 'prem@example.com',
//       bio: 'Full-stack dev passionate about building teams.',
//       githubUrl: 'https://github.com/prempyla',
//       portfolioUrl: 'https://prem.dev',
//       availability: 'Available',
//       skills: {
//         create: {
//           skillId: skillReact.id,
//           level: 'Advanced',
//         },
//       },
//     },
//   });

//   console.log('Seeded user:', user);
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(async () => await prisma.$disconnect());
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create or reuse skills
  const skillReact = await prisma.skill.upsert({
    where: { name: 'React' },
    update: {},
    create: { name: 'React', category: 'Frontend' },
  });

  const skillNode = await prisma.skill.upsert({
    where: { name: 'Node.js' },
    update: {},
    create: { name: 'Node.js', category: 'Backend' },
  });

  const skillPostgres = await prisma.skill.upsert({
    where: { name: 'PostgreSQL' },
    update: {},
    create: { name: 'PostgreSQL', category: 'Database' },
  });

  // Helper to create users
  const createUser = async (name, clerkIdSuffix, skills) => {
    return await prisma.user.create({
      data: {
        clerkId: `clerk_${clerkIdSuffix}`,
        name,
        email: `${name.toLowerCase()}@example.com`,
        bio: `${name} is a developer.`,
        githubUrl: `https://github.com/${name.toLowerCase()}`,
        portfolioUrl: `https://${name.toLowerCase()}.dev`,
        availability: 'Available',
        skills: {
          create: skills.map(({ skill, level }) => ({
            skillId: skill.id,
            level,
          })),
        },
      },
    });
  };

  // Seed users
  const users = [{
    name: 'Prem Pyla',
    id: 'test_123',
    skills: [
      { skill: skillReact, level: 'Advanced' },
      { skill: skillNode, level: 'Intermediate' },
    ],
  },
  {
    name: 'Ayush',
    id: 'test_ayush',
    skills: [
      { skill: skillReact, level: 'Intermediate' },
      { skill: skillPostgres, level: 'Beginner' },
    ],
  }];

  // Create users
  const createdUsers = await Promise.all(
    users.map(user => createUser(user.name, user.id, user.skills))
  );

  // Create sample projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: 'Social Media Dashboard',
        description: 'A comprehensive dashboard for managing social media accounts and analytics',
        tags: ['Web Development', 'Dashboard', 'Analytics'],
        techStack: ['React', 'Node.js', 'PostgreSQL'],
        maxTeamSize: 4,
        status: 'Open',
        creatorId: createdUsers[0].id,
      },
    }),
    prisma.project.create({
      data: {
        title: 'Mobile Fitness App',
        description: 'A fitness tracking application with social features and workout plans',
        tags: ['Mobile App', 'Health', 'Fitness'],
        techStack: ['React Native', 'Firebase', 'Node.js'],
        maxTeamSize: 3,
        status: 'Open',
        creatorId: createdUsers[1].id,
      },
    }),
  ]);

  console.log('Seed data created:', { users: createdUsers, projects });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
