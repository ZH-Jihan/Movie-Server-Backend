import { Router } from "express";
import auth from "../../middlewares/auth";
import {
  createMedia,
  deleteMedia,
  futuredMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
} from "./media.controller";

const router = Router();

router.route("/").get(getAllMedia).post(auth("ADMIN"), createMedia);
router.route("/features").get(futuredMedia);
router
  .route("/:id")
  .get(getMediaById)
  .put(auth("ADMIN"), updateMedia)
  .delete(auth("ADMIN"), deleteMedia);

export const MediaRoutes = router;
