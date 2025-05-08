import { StatusCodes } from "http-status-codes";
import { Comment } from "../../../../generated/prisma";
import ApiError from "../../utils/ApiError";
import prisma from "../../utils/prisma";

// Create a new comment
const addComment = async (userid: string, payload: Comment) => {
  if (!payload.text.trim()) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Comment text cannot be empty."
    );
  }
  const comment = await prisma.comment.create({
    data: {
      ...payload,
      userId: userid,
    },
  });
  return comment;
};

// Get comments for a specific review
const getComments = async (reviewId: string) => {
  const comments = await prisma.comment.findMany({
    where: { reviewId, parentId: null },
    include: {
      replies: { include: { replies: true, user: true } },
      user: true,
    },
  });
  return comments;
};

export const commentService = {
    addComment,
    getComments,
}
