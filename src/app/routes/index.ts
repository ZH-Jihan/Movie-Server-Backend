import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CommentRoutes } from "../modules/comment/comment.route";
import { CuponRoutes } from "../modules/coupon/coupon.routes";
import { MediaRoutes } from "../modules/media/media.route";
import { NewsletterRoutes } from "../modules/newsletter/newsletter.routes";
import { PurchaseRoutes } from "../modules/purchases/purchase.routes";
import { ReviewRoutes } from "../modules/review/review.route";
import { UserRoutes } from "../modules/user/user.route";

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
    path: "/coupons",
    route: CuponRoutes,
  },
  {
    path: "/comment",
    route: CommentRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/newsletters",
    route: NewsletterRoutes,
  },
  {
    path: "/purchases",
    route: PurchaseRoutes,
  },
];

routerModules.forEach((route) => router.use(route.path, route.route));

export default router;
