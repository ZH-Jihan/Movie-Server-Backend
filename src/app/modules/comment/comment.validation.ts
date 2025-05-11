import { z } from "zod";

export const commentCreateSchema = z.object({
  text: z.string().min(1),
  reviewId: z.string().uuid(),
  parentId: z.string().uuid().optional(),
});
