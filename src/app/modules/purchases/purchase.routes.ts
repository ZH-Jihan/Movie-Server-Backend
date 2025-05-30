import { Router } from "express";
import * as purchaseController from "./purchase.controller";

const router = Router();

router.post("/", purchaseController.createPurchase);
router.get("/user/:userId", purchaseController.getUserPurchases);
router.patch("/:id/status", purchaseController.updatePurchaseStatus);

export const PurchaseRoutes = router;
