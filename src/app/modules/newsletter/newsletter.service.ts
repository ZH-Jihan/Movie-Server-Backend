import { Newsletter } from "@prisma/client";
import prisma from "../../utils/prisma";

const getAllNewsletters = async () => {
  return prisma.newsletter.findMany({ orderBy: { createdAt: "desc" } });
};

const getNewsletterById = async (id: string) => {
  return prisma.newsletter.findUnique({ where: { id } });
};

const createNewsletter = async (payload: Newsletter) => {
  const newsletter = await prisma.newsletter.create({ data: payload });
  return newsletter;
};

const updateNewsletter = async (id: string, payload: Newsletter) => {
  const newsletter = await prisma.newsletter.update({
    where: { id },
    data: payload,
  });
  return newsletter;
};

const deleteNewsletter = async (id: string) => {
  const deleted = await prisma.newsletter.delete({ where: { id } });
  return !!deleted;
};

export const NewsletterServices = {
  getAllNewsletters,
  getNewsletterById,
  createNewsletter,
  updateNewsletter,
  deleteNewsletter,
};
