import connectDatabase from "@/db/connect";
import orders, { findById } from "@/db/models/orders";

export default async function handler(req, res) {
  const { id, status, details } = JSON.parse(req.body);
  await connectDatabase();

  try {
    const order = await orders.findByIdAndUpdate(id, {
      $set: {
        "shippingStatus.status": status,
        "shippingStatus.details": details,
        "shippingStatus.date": Date.now(),
      },
    });
    await order.save();
    res.status(200).json({ success: true, message: "Shipment updated" });
  } catch (error) {
    console.log(error);
    res.status(200).json({ success: false, message: error.message });
  }
}
