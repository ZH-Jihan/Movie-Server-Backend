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
exports.commentService = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
// Create a new comment
const addComment = (userid, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.text.trim()) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Comment text cannot be empty.");
    }
    const comment = yield prisma_1.default.comment.create({
        data: Object.assign(Object.assign({}, payload), { userId: userid }),
    });
    return comment;
});
// Get comments for a specific review
const getComments = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield prisma_1.default.comment.findMany({
        where: { reviewId, parentId: null },
        include: {
            replies: { include: { replies: true, user: true } },
            user: true,
        },
    });
    return comments;
});
exports.commentService = {
    addComment,
    getComments,
};
