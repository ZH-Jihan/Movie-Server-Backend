import { Router } from "express";
import auth from "../../middlewares/auth";
import {
  createReview,
  getReviews,
  likeReview,
  updateReview,
} from "./review.controller";

const router = Router();

router.route("/").post(auth("USER"), createReview);
router.route("/:mideaId").get(getReviews);
router.route("/:id/approve").post(auth("ADMIN"), updateReview);
router.route("/:id/approve").post(auth("USER"), likeReview);

export const ReviewRoutes = router;
