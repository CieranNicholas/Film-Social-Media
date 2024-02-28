/*
  Warnings:

  - Added the required column `posterPath` to the `FavoriteFilm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FavoriteFilm" ADD COLUMN     "posterPath" TEXT NOT NULL;
