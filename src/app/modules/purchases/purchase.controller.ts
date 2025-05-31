import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import * as purchaseService from "./purchase.service";

export const createPurchase = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.user;
    const result = await purchaseService.createPurchase(id, req.body);
    ApiResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: "Purchase created successfully",
      data: result,
    });
  }
);

export const getUserPurchases = async (req: Request, res: Response) => {
  const { id } = req.user;
  const purchases = await purchaseService.getUserPurchases(id);
  res.json({ success: true, data: purchases });
};

// update purchase status when payment success
export const updatePurchaseStatus = async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  console.log(transactionId);
  const purchase = await purchaseService.updatePurchaseStatus(transactionId);
  console.log(purchase);
  if (purchase) {
    res.redirect(`http://localhost:3000/payment/success/${transactionId}`);
  }
};

// delete purchase when payment failed
export const deletePurchase = async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  const result = await purchaseService.deletePurchase(transactionId);
};

// get purchase by transactionId
export const getPurchaseByTransactionId = asyncHandler(
  async (req: Request, res: Response) => {
    const { transactionId } = req.params;
    const purchase = await purchaseService.getPurchaseByTransactionId(
      transactionId
    );
    if (purchase) {
      ApiResponse(res, {
        statusCode: StatusCodes.OK,
        message: "Purchase found",
        data: purchase,
      });
    } else {
      ApiResponse(res, {
        statusCode: StatusCodes.NOT_FOUND,
        message: "Purchase not found",
      });
    }
  }
);
