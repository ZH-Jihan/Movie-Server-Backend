import { z } from "zod";

export const mediaCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(["MOVIE", "SERIES"]),
  genres: z.array(z.string()).min(1),
  releaseYear: z.number().int(),
  duration: z.number().int(),
  price: z.number(),
  rentPrice: z.number(),
  streamingLink: z.string().url(),
  drmProtected: z.boolean().optional(),
  isPublished: z.boolean().optional(),
});

export const mediaUpdateSchema = mediaCreateSchema.partial();
