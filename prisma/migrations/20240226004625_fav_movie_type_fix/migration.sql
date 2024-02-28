/*
  Warnings:

  - Changed the type of `mediaId` on the `FavoriteFilm` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "FavoriteFilm" DROP COLUMN "mediaId",
ADD COLUMN     "mediaId" INTEGER NOT NULL;
