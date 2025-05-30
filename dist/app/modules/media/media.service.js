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
exports.MediaServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const uploadImgToCloudinary_1 = require("../../middlewares/uploadImgToCloudinary");
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const QueryBuilder_1 = __importDefault(require("../../utils/QueryBuilder"));
// Create new media
const createMedia = (payload, img) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload, img);
    const imgUrl = yield (0, uploadImgToCloudinary_1.uploadImgToCloudinary)(img.path, payload.title);
    const newMedia = yield prisma_1.default.media.create({
        data: Object.assign(Object.assign({}, payload), { posterUrl: imgUrl.secure_url }),
    });
    return newMedia;
});
// Get all media with search, filter, sort, and pagination
const getAllMedia = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.default(query);
    const mediaList = yield prisma_1.default.media.findMany(queryBuilder
        .search(["title", "description"])
        .filter() // apply other exact-match filters if any
        .sortBy() // apply ?sortBy and ?sortOrder
        .paginate() // apply ?page and ?limit
        .fields() // apply ?fields selection
        .build());
    return mediaList;
});
// Get featured media based on average rating
const getFuturedMedia = () => __awaiter(void 0, void 0, void 0, function* () {
    const mediaList = [];
    const topRated = yield prisma_1.default.review.groupBy({
        by: ["mediaId"],
        where: { isApproved: true },
        _avg: { rating: true },
        orderBy: { _avg: { rating: "desc" } },
        take: 5,
    });
    for (const entry of topRated) {
        const media = yield prisma_1.default.media.findUnique({
            where: { id: entry.mediaId },
        });
        if (media && media.isPublished)
            mediaList.push(media);
    }
    return mediaList;
});
// Get media by ID with reviews and purchases
const getMediaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const media = yield prisma_1.default.media.findUnique({
        where: { id: id },
        include: {
            reviews: {
                where: { isApproved: true },
                include: { user: true, likes: true },
            },
            purchases: true,
        },
    });
    if (!media || !media.isPublished) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Media not found or not published");
    }
    // Calculate average rating
    const ratings = media.reviews.map((r) => r.rating);
    const avgRating = ratings.length
        ? (ratings.reduce((a, b) => a + b) / ratings.length).toFixed(1)
        : 0;
    return { media, avgRating };
});
// Update media by ID
const updateMediaById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const media = yield prisma_1.default.media.update({ where: { id: id }, data: payload });
    return media;
});
// Delete media by ID
const deleteMediaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const media = yield prisma_1.default.media.delete({ where: { id: id } });
    return media;
});
exports.MediaServices = {
    createMedia,
    getAllMedia,
    getFuturedMedia,
    getMediaById,
    updateMediaById,
    deleteMediaById,
};
