const Category = require("../models/Category");
const mongoose = require("mongoose");

const {
  getCategoriesService,
  createCategoryService,
  getCategoryByIdService,
  updateCategoryByIdService,
} = require("../services/category.services");
const { ObjectId } = mongoose.Types;

//Save / create a category
module.exports.createCategory = async (req, res, next) => {
  try {
    const category = await createCategoryService(req.body);
    res.status(200).json({
      status: true,
      message: "Category added successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Category is not inserted",
      error: error.message,
    });
  }
};

//Get all Category
module.exports.getCategories = async (req, res, next) => {
  try {
    const result = await getCategoriesService();
    res.status(200).json({
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Data not found",
      error: error.message,
    });
  }
};

// Get category by id
module.exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // need to add this code in global service for validate id
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({
        status: false,
        error: "Invalid id",
      });
    }
    const category = await getCategoryByIdService(id);
    if (!category) {
      res.status(400).json({
        status: false,
        message: "Couldn't find the category with this id",
        error: error.message,
      });
    }
    res.status(200).json({
      status: true,
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Data not found",
      error: error.message,
    });
  }
};

//Update a category
module.exports.updateCategoryById = async (req, res, next) => {
  try {
    // update category
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({
        status: false,
       
        error: "Invalid id",
      });
    }
    const category = await updateCategoryByIdService(id, req.body);
    console.log(category);
    if (!category.nModified) {
      res.status(400).json({
        status: false,
        message: "Couldn't update the category with this id",
        error: error.message,
      });
    }

    res.status(200).json({
      status: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to update category",
      error: error.message,
    });
  }
};

//Bulk update  categories
module.exports.bulkUpdateCategories = async (req, res, next) => {
  try {
    const category = await bulkUpdateCategoriesService(req.body);

    res.status(200).json({
      status: true,
      message: "Categories were updated successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to update categories",
      error: error.message,
    });
  }
};

//Delete a category
module.exports.deleteCategoryById = async (req, res, next) => {
  try {
    // update category
    const { id } = req.params;
    const deletedCategory = await deleteCategoryByIdService(id);
    if (!deletedCategory.deletedCount) {
      return res.status(404).json({
        status: false,
        message: "Count not delete the category!",
      });
    }

    res.status(200).json({
      status: true,
      message: "Category deleted successfully",
      data: category,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to delete category",
      error: error.message,
    });
  }
};

//Bulk delete categories
module.exports.bulkDeleteCategories = async (req, res, next) => {
  try {
    const deletedCategories = await bulkDeleteCategoryService(req.body);

    res.status(200).json({
      status: true,
      message: "Categories were deleted successfully",
      data: deletedCategories,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to delete categories",
      error: error.message,
    });
  }
};
