import { StatusCodes } from "http-status-codes";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import { MediaServices } from "./media.service";

// Create
const createMedia = asyncHandler(async (req, res) => {
  const result = await MediaServices.createMedia(req.body);

  ApiResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Media created successfully",
    data: result,
  });
});

// Get all
const getAllMedia = asyncHandler(async (req, res) => {
  const result = await MediaServices.getAllMedia(req.query);

  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Media fetched successfully",
    data: result,
  });
});

// Get featured media
const futuredMedia = asyncHandler(async (req, res) => {
  const result = await MediaServices.getFuturedMedia();

  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Futured media fetched successfully",
    data: result,
  });
});

// Get media by ID
const getMediaById = asyncHandler(async (req, res) => {
  const result = await MediaServices.getMediaById(req.params.id);

  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Media fetched successfully",
    data: result,
  });
});

// Update media
const updateMedia = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await MediaServices.updateMediaById(id, req.body);

  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Media updated successfully",
    data: result,
  });
});

// Delete media
const deleteMedia = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await MediaServices.deleteMediaById(id);

  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Media deleted successfully",
  });
});

export {
  createMedia,
  deleteMedia,
  futuredMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
};
