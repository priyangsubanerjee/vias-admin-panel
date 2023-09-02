import connectDatabase from "@/db/connect";
import product from "@/db/models/product";

export default async function handler(req, res) {
  await connectDatabase();
  let products = await product.find();
  return res.status(200).json({ success: true, products: products });
}
