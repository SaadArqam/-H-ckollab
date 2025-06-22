import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "prem@example.com" },
    update: {}, // leave empty if no update
    create: {
      clerkId: "clerk_1234",
      name: "Prem Pyla",
      email: "prem@example.com",
      githubUrl: "https://github.com/prempyla"
    }
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
