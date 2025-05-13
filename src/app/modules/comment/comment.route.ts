import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { addComment, getComments } from "./comment.controller";
import { commentCreateSchema } from "./comment.validation";

const router = Router();

router
  .route("/")
  .post(
    auth("USER", "ADMIN"),
    validateRequest(commentCreateSchema),
    addComment
  );
router.route("/:reviewId").get(getComments);

export const CommentRoutes = router;
