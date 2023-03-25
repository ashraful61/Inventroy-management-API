const Category = require("../models/Category");

// Save / Create a category
exports.createCategoryService = async (data) => {
  const result = await Category.create(data);
  return result;
};

//Get all category
exports.getCategoriesService = async () => {
  const categories = await Category.find({});
  return categories;
};

// Get category by id
exports.getCategoryByIdService = async (id) => {
  const category = await Category.findById(id);
  return category;
};

//Update category
exports.updateCategoryByIdService = async (categoryId, data) => {
  const updatedCategory = await Category.updateOne(
    { _id: categoryId },
    { $set: data },
    { runValidators: true }
  );
  return updatedCategory;
};

