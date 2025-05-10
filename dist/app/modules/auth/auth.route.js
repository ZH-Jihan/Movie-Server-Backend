"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.route("/register").post(auth_controller_1.registerUser);
router.route("/login").post(auth_controller_1.loginUser);
exports.AuthRoutes = router;
