"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMedia = exports.getMediaById = exports.getAllMedia = exports.futuredMedia = exports.deleteMedia = exports.createMedia = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiResponse_1 = __importDefault(require("../../utils/ApiResponse"));
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const media_service_1 = require("./media.service");
// Create
const createMedia = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield media_service_1.MediaServices.createMedia(req.body);
    (0, ApiResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: "Media created successfully",
        data: result,
    });
}));
exports.createMedia = createMedia;
// Get all
const getAllMedia = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield media_service_1.MediaServices.getAllMedia(req.query);
    (0, ApiResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Media fetched successfully",
        data: result,
    });
}));
exports.getAllMedia = getAllMedia;
// Get featured media
const futuredMedia = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield media_service_1.MediaServices.getFuturedMedia();
    (0, ApiResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Futured media fetched successfully",
        data: result,
    });
}));
exports.futuredMedia = futuredMedia;
// Get media by ID
const getMediaById = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield media_service_1.MediaServices.getMediaById(req.params.id);
    (0, ApiResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Media fetched successfully",
        data: result,
    });
}));
exports.getMediaById = getMediaById;
// Update media
const updateMedia = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield media_service_1.MediaServices.updateMediaById(id, req.body);
    (0, ApiResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Media updated successfully",
        data: result,
    });
}));
exports.updateMedia = updateMedia;
// Delete media
const deleteMedia = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield media_service_1.MediaServices.deleteMediaById(id);
    (0, ApiResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Media deleted successfully",
    });
}));
exports.deleteMedia = deleteMedia;
