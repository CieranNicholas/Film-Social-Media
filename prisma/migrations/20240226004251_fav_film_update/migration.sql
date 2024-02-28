/*
  Warnings:

  - Added the required column `mediaTitle` to the `FavoriteFilm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FavoriteFilm" ADD COLUMN     "mediaTitle" TEXT NOT NULL;
