const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create skills
  const skills = await Promise.all([
    prisma.skill.upsert({
      where: { name: 'JavaScript' },
      update: {},
      create: {
        name: 'JavaScript',
        category: 'FRONTEND',
        description: 'A versatile programming language for web development'
      }
    }),
    prisma.skill.upsert({
      where: { name: 'React' },
      update: {},
      create: {
        name: 'React',
        category: 'FRONTEND',
        description: 'A JavaScript library for building user interfaces'
      }
    }),
    prisma.skill.upsert({
      where: { name: 'Node.js' },
      update: {},
      create: {
        name: 'Node.js',
        category: 'BACKEND',
        description: 'JavaScript runtime for server-side development'
      }
    }),
    prisma.skill.upsert({
      where: { name: 'Python' },
      update: {},
      create: {
        name: 'Python',
        category: 'BACKEND',
        description: 'A powerful and versatile programming language'
      }
    }),
    prisma.skill.upsert({
      where: { name: 'UI/UX Design' },
      update: {},
      create: {
        name: 'UI/UX Design',
        category: 'DESIGN',
        description: 'User interface and user experience design'
      }
    }),
    prisma.skill.upsert({
      where: { name: 'Machine Learning' },
      update: {},
      create: {
        name: 'Machine Learning',
        category: 'AI_ML',
        description: 'Artificial intelligence and machine learning algorithms'
      }
    }),
    prisma.skill.upsert({
      where: { name: 'PostgreSQL' },
      update: {},
      create: {
        name: 'PostgreSQL',
        category: 'DATA',
        description: 'Advanced open-source relational database'
      }
    }),
    prisma.skill.upsert({
      where: { name: 'Docker' },
      update: {},
      create: {
        name: 'Docker',
        category: 'DEVOPS',
        description: 'Containerization platform for application deployment'
      }
    })
  ]);

  console.log(`✅ Created ${skills.length} skills`);

  // Create sample users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'john.doe@example.com' },
      update: {},
      create: {
        clerkId: 'clerk_john_doe_123',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        bio: 'Full-stack developer with 5 years of experience in React and Node.js',
        title: 'Senior Full-Stack Developer',
        experience: 'INTERMEDIATE',
        availability: 'AVAILABLE',
        location: 'San Francisco, CA',
        github: 'https://github.com/johndoe',
        linkedin: 'https://linkedin.com/in/johndoe',
        skills: {
          create: [
            { skillId: skills[0].id, level: 'EXPERT' }, // JavaScript
            { skillId: skills[1].id, level: 'EXPERT' }, // React
            { skillId: skills[2].id, level: 'INTERMEDIATE' }, // Node.js
          ]
        }
      }
    }),
    prisma.user.upsert({
      where: { email: 'jane.smith@example.com' },
      update: {},
      create: {
        clerkId: 'clerk_jane_smith_456',
        email: 'jane.smith@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        username: 'janesmith',
        bio: 'UI/UX Designer passionate about creating beautiful and intuitive user experiences',
        title: 'Senior UI/UX Designer',
        experience: 'ADVANCED',
        availability: 'AVAILABLE',
        location: 'New York, NY',
        portfolio: 'https://janesmith.design',
        skills: {
          create: [
            { skillId: skills[4].id, level: 'EXPERT' }, // UI/UX Design
            { skillId: skills[0].id, level: 'BEGINNER' }, // JavaScript
          ]
        }
      }
    }),
    prisma.user.upsert({
      where: { email: 'alex.python@example.com' },
      update: {},
      create: {
        clerkId: 'clerk_alex_python_789',
        email: 'alex.python@example.com',
        firstName: 'Alex',
        lastName: 'Rodriguez',
        username: 'alexrodriguez',
        bio: 'Data scientist and ML engineer with expertise in Python and machine learning',
        title: 'Data Scientist',
        experience: 'ADVANCED',
        availability: 'BUSY',
        location: 'Austin, TX',
        github: 'https://github.com/alexrodriguez',
        skills: {
          create: [
            { skillId: skills[3].id, level: 'EXPERT' }, // Python
            { skillId: skills[5].id, level: 'EXPERT' }, // Machine Learning
            { skillId: skills[6].id, level: 'INTERMEDIATE' }, // PostgreSQL
          ]
        }
      }
    })
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create sample projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: 'EcoTrack - Sustainability Dashboard',
        description: 'A web application to help individuals and organizations track their environmental impact and carbon footprint. Features include data visualization, goal setting, and community challenges.',
        status: 'IN_PROGRESS',
        ownerId: users[0].id,
        githubUrl: 'https://github.com/hackollab/ecotrack',
        skills: {
          create: [
            { skillId: skills[0].id }, // JavaScript
            { skillId: skills[1].id }, // React
            { skillId: skills[2].id }, // Node.js
            { skillId: skills[4].id }, // UI/UX Design
          ]
        },
        members: {
          create: [
            {
              userId: users[1].id,
              role: 'MEMBER'
            }
          ]
        }
      }
    }),
    prisma.project.create({
      data: {
        title: 'AItutor - Personalized Learning Assistant',
        description: 'An AI-powered educational platform that provides personalized learning experiences using machine learning algorithms to adapt to individual student needs.',
        status: 'PLANNING',
        ownerId: users[2].id,
        skills: {
          create: [
            { skillId: skills[3].id }, // Python
            { skillId: skills[5].id }, // Machine Learning
            { skillId: skills[6].id }, // PostgreSQL
            { skillId: skills[7].id }, // Docker
          ]
        }
      }
    }),
    prisma.project.create({
      data: {
        title: 'LocalConnect - Community Network',
        description: 'A social platform connecting neighbors and local businesses to strengthen community bonds through events, local marketplace, and neighborhood updates.',
        status: 'IN_PROGRESS',
        ownerId: users[1].id,
        skills: {
          create: [
            { skillId: skills[0].id }, // JavaScript
            { skillId: skills[1].id }, // React
            { skillId: skills[4].id }, // UI/UX Design
          ]
        }
      }
    })
  ]);

  console.log(`✅ Created ${projects.length} projects`);

  // Create some project invites
  const invites = await Promise.all([
    prisma.projectInvite.create({
      data: {
        projectId: projects[0].id,
        userId: users[2].id,
        status: 'PENDING',
        message: 'We would love to have your expertise in data analytics for our sustainability dashboard!'
      }
    }),
    prisma.projectInvite.create({
      data: {
        projectId: projects[1].id,
        userId: users[0].id,
        status: 'PENDING',
        message: 'Your full-stack skills would be perfect for building the frontend of our AI tutoring platform.'
      }
    })
  ]);

  console.log(`✅ Created ${invites.length} project invites`);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
