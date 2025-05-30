"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const review_controller_1 = require("./review.controller");
const review_validation_1 = require("./review.validation");
const router = (0, express_1.Router)();
router
    .route("/")
    .get((0, auth_1.default)("ADMIN"), review_controller_1.getAllReviews)
    .post((0, auth_1.default)("USER"), (0, validateRequest_1.default)(review_validation_1.reviewCreateSchema), review_controller_1.createReview);
router.route("/:mideaId").get(review_controller_1.getReviews);
router.route("/:id/approve").post((0, auth_1.default)("ADMIN"), review_controller_1.updateReview);
router.route("/:id/like").post((0, auth_1.default)("USER"), review_controller_1.likeReview);
exports.ReviewRoutes = router;
