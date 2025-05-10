"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const media_controller_1 = require("./media.controller");
const router = (0, express_1.Router)();
router.route("/").get(media_controller_1.getAllMedia).post((0, auth_1.default)("ADMIN"), media_controller_1.createMedia);
router.route("/features").get(media_controller_1.futuredMedia);
router
    .route("/:id")
    .get(media_controller_1.getMediaById)
    .put((0, auth_1.default)("ADMIN"), media_controller_1.updateMedia)
    .delete((0, auth_1.default)("ADMIN"), media_controller_1.deleteMedia);
exports.MediaRoutes = router;
