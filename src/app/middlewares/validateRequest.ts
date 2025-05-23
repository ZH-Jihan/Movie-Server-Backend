import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Request Params: ", req.body);
      // validation check
      //if everything allright next() ->
      await schema.parseAsync(req.body);

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;
