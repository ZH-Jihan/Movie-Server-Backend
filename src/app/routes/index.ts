import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { MediaRoutes } from "../modules/media/media.route";

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
];

routerModules.forEach((route) => router.use(route.path, route.route));

export default router;
