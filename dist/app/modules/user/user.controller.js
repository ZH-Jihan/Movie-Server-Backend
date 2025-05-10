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
exports.userWatchlistRemove = exports.userWatchlistAdd = exports.userWatchlist = exports.updateUser = exports.getUser = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiResponse_1 = __importDefault(require("../../utils/ApiResponse"));
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const user_service_1 = require("./user.service");
// Get user profile
const getUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const user = yield user_service_1.userService.getProfile(id);
    (0, ApiResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "User fetched successfully",
        data: user,
    });
}));
exports.getUser = getUser;
// Update user profile
const updateUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const user = yield user_service_1.userService.updateProfile(id, req.body);
    (0, ApiResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "User updated successfully",
        data: user,
    });
}));
exports.updateUser = updateUser;
// Get user all watchlist
const userWatchlist = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const watchlist = yield user_service_1.userService.userWatchlist(id);
    (0, ApiResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "User watchlist fetched successfully",
        data: watchlist,
    });
}));
exports.userWatchlist = userWatchlist;
// Add media to user watchlist
const userWatchlistAdd = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { mediaId } = req.params;
    const watchlist = yield user_service_1.userService.userWatchlistAdd(id, mediaId);
    (0, ApiResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Media added to watchlist successfully",
        data: watchlist,
    });
}));
exports.userWatchlistAdd = userWatchlistAdd;
// Remove media from user watchlist
const userWatchlistRemove = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { mediaId } = req.params;
    yield user_service_1.userService.userWatchlistRemove(id, mediaId);
    (0, ApiResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Media removed from watchlist successfully",
    });
}));
exports.userWatchlistRemove = userWatchlistRemove;
