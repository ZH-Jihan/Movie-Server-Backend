import { Request, Response } from "express";
import * as purchaseService from "./purchase.service";

export const createPurchase = async (req: Request, res: Response) => {
  const { userId, mediaId, type, price, paymentMethodId } = req.body;
  try {
    const purchase = await purchaseService.createPurchase({
      userId,
      mediaId,
      type,
      price,
      paymentMethodId,
    });
    res.status(201).json({ success: true, data: purchase });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getUserPurchases = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const purchases = await purchaseService.getUserPurchases(userId);
  res.json({ success: true, data: purchases });
};

export const updatePurchaseStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const purchase = await purchaseService.updatePurchaseStatus(id, status);
  res.json({ success: true, data: purchase });
};
