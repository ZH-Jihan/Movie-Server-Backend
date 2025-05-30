import { Router } from "express";
import auth from "../../middlewares/auth";
import {
  getAllUsers,
  getUser,
  userWatchlist,
  userWatchlistAdd,
  userWatchlistRemove,
} from "./user.controller";

const router = Router();

// Get all users (Admin only)
router.route("/").get(auth("ADMIN"), getAllUsers);

router.route("/profile").get(auth("USER", "ADMIN"), getUser);
router
  .route("/watchlist")
  .get(auth("USER", "ADMIN"), userWatchlist)
  .post(auth("USER", "ADMIN"), userWatchlistAdd);
router
  .route("/watchlist/:mediaId")
  .delete(auth("USER", "ADMIN"), userWatchlistRemove);

export const UserRoutes = router;
