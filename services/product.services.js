const Product = require("../models/Product");
const Brand = require("../models/Brand");

//Get all product
exports.getProductsService = async () => {
  const products = await Product.find({});
  return products;
};

// Get product by id
exports.getProductByIdService = async (id) => {
  const product = await Product.findById(id);
  return product;
};

//Save a product
exports.createProductService = async (data) => {
  const product = await Product.create(data);
  const { _id: productId, brand } = product;
  //_id, brand
  //update brand
  const res = await Brand.updateOne({ _id: brand.id }, { $push: { products: productId } });
  console.log(res)
  return product;
};

//Update product
exports.updateProductByIdService = async (productId, data) => {
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

//Bulk update products
exports.bulkUpdateProductService = async (data) => {
  const products = [];
  for (const product of data.list) {
    const updatedProduct = Product.updateOne(
      { _id: product.id },
      { $set: { price: product.price } },
      { runValidators: true }
    );
    products.push(updatedProduct);
  }
  const result = await Promise.all(products);
  console.log(result);
  return result;
};

//delete product
exports.deleteProductByIdService = async (productId) => {
  const deletedProduct = await Product.deleteOne({ _id: productId });
  return deletedProduct;
};
//delete product
exports.bulkDeleteProductService = async (data) => {
  const deletedProducts = await Product.deleteMany({ _id: data.ids });
  return deletedProducts;
};
