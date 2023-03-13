const Product = require("../models/Product");

//Get all product
exports.getProductsService = async () => {
  const products = await Product.find({});
  return products;
};

// Get product by id
exports.getProductByIdService = async (id) => {
  const product = await Product.find({ _id: id });
  return product;
};

//Save a product
exports.createProductService = async (data) => {
  const product = await Product.create(data);
  return product;
};

//Update product
exports.updateProductService = async (productId, data) => {
   //Update way: 1 for update
  const updatedProduct = await Product.updateOne(
    { _id: productId },
    { $set: data },
    { runValidators: true }
  );

  // //Update way: 2 for update
  // const product = await Product.findById(productId);
  // const result = await product.set(data).save();

  //  Update way: 3
  // const updatedProduct = await Product.updateOne(
  //   { _id: productId },
  //   { $inc: data }
  // );

  return updatedProduct;
};
