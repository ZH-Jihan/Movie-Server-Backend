import express from "express";
import auth from "../../middlewares/auth";
import * as couponController from "./coupon.controller";

const router = express.Router();

router
  .route("/")
  .post(auth("ADMIN"), couponController.createNewCoupon)
  .get(auth("ADMIN"), couponController.getAllCupon);

router.get("/validate/:code", couponController.validateCoupon);
router.post("/apply", couponController.applyCoupon);

export const CuponRoutes = router;
