"use server";

import prisma from "@/lib/prisma";
import { UserDataType } from "./types";
import { hash } from "bcrypt";
import { Prisma } from "@prisma/client";
import { Movie } from "@/types";

export interface dbPromise {
  message: string;
  success: boolean;
  data?: any;
}

export const createPost = async (formData: FormData, userId: string) => {
  const post = formData.get("post") as string;

  try {
    const created = await prisma.post.create({
      data: {
        content: post,
        authorId: userId,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

export const getUserDataFromId = async (id: string): Promise<dbPromise> => {
  try {
    const res = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        posts: {
          orderBy: {
            createdAt: "desc",
          },
        },
        following: true,
        followers: true,
      },
    });

    return {
      message: "User Data Fetched Successfully",
      success: true,
      data: res,
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e.message);
      return {
        message: e.message,
        success: false,
      };
    }
    throw e;
  }
};

export const followUser = async (userId: string, followingId: string) => {
  try {
    const newFollow = await prisma.follows.create({
      data: {
        followerId: userId,
        followingId: followingId,
      },
    });
    return newFollow;
  } catch (e) {
    console.error(e);
  }
};

export const unfollowUser = async (userId: string, followingId: string) => {
  try {
    const deleteFollow = await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: followingId,
        },
      },
    });
    return deleteFollow;
  } catch (e) {
    console.error(e);
  }
};

export const isFollowing = async (followerId: string, followingId: string) => {
  const followRecord = await prisma.follows.findUnique({
    where: {
      followerId_followingId: {
        followerId: followerId,
        followingId: followingId,
      },
    },
  });
  return Boolean(followRecord);
};

export const deletePost = async (postId: string) => {
  const deletedPost = await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  return deletedPost;
};

export async function AddFavouriteFilm(
  uid: string,
  title: string,
  movieId: number,
  posterPath: string
): Promise<dbPromise> {
  try {
    const created = await prisma.favoriteFilm.create({
      data: {
        userId: uid,
        mediaId: movieId,
        mediaTitle: title,
        posterPath: posterPath,
      },
    });

    return {
      message: "Favourite Film Added Successfully",
      success: true,
      data: created,
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e.message);
      return {
        message: e.message,
        success: false,
      };
    }
    throw e;
  }
}

export async function deleteFavouriteFilm(
  uid: string,
  dbId: string
): Promise<dbPromise> {
  try {
    const deleted = await prisma.favoriteFilm.delete({
      where: {
        id: dbId,
        userId: uid,
      },
    });
    return {
      message: "Favourite Film Deleted Successfully",
      success: true,
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e.message);
      return {
        message: e.message,
        success: false,
      };
    }
    throw e;
  }
}

export async function GetFavouriteFilms(userId: string): Promise<any> {
  try {
    const favoriteFilms = await prisma.favoriteFilm.findMany({
      where: {
        userId: userId,
      },
    });
    return {
      message: "Favorite Films Fetched Successfully",
      success: true,
      data: favoriteFilms,
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e.message);
      return {
        message: e.message,
        success: false,
      };
    }
    throw e;
  }
}

export async function getFavouriteTv(userId: string): Promise<dbPromise> {
  try {
    const favouriteTv = await prisma.favoriteTvShow.findMany({
      where: {
        userId: userId,
      },
    });
    return {
      message: "Favorite Tv Shows Fetched Successfully",
      success: true,
      data: favouriteTv,
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e.message);
      return {
        message: e.message,
        success: false,
      };
    }
    throw e;
  }
}

export async function AddFavouriteTv(
  uid: string,
  title: string,
  tvId: number,
  posterPath: string
): Promise<dbPromise> {
  try {
    const created = await prisma.favoriteTvShow.create({
      data: {
        userId: uid,
        mediaId: tvId,
        mediaTitle: title,
        posterPath: posterPath,
      },
    });
    return {
      message: "Favourite Tv Show Added Successfully",
      success: true,
      data: created,
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e.message);
      return {
        message: e.message,
        success: false,
      };
    }
    throw e;
  }
}

export async function deleteFavouriteTv(
  uid: string,
  dbId: string
): Promise<dbPromise> {
  try {
    const deleted = await prisma.favoriteTvShow.delete({
      where: {
        id: dbId,
        userId: uid,
      },
    });
    return {
      message: "Favourite Tv Show Deleted Successfully",
      success: true,
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e.message);
      return {
        message: e.message,
        success: false,
      };
    }
    throw e;
  }
}

export const updatePassword = async (userId: string, password: string) => {
  try {
    const hashedPassword = await hash(password, 12);
    const updated = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });
    return {
      message: "Password Updated Successfully",
      success: true,
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e.message);
      return {
        message: e.message,
        success: false,
      };
    }
    throw e;
  }
};

export const updateProfileImage = async (userId: string, image: string) => {
  try {
    const updated = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: image,
      },
    });

    return {
      message: "Profile Image Updated Successfully",
      success: true,
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(e.message);
      return {
        message: e.message,
        success: false,
      };
    }
    throw e;
  }
};
