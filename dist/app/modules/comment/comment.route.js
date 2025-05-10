"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const comment_controller_1 = require("./comment.controller");
const router = (0, express_1.Router)();
router.route("/").post((0, auth_1.default)("USER", "ADMIN"), comment_controller_1.addComment);
router.route("/:reviewId").post(comment_controller_1.getComments);
exports.CommentRoutes = router;
