import connectDatabase from "@/db/connect";
import product from "@/db/models/product";

export default async function handler(req, res) {
    await connectDatabase();
    const { id, collections } = JSON.parse(req.body);
    const existingProduct = await product.findById(id);
    const updatedCollections = existingProduct.collections.concat(collections);
    const updatedProduct = await product.findByIdAndUpdate(
        id,
        { collections: updatedCollections },
        { new: true }
    );

    res.status(200).json({
        success: true,
        message: "Product Collection updated successfully",
    });
}
