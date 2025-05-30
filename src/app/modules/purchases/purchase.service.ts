import Stripe from "stripe";
import prisma from "../../utils/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-05-28.basil",
});

export const createPurchase = async ({
  userId,
  mediaId,
  type,
  price,
  paymentMethodId,
}: {
  userId: string;
  mediaId: string;
  type: "RENT" | "BUY";
  price: number;
  paymentMethodId: string;
}) => {
  // Create Stripe PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(price * 100), // in cents
    currency: "usd", // or make dynamic for international
    payment_method: paymentMethodId,
    confirm: true,
  });

  // Save purchase in DB
  const purchase = await prisma.purchase.create({
    data: {
      userId,
      mediaId,
      type,
      price,
      status: paymentIntent.status === "succeeded" ? "COMPLETED" : "PENDING",
      transactionId: paymentIntent.id,
    },
  });

  return purchase;
};

export const updatePurchaseStatus = async (
  id: string,
  status: "COMPLETED" | "PENDING"
) => {
  return prisma.purchase.update({ where: { id }, data: { status } });
};

export const getUserPurchases = async (userId: string) => {
  return prisma.purchase.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { media: true },
  });
};
