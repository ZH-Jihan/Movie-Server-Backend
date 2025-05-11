import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { loginUser, registerUser } from "./auth.controller";
import { loginUserSchema, registerUserSchema } from "./auth.validation";

const router = Router();

router
  .route("/register")
  .post(validateRequest(registerUserSchema), registerUser);
router.route("/login").post(validateRequest(loginUserSchema), loginUser);

export const AuthRoutes = router;
