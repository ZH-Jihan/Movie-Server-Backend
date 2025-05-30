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
exports.reviewService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
// get all fanding reviews
const getAllReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield prisma_1.default.review.findMany({
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
        return Object.assign(Object.assign({}, review), { user: { id: review.user.id, name: review.user.name }, media: review.media
                ? {
                    id: review.media.id,
                    title: review.media.title,
                    type: review.media.type,
                }
                : null });
    });
});
// Create a new review
const createReview = (userId, review) => __awaiter(void 0, void 0, void 0, function* () {
    if (review.rating < 1 || review.rating > 10) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Rating must be between 1 and 10.");
    }
    const creaRreview = yield prisma_1.default.review.create({
        data: Object.assign(Object.assign({}, review), { userId: userId, isApproved: false }),
    });
    return creaRreview;
});
// Get reviews for a specific media
const getReviews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield prisma_1.default.review.findMany({
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
});
// Approve a review by admin
const updateReview = (mediaId) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield prisma_1.default.review.update({
        where: {
            id: mediaId,
        },
        data: {
            isApproved: true,
        },
    });
    return reviews;
});
// Like a review by user
const likeReview = (userId, reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield prisma_1.default.review.findUnique({
        where: {
            id: reviewId,
        },
    });
    if (!review) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Review not found.");
    }
    const existingLike = yield prisma_1.default.reviewLike.findUnique({
        where: { userId_reviewId: { userId, reviewId } },
    });
    if (existingLike) {
        yield prisma_1.default.reviewLike.delete({ where: { id: existingLike.id } });
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.OK, "Unlike");
    }
    else {
        const like = yield prisma_1.default.reviewLike.create({
            data: {
                userId: userId,
                reviewId: reviewId,
            },
        });
        return like;
    }
});
exports.reviewService = {
    createReview,
    getReviews,
    updateReview,
    likeReview,
    getAllReviews,
};
