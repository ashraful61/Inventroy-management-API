const Brand = require("../models/Brand");

// Save / Create a brand
exports.createBrandService = async (data) => {
  const brand = await Brand.create(data);
  return brand;
};

//Get all brand
exports.getBrandsService = async () => {
  const brands = await Brand.find({}).select("-products -suppliers");
  return brands;
};

// Get brand by id
exports.getBrandByIdService = async (id) => {
  const brand = await Brand.findById(id);
  return brand;
};

//Update brand
exports.updateBrandByIdService = async (brandId, data) => {
  const updatedBrand = await Brand.updateOne(
    { _id: brandId },
    { $set: data },
    { runValidators: true }
  );
  return updatedBrand;
};

// //Bulk update products
// exports.bulkUpdateProductService = async (data) => {
//   const products = [];
//   for (const brand of data.list) {
//     const updatedProduct = brand.updateOne(
//       { _id: brand.id },
//       { $set: { price: brand.price } },
//       { runValidators: true }
//     );
//     products.push(updatedProduct);
//   }
//   const result = await Promise.all(products);
//   console.log(result);
//   return result;
// };

// //delete brand
// exports.deleteProductByIdService = async (productId) => {
//   const deletedProduct = await brand.deleteOne({ _id: productId });
//   return deletedProduct;
// };
// //delete brand
// exports.bulkDeleteProductService = async (data) => {
//   const deletedProducts = await brand.deleteMany({ _id: data.ids });
//   return deletedProducts;
// };
