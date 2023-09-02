import connectDatabase from "@/db/connect";
import product from "@/db/models/product";

export default async function handler(req, res) {
  await connectDatabase();
  const {
    id,
    name,
    modelNumber,
    productImages,
    description,
    category,
    color,
    doorStyle,
    constructionType,
    features,
    cabinetStyle,
    collections,
  } = JSON.parse(req.body);
  console.log(id);

  let product_ = await product.findOneAndUpdate(
    {
      _id: id,
    },
    {
      name,
      modelNumber,
      productImages,
      description,
      category,
      color,
      doorStyle,
      constructionType,
      features,
      cabinetStyle,
      collections,
    }
  );

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
  });
}
