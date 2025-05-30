import { Coupon } from "@prisma/client";
import ApiError from "../../utils/ApiError";
import prisma from "../../utils/prisma";

export const getAllCupons = async (): Promise<Coupon[]> => {
  const coupons = await prisma.coupon.findMany({
    orderBy: { createdAt: "desc" },
  });
  return coupons;
};

export const createCoupon = async (payload: Coupon): Promise<Coupon> => {
  // Check if coupon code already exists
  const existingCoupon = await prisma.coupon.findUnique({
    where: { code: payload.code },
  });

  if (existingCoupon) {
    throw new ApiError(400, "Coupon code already exists");
  }

  // Create new coupon
  const newCoupon = await prisma.coupon.create({
    data: {
      ...payload,
      usedCount: 0, // Initialize used count to 0
      status: "ACTIVE", // Set initial status to ACTIVE
    },
  });

  return newCoupon;
};

export const validateCouponCode = async (code: string): Promise<Coupon> => {
  const coupon = await prisma.coupon.findUnique({
    where: { code },
  });

  if (!coupon) {
    throw new ApiError(404, "Coupon not found");
  }

  // Check if coupon is expired
  if (coupon.expiresAt && coupon.expiresAt < new Date()) {
    await prisma.coupon.update({
      where: { id: coupon.id },
      data: { status: "EXPIRED" },
    });
    throw new ApiError(400, "Coupon has expired");
  }

  // Check if coupon has reached max uses
  if (coupon.usedCount >= coupon.maxUses) {
    await prisma.coupon.update({
      where: { id: coupon.id },
      data: { status: "USED" },
    });
    throw new ApiError(400, "Coupon has reached maximum uses");
  }

  // Check if coupon is active
  if (coupon.status !== "ACTIVE") {
    throw new ApiError(400, "Coupon is not active");
  }

  return coupon;
};

export const applyCouponindb = async (code: string): Promise<Coupon> => {
  const coupon = await validateCouponCode(code);

  // Increment used count
  await prisma.coupon.update({
    where: { id: coupon.id },
    data: { usedCount: { increment: 1 } },
  });

  return coupon;
};
