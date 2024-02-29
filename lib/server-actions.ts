"use server";

import prisma from "@/lib/prisma";
import { UserDataType } from "./types";
import { compare, hash } from "bcrypt";
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

export const getUserDataFromUsername = async (
  username: string
): Promise<dbPromise> => {
  try {
    const users = await prisma.user.findMany({
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

    const user = users.find(
      (user) => user.username?.toLowerCase() === username
    );
    if (user) {
      return {
        message: "User Data Fetched Successfully",
        success: true,
        data: user,
      };
    } else {
      return {
        message: "User not found",
        success: false,
      };
    }
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

export const followUser = async (
  userId: string,
  followingId: string
): Promise<dbPromise> => {
  try {
    const newFollow = await prisma.follows.create({
      data: {
        followerId: userId,
        followingId: followingId,
      },
    });
    return {
      message: `Successfully followed user`,
      success: true,
      data: newFollow,
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

export const unfollowUser = async (
  userId: string,
  followingId: string
): Promise<dbPromise> => {
  try {
    const deleteFollow = await prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: followingId,
        },
      },
    });
    return {
      message: `Successfully unfollowed user`,
      success: true,
      data: deleteFollow,
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

export const updateUsername = async (
  userId: string,
  newUsername: string
): Promise<dbPromise> => {
  try {
    const updated = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: newUsername,
      },
    });
    return {
      message: "Username Updated Successfully",
      success: true,
      data: updated,
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

export const updatePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return { message: "User Not Found", success: false };
    if (user.password === null) {
      const res = await setPassword(userId, newPassword);
      return res;
    } else {
      const passwordMatch = await compare(currentPassword, user.password);
      const isReusedPassword = await compare(newPassword, user.password);
      if (!passwordMatch) {
        return {
          message: "Current Password is Incorrect",
          success: false,
        };
      }
      if (isReusedPassword) {
        return {
          message: "You cannot reuse your current password",
          success: false,
        };
      }
      const res = await setPassword(userId, newPassword);
      return res;
    }
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

const setPassword = async (userId: string, newPassword: string) => {
  try {
    const hashedPassword = await hash(newPassword, 12);
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
