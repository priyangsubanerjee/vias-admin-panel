import connectDatabase from "@/db/connect";
import product from "@/db/models/product";

export default async function handler(req, res) {
  const { id } = JSON.parse(req.body);
  await connectDatabase();

  try {
    await product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Product could not be deleted",
    });
  }
}
