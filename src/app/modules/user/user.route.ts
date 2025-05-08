import { Router } from "express";
import auth from "../../middlewares/auth";
import {
  getUser,
  userWatchlist,
  userWatchlistAdd,
  userWatchlistRemove,
} from "./user.controller";

const router = Router();

router.route("/profile").get(auth("USER", "ADMIN"), getUser);
router
  .route("/watchlist")
  .get(auth("USER", "ADMIN"), userWatchlist)
  .post(auth("USER", "ADMIN"), userWatchlistAdd);
router
  .route("/watchlist/:mediaId")
  .delete(auth("USER", "ADMIN"), userWatchlistRemove);

export const UserRoutes = router;
