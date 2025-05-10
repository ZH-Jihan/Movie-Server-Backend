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
exports.userService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
// Get user profile
const getProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    return user;
});
// Update user profile
const updateProfile = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.update({
        where: { id: userId },
        data: Object.assign({}, payload),
    });
    return user;
});
// Get user all watchlist
const userWatchlist = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const watchlist = yield prisma_1.default.watchlist.findMany({
        where: { userId },
        include: { media: true },
    });
    return watchlist;
});
// Add media to user watchlist
const userWatchlistAdd = (userId, mediaId) => __awaiter(void 0, void 0, void 0, function* () {
    const watchlist = yield prisma_1.default.watchlist.create({
        data: { userId, mediaId },
    });
    return watchlist;
});
// Remove media from user watchlist
const userWatchlistRemove = (userId, mediaId) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.watchlist.delete({
        where: { userId_mediaId: { userId, mediaId } },
    });
    return {};
});
exports.userService = {
    getProfile,
    updateProfile,
    userWatchlist,
    userWatchlistAdd,
    userWatchlistRemove,
};
