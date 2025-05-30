import prisma from "../../utils/prisma";

// Get All User Profiles
const getAllProfiles = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      status: true,
    },
  });

  return users;
};

// Get user profile
const getProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  return user;
};

// Update user profile
const updateProfile = async (userId: string, payload: any) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { ...payload },
  });

  return user;
};

// Get user all watchlist
const userWatchlist = async (userId: string) => {
  const watchlist = await prisma.watchlist.findMany({
    where: { userId },
    include: { media: true },
  });

  return watchlist;
};

// Add media to user watchlist
const userWatchlistAdd = async (userId: string, mediaId: string) => {
  const watchlist = await prisma.watchlist.create({
    data: { userId, mediaId },
  });

  return watchlist;
};

// Remove media from user watchlist
const userWatchlistRemove = async (userId: string, mediaId: string) => {
  await prisma.watchlist.delete({
    where: { userId_mediaId: { userId, mediaId } },
  });

  return {};
};

export const userService = {
  getProfile,
  getAllProfiles,
  updateProfile,
  userWatchlist,
  userWatchlistAdd,
  userWatchlistRemove,
};
