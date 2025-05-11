"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewUpdateSchema = exports.reviewCreateSchema = void 0;
const zod_1 = require("zod");
exports.reviewCreateSchema = zod_1.z.object({
    rating: zod_1.z.number().int().min(1).max(10),
    text: zod_1.z.string().optional(),
    spoiler: zod_1.z.boolean().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    mediaId: zod_1.z.string().uuid(),
});
exports.reviewUpdateSchema = zod_1.z.object({
    isApproved: zod_1.z.boolean().optional(),
    text: zod_1.z.string().optional(),
    spoiler: zod_1.z.boolean().optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
});
