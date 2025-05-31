import { Review } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../utils/ApiError";
import prisma from "../../utils/prisma";

// get all fanding reviews
const getAllReviews = async () => {
  const reviews = await prisma.review.findMany({
    where: {
      isApproved: false,
    },
    include: {
      user: { select: { id: true, name: true } },
      likes: true,
      comments: true,
      media: {
        select: { id: true, title: true, type: true },
      },
    },
  });
  return reviews.map((review) => {
    return {
      ...review,
      user: { id: review.user.id, name: review.user.name },
      media: review.media
        ? {
            id: review.media.id,
            title: review.media.title,
            type: review.media.type,
          }
        : null,
    };
  });
};

// get user reviews
const getUserReviews = async (userId: string) => {
  const reviews = await prisma.review.findMany({
    where: {
      userId: userId,
    },
  });
  return reviews;
};

// Create a new review
const createReview = async (userId: string, review: Review) => {
  if (review.rating < 1 || review.rating > 10) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Rating must be between 1 and 10."
    );
  }
  const creaRreview = await prisma.review.create({
    data: {
      ...review,
      userId: userId,
      isApproved: false,
    },
  });
  return creaRreview;
};

// Get reviews for a specific media
const getReviews = async (id: string) => {
  const reviews = await prisma.review.findMany({
    where: {
      mediaId: id,
      isApproved: true,
    },
    include: {
      user: { select: { id: true, name: true } },
      likes: true,
      comments: true,
    },
  });
  return reviews;
};

// Approve a review by admin
const updateReview = async (mediaId: string) => {
  const reviews = await prisma.review.update({
    where: {
      id: mediaId,
    },
    data: {
      isApproved: true,
    },
  });
  return reviews;
};

// Like a review by user
const likeReview = async (userId: string, reviewId: string) => {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  });
  if (!review) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Review not found.");
  }

  const existingLike = await prisma.reviewLike.findUnique({
    where: { userId_reviewId: { userId, reviewId } },
  });

  if (existingLike) {
    await prisma.reviewLike.delete({ where: { id: existingLike.id } });
    throw new ApiError(StatusCodes.OK, "Unlike");
  } else {
    const like = await prisma.reviewLike.create({
      data: {
        userId: userId,
        reviewId: reviewId,
      },
    });
    return like;
  }
};

export const reviewService = {
  createReview,
  getReviews,
  updateReview,
  likeReview,
  getAllReviews,
  getUserReviews,
};
