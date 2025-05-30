"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyCouponindb = exports.validateCouponCode = void 0;
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const validateCouponCode = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const coupon = yield prisma_1.default.coupon.findUnique({
        where: { code },
    });
    if (!coupon) {
        throw new ApiError_1.default(404, "Coupon not found");
    }
    // Check if coupon is expired
    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
        yield prisma_1.default.coupon.update({
            where: { id: coupon.id },
            data: { status: "EXPIRED" },
        });
        throw new ApiError_1.default(400, "Coupon has expired");
    }
    // Check if coupon has reached max uses
    if (coupon.usedCount >= coupon.maxUses) {
        yield prisma_1.default.coupon.update({
            where: { id: coupon.id },
            data: { status: "USED" },
        });
        throw new ApiError_1.default(400, "Coupon has reached maximum uses");
    }
    // Check if coupon is active
    if (coupon.status !== "ACTIVE") {
        throw new ApiError_1.default(400, "Coupon is not active");
    }
    return coupon;
});
exports.validateCouponCode = validateCouponCode;
const applyCouponindb = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const coupon = yield (0, exports.validateCouponCode)(code);
    // Increment used count
    yield prisma_1.default.coupon.update({
        where: { id: coupon.id },
        data: { usedCount: { increment: 1 } },
    });
    return coupon;
});
exports.applyCouponindb = applyCouponindb;
