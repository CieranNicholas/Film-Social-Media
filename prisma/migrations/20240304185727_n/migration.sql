/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - Added the required column `mediaId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaTitle` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediaType` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posterPath` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('MOVIE', 'TV');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
ADD COLUMN     "mediaId" INTEGER NOT NULL,
ADD COLUMN     "mediaTitle" TEXT NOT NULL,
ADD COLUMN     "mediaType" "MediaType" NOT NULL,
ADD COLUMN     "posterPath" TEXT NOT NULL;
