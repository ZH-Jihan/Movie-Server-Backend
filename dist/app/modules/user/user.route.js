"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.route("/profile").get((0, auth_1.default)("USER", "ADMIN"), user_controller_1.getUser);
router
    .route("/watchlist")
    .get((0, auth_1.default)("USER", "ADMIN"), user_controller_1.userWatchlist)
    .post((0, auth_1.default)("USER", "ADMIN"), user_controller_1.userWatchlistAdd);
router
    .route("/watchlist/:mediaId")
    .delete((0, auth_1.default)("USER", "ADMIN"), user_controller_1.userWatchlistRemove);
exports.UserRoutes = router;
