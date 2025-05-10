import bycript from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../utils/ApiError";
import prisma from "../../utils/prisma";
import { TLoginUser, TRegisterUser } from "./auth.interface";

const registerUser = async (payload: TRegisterUser) => {
  const hashedPassword = await bycript.hash(
    payload.password,
    Number(config.salt_round)
  );

  const user = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
  });
  return user;
};

// loginUser function
const logInUser = async (payload: TLoginUser) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  const isPasswordValid = await bycript.compare(
    payload.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "Dosn't match email or password"
    );
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    config.JWT_SECRET as string,
    { expiresIn: config.JWT_EXPIRES } as jwt.SignOptions
  );

  return token;
};

// Reset password function
const resetPassword = async (email: string, newPassword: string) => {
  const hashedPassword = await bycript.hash(
    newPassword,
    Number(config.salt_round)
  );

  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return user;
};

export const AuthServices = {
  registerUser,
  logInUser,
  resetPassword,
};
