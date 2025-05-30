import { StatusCodes } from "http-status-codes";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { userService } from "./user.service";

// Get user profile
const getUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = await userService.getProfile(id);

  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User fetched successfully",
    data: user,
  });
});

// get all user profile
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await userService.getAllProfiles();

  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "All users fetched successfully",
    data: users,
  });
});

// Update user profile
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const user = await userService.updateProfile(id, req.body);

  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User updated successfully",
    data: user,
  });
});

// Get user all watchlist
const userWatchlist = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const watchlist = await userService.userWatchlist(id);

  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User watchlist fetched successfully",
    data: watchlist,
  });
});

// Add media to user watchlist
const userWatchlistAdd = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { mediaId } = req.params;
  const watchlist = await userService.userWatchlistAdd(id, mediaId);

  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Media added to watchlist successfully",
    data: watchlist,
  });
});

// Remove media from user watchlist
const userWatchlistRemove = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { mediaId } = req.params;
  await userService.userWatchlistRemove(id, mediaId);

  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Media removed from watchlist successfully",
  });
});

export {
  getAllUsers,
  getUser,
  updateUser,
  userWatchlist,
  userWatchlistAdd,
  userWatchlistRemove,
};
