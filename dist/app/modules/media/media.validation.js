"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaUpdateSchema = exports.mediaCreateSchema = void 0;
const zod_1 = require("zod");
exports.mediaCreateSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    type: zod_1.z.enum(["MOVIE", "SERIES"]),
    genres: zod_1.z.array(zod_1.z.string()).min(1),
    releaseYear: zod_1.z.number().int(),
    duration: zod_1.z.number().int(),
    price: zod_1.z.number(),
    rentPrice: zod_1.z.number(),
    streamingLink: zod_1.z.string().url(),
    drmProtected: zod_1.z.boolean().optional(),
    isPublished: zod_1.z.boolean().optional(),
});
exports.mediaUpdateSchema = exports.mediaCreateSchema.partial();
