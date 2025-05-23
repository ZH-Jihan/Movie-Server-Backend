"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userUpdateSchema = void 0;
const zod_1 = require("zod");
exports.userUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    email: zod_1.z.string().email().optional(),
});
