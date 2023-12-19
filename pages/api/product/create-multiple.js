import connectDatabase from "@/db/connect";
import product from "@/db/models/product";

export default async function handler(req, res) {
    await connectDatabase();
    if (req.method !== "POST") {
        return res.status(400).json({ success: false, message: "Invalid request method." });
    }
    try {
        const { products } = JSON.parse(req.body);
        if (!products || !Array.isArray(products)) {
            return res.status(400).json({ success: false, message: "Invalid request data." });
        }
        const insertedProducts = await product.insertMany(products);
        res.status(200).json({ success: true, message: "Products Created successfully", data: insertedProducts });
    } catch (error) {
        console.error("Error creating products:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}