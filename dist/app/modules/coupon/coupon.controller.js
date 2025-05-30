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
exports.applyCoupon = exports.validateCoupon = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiResponse_1 = __importDefault(require("../../utils/ApiResponse"));
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const coupon_service_1 = require("./coupon.service");
exports.validateCoupon = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.params;
    const coupon = yield (0, coupon_service_1.validateCouponCode)(code);
    (0, ApiResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Coupon is valid",
        data: {
            isValid: true,
            discount: coupon.discount,
            message: `Coupon ${coupon.code} is valid`,
        },
    });
}));
exports.applyCoupon = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    const coupon = yield (0, coupon_service_1.applyCouponindb)(code);
    (0, ApiResponse_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Coupon applied successfully",
        data: {
            isValid: true,
            discount: coupon.discount,
            message: `Coupon ${coupon.code} applied successfully`,
        },
    });
}));
