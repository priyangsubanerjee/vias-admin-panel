import connectDatabase from "@/db/connect";
import product from "@/db/models/product";

const handler = async (req, res) => {
    const { method } = req;
    const { product_id } = req.query;
    await connectDatabase();

    switch (method) {
        case 'GET':
            try {
                const Product = await product.findById(product_id);
                if (!Product) {
                    return res.status(404).json({ error: 'Product not found', data: Product });
                }
                res.json(Product);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
            break;
        default:
            res.status(405).json({ error: `Method ${method} Not Allowed` });
    }
};

export default handler;
