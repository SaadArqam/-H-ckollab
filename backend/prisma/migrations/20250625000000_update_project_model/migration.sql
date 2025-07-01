-- AlterTable
ALTER TABLE "Project" DROP COLUMN "requiredSkills",
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "techStack" TEXT[],
ADD COLUMN     "maxTeamSize" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;