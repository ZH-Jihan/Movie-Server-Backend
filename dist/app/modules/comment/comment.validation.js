"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentCreateSchema = void 0;
const zod_1 = require("zod");
exports.commentCreateSchema = zod_1.z.object({
    text: zod_1.z.string().min(1),
    reviewId: zod_1.z.string().uuid(),
    parentId: zod_1.z.string().uuid().optional(),
});
