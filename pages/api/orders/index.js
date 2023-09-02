import connectDatabase from "@/db/connect";
import orders from "@/db/models/orders";

export default async function handler(req, res) {
  await connectDatabase();
  let orders_ = await orders.find();
  return res.status(200).json({ success: true, orders: orders_ });
}
