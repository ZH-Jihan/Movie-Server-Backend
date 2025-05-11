"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
router
    .route("/register")
    .post((0, validateRequest_1.default)(auth_validation_1.registerUserSchema), auth_controller_1.registerUser);
router.route("/login").post((0, validateRequest_1.default)(auth_validation_1.loginUserSchema), auth_controller_1.loginUser);
exports.AuthRoutes = router;
