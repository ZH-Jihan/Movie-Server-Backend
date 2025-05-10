"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/auth/auth.route");
const comment_route_1 = require("../modules/comment/comment.route");
const media_route_1 = require("../modules/media/media.route");
const review_route_1 = require("../modules/review/review.route");
const router = (0, express_1.Router)();
const routerModules = [
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
    {
        path: "/media",
        route: media_route_1.MediaRoutes,
    },
    {
        path: "/review",
        route: review_route_1.ReviewRoutes,
    },
    {
        path: "/comment",
        route: comment_route_1.CommentRoutes,
    },
    {
        path: "/user",
        route: comment_route_1.CommentRoutes,
    },
];
routerModules.forEach((route) => router.use(route.path, route.route));
exports.default = router;
