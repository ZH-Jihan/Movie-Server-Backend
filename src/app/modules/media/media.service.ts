import { Media } from "../../../../generated/prisma";
import prisma from "../../utils/prisma";

const createMedia = async (payload: Media) => {
  const newMedia = await prisma.media.create({
    data: payload,
  });

  return newMedia;
};
