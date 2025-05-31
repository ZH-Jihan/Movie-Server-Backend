import { Router } from "express";
import auth from "../../middlewares/auth";
import * as purchaseController from "./purchase.controller";

const router = Router();

// create purchase
router.post("/", auth("USER"), purchaseController.createPurchase);

// get all purchases of a user for dashboard
router.get("/user", auth("USER"), purchaseController.getUserPurchases);

// update purchase status when payment success
router
  .route("/success/:transactionId")
  .post(purchaseController.updatePurchaseStatus);

// delete purchase when payment failed
router
  .route("/failed/:transactionId")
  .delete(purchaseController.deletePurchase);

// get purchase by transactionId for payment success invoice
router.get("/:transactionId", purchaseController.getPurchaseByTransactionId);

export const PurchaseRoutes = router;
