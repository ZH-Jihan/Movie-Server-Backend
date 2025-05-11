import { z } from "zod";

export const reviewCreateSchema = z.object({
  rating: z.number().int().min(1).max(10),
  text: z.string().optional(),
  spoiler: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  mediaId: z.string().uuid(),
});

export const reviewUpdateSchema = z.object({
  isApproved: z.boolean().optional(),
  text: z.string().optional(),
  spoiler: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
});
