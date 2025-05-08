import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CommentRoutes } from "../modules/comment/comment.route";
import { MediaRoutes } from "../modules/media/media.route";
import { ReviewRoutes } from "../modules/review/review.route";

const router = Router();

const routerModules = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/media",
    route: MediaRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
  {
    path: "/comment",
    route: CommentRoutes,
  },
  {
    path: "/user",
    route: CommentRoutes,
  },
];

routerModules.forEach((route) => router.use(route.path, route.route));

export default router;
