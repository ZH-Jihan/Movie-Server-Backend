import { NextFunction, Request, Response, Router } from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../middlewares/uploadImgToCloudinary";
import validateRequest from "../../middlewares/validateRequest";
import {
  createMedia,
  deleteMedia,
  futuredMedia,
  getAllMedia,
  getMediaById,
  updateMedia,
} from "./media.controller";
import { mediaCreateSchema, mediaUpdateSchema } from "./media.validation";

const router = Router();

router
  .route("/")
  .get(getAllMedia)
  .post(
    auth("ADMIN"),
    upload.fields([
      { name: "file", maxCount: 1 },
      { name: "coverImage", maxCount: 1 },
      { name: "screenshots", maxCount: 5 },
    ]),
    (req: Request, res: Response, next: NextFunction) => {
      req.body = JSON.parse(req?.body?.data);
      next();
    },
    validateRequest(mediaCreateSchema),
    createMedia
  );
router.route("/features").get(futuredMedia);
router
  .route("/:id")
  .get(getMediaById)
  .put(auth("ADMIN"), validateRequest(mediaUpdateSchema), updateMedia)
  .delete(auth("ADMIN"), deleteMedia);

export const MediaRoutes = router;
