import { StatusCodes } from "http-status-codes";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { reviewService } from "./review.service";

const createReview = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const result = await reviewService.createReview(id, req.body);

  ApiResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Review created successfully",
    data: result,
  });
});

const getAllReviews = asyncHandler(async (req, res) => {
  const result = await reviewService.getAllReviews();
  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "All reviews fetched successfully",
    data: result,
  });
});

const getUserReviews = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const result = await reviewService.getUserReviews(id);
  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User reviews fetched successfully",
    data: result,
  });
});

const getReviews = asyncHandler(async (req, res) => {
  const { mideaId } = req.params;
  const result = await reviewService.getReviews(mideaId);

  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Reviews fetched successfully",
    data: result,
  });
});

const updateReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await reviewService.updateReview(id);

  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Review updated successfully",
    data: result,
  });
});

const likeReview = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { id: mediaId } = req.params;
  console.log(id, mediaId);

  const result = await reviewService.likeReview(id, mediaId);

  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Review liked successfully",
    data: result,
  });
});

export {
  createReview,
  getAllReviews,
  getReviews,
  likeReview,
  updateReview,
  getUserReviews,
};
