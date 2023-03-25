const Brand = require("../models/Brand");

// Save / Create a brand
exports.createBrandService = async (data) => {
  const brand = await Brand.create(data);
  return brand;
};

//Get all brand
exports.getBrandsService = async () => {
  const brands = await Brand.find({}).populate("products");
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

//delete a brand
exports.deleteBrandByIdService = async (brandId) => {
  const deletedBrand = await Brand.deleteOne({ _id: brandId });
  console.log('deletedBrand',deletedBrand)
  return deletedBrand;
};
