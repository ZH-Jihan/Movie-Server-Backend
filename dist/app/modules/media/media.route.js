"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const uploadImgToCloudinary_1 = require("../../middlewares/uploadImgToCloudinary");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const media_controller_1 = require("./media.controller");
const media_validation_1 = require("./media.validation");
const router = (0, express_1.Router)();
router
    .route("/")
    .get(media_controller_1.getAllMedia)
    .post((0, auth_1.default)("ADMIN"), uploadImgToCloudinary_1.upload.single("file"), (req, res, next) => {
    var _a;
    req.body = JSON.parse((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.data);
    console.log(req.body);
    next();
}, (0, validateRequest_1.default)(media_validation_1.mediaCreateSchema), media_controller_1.createMedia);
router.route("/features").get(media_controller_1.futuredMedia);
router
    .route("/:id")
    .get(media_controller_1.getMediaById)
    .put((0, auth_1.default)("ADMIN"), (0, validateRequest_1.default)(media_validation_1.mediaUpdateSchema), media_controller_1.updateMedia)
    .delete((0, auth_1.default)("ADMIN"), media_controller_1.deleteMedia);
exports.MediaRoutes = router;
