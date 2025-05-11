import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

const validateRequest =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        message: "Validation error",
        errors: result.error.errors,
      });
      return;
    }
    req.body = result.data;
    next();
  };

export default validateRequest;
