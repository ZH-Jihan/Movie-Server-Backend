import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  createReview,
  getReviews,
  likeReview,
  updateReview,
} from "./review.controller";
import { reviewCreateSchema } from "./review.validation";

const router = Router();

router
  .route("/")
  .post(auth("USER"), validateRequest(reviewCreateSchema), createReview);

router.route("/:mideaId").get(getReviews);

router
  .route("/:id/approve")
  .post(auth("ADMIN"), updateReview);
  
router.route("/:id/like").post(auth("USER"), likeReview);

export const ReviewRoutes = router;
