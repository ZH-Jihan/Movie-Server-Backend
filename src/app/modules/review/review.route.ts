import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  createReview,
  getAllReviews,
  getReviews,
  getUserReviews,
  likeReview,
  updateReview,
} from "./review.controller";
import { reviewCreateSchema } from "./review.validation";

const router = Router();

router
  .route("/")
  .get(auth("ADMIN"), getAllReviews)
  .post(auth("USER"), validateRequest(reviewCreateSchema), createReview);

// get reviews by media id
router.route("/:mideaId").get(getReviews);

// get individual user reviews
router.route("/user").get(auth("USER"), getUserReviews);

// approve review by admin
router.route("/:id/approve").post(auth("ADMIN"), updateReview);

// like review
router.route("/:id/like").post(auth("USER"), likeReview);

export const ReviewRoutes = router;
