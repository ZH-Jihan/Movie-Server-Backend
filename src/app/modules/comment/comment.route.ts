import { Router } from "express";
import auth from "../../middlewares/auth";
import { addComment, getComments } from "./comment.controller";

const router = Router();

router.route("/").post(auth("USER", "ADMIN"), addComment);
router.route("/:reviewId").post(getComments);

export const CommentRoutes = router;
