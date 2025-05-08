import { StatusCodes } from "http-status-codes";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { commentService } from "./comment.service";

const addComment = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const result = await commentService.addComment(id, req.body);

  ApiResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Comment Post successfully",
    data: result,
  });
});

const getComments = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  const result = await commentService.getComments(reviewId);

  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Comments fetched successfully",
    data: result,
  });
});

export { addComment, getComments };
