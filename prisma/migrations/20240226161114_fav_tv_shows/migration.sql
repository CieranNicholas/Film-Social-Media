-- CreateTable
CREATE TABLE "FavoriteTvShow" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mediaId" INTEGER NOT NULL,
    "mediaTitle" TEXT NOT NULL,
    "posterPath" TEXT NOT NULL,

    CONSTRAINT "FavoriteTvShow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FavoriteTvShow" ADD CONSTRAINT "FavoriteTvShow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
