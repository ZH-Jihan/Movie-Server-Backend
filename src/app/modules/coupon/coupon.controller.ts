import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import asyncHandler from "../../utils/asyncHandler";
import {
  applyCouponindb,
  createCoupon,
  getAllCupons,
  validateCouponCode,
} from "./coupon.service";

export const getAllCupon = asyncHandler(async (req: Request, res: Response) => {
  const coupons = await getAllCupons();
  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Coupons fetched successfully",
    data: coupons,
  });
});

export const createNewCoupon = asyncHandler(
  async (req: Request, res: Response) => {
    const couponData = req.body;

    // Validate required fields
    if (!couponData.code || !couponData.discount || !couponData.maxUses) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Code, discount, and maxUses are required"
      );
    }

    // Create coupon in the database
    const newCoupon = await createCoupon(couponData);

    ApiResponse(res, {
      statusCode: StatusCodes.CREATED,
      message: "Coupon created successfully",
      data: newCoupon,
    });
  }
);

export const validateCoupon = asyncHandler(
  async (req: Request, res: Response) => {
    const { code } = req.params;
    const coupon = await validateCouponCode(code);

    ApiResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Coupon is valid",
      data: {
        isValid: true,
        discount: coupon.discount,
        message: `Coupon ${coupon.code} is valid`,
      },
    });
  }
);

export const applyCoupon = asyncHandler(async (req: Request, res: Response) => {
  const { code } = req.body;
  const coupon = await applyCouponindb(code);
  ApiResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Coupon applied successfully",
    data: {
      isValid: true,
      discount: coupon.discount,
      message: `Coupon ${coupon.code} applied successfully`,
    },
  });
});
