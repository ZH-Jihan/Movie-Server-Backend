import { PurchaseStatus, PurchaseType } from "@prisma/client";
import SSLCommerzPayment from "sslcommerz-lts";
import { v4 as uuidv4 } from "uuid";
import config from "../../config";
import prisma from "../../utils/prisma";

const store_id = config.sslcommerz_store_id;
const store_passwd = config.sslcommerz_api_key;
const is_live = false; // set to true in production

export const createPurchase = async (
  id: string,
  payload: { mediaId: string; discount: number; type: PurchaseType }
) => {
  const user = await prisma.user.findUnique({ where: { id } });
  const media = await prisma.media.findUnique({
    where: { id: payload.mediaId },
  });

  // const isPending = await prisma.purchase.findFirst({
  //   where: { userId: id, mediaId: payload.mediaId, type: "BUY" },
  // });
  // if (isPending) {
  //   throw new Error("You have already purchased now complete the payment");
  // }
  if (!media) {
    throw new Error("Media not found");
  }

  const calculate = payload.type === "BUY" ? media.price : media.rentPrice;
  const price =
    payload.discount === 0 ? calculate : (calculate * payload.discount) / 100;

  const tran_id = uuidv4();
  const post_body = {
    total_amount: price,
    currency: "BDT",
    tran_id: tran_id,
    success_url: `http://localhost:5000/api/purchases/success/${tran_id}`,
    fail_url: `http://localhost:5000/api/purchases/failed/${tran_id}`,
    cancel_url: `http://localhost:5000/api/purchases/failed/${tran_id}`,
    ipn_url: `http://localhost:3000/payment/ipn`,
    product_category: media?.type,
    product_name: media?.title,
    cus_name: user?.name,
    cus_email: user?.email,
    cus_add1: "address",
    cus_phone: "0000000000", // use unique tra
    shipping_method: "Courier",
    product_profile: "general",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  // Initiate SSLCommerz payment session
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  const response = await sslcz.init(post_body);

  // Redirect the user to payment gateway
  const GatewayPageURL = response.GatewayPageURL;

  // Save purchase in DB with PENDING status
  const purchase = await prisma.purchase.create({
    data: {
      mediaId: payload.mediaId,
      type: payload.type,
      price: price,
      userId: id,
      status: PurchaseStatus.PENDING,
      transactionId: tran_id,
    },
  });
  console.log(purchase);
  return { url: GatewayPageURL };
};

// update status when payment succesfully
export const updatePurchaseStatus = async (transactionId: string) => {
  const result = await prisma.purchase.findFirst({
    where: { transactionId },
  });
  console.log("result", result);

  if (result) {
    const update = await prisma.purchase.update({
      where: { id: result.id },
      data: { status: "COMPLETED" },
    });
    return update;
  }
};

// when status failed then delete purchase order
export const deletePurchase = async (transactionId: string) => {
  const result = await prisma.purchase.findFirst({
    where: { transactionId },
  });
  if (result) {
    return await prisma.purchase.delete({ where: { id: result.id } });
  }
};

// get all purchases of a user
export const getUserPurchases = async (userId: string) => {
  return prisma.purchase.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { media: true },
  });
};

// get purchase by transactionId
export const getPurchaseByTransactionId = async (transactionId: string) => {
  const result = await prisma.purchase.findFirst({
    where: { transactionId },
    include: { media: true, user: true },
  });
  return result;
};
