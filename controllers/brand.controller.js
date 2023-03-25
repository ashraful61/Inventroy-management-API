const Brand = require("../models/Brand");
const mongoose = require("mongoose");
const {
  getBrandsService,
  createBrandService,
  getBrandByIdService,
  updateBrandByIdService,
} = require("../services/brand.services");
const { ObjectId } = mongoose.Types;

//Save a brand
module.exports.createBrand = async (req, res, next) => {
  try {
    // create
    const brand = await createBrandService(req.body);
    // brand.logger();
    res.status(200).json({
      status: true,
      message: "Brand added successfully",
      data: brand,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Brand is not inserted",
      error: error.message,
    });
  }
};

//Get all Brand
module.exports.getBrands = async (req, res, next) => {
  try {
    const result = await getBrandsService();
    res.status(200).json({
      status: true,
      message: "Brand list",
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

// Get brand by id
module.exports.getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // need to add this code in global service for validate id
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({
        status: false,
       
        error: "Invalid id",
      });
    }
    const brand = await getBrandByIdService(id);
    if (!brand) {
      res.status(400).json({
        status: false,
        message: "Couldn't find the brand with this id",
        error: error.message,
      });
    }
    res.status(200).json({
      status: true,
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Data not found",
      error: error.message,
    });
  }
};

//Update a brand
module.exports.updateBrandById = async (req, res, next) => {
  try {
    // update brand
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({
        status: false,
       
        error: "Invalid id",
      });
    }
    const brand = await updateBrandByIdService(id, req.body);
    console.log(brand);
    if (!brand.nModified) {
      res.status(400).json({
        status: false,
        message: "Couldn't update the brand with this id",
        error: error.message,
      });
    }

    res.status(200).json({
      status: true,
      message: "Brand updated successfully",
      data: brand,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to update brand",
      error: error.message,
    });
  }
};

//Bulk update  products
module.exports.bulkUpdateBrand = async (req, res, next) => {
  try {
    const brand = await bulkUpdateBrandService(req.body);

    res.status(200).json({
      status: true,
      message: "Brands were updated successfully",
      data: brand,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to update products",
      error: error.message,
    });
  }
};

//Delete a brand
module.exports.deleteBrandById = async (req, res, next) => {
  try {
    // update brand
    const { id } = req.params;
    const deletedBrand = await deleteBrandByIdService(id);
    if (!deletedBrand.deletedCount) {
      return res.status(404).json({
        status: false,
        message: "Count not delete the brand!",
      });
    }

    res.status(200).json({
      status: true,
      message: "Brand deleted successfully",
      data: brand,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to delete brand",
      error: error.message,
    });
  }
};

//Bulk delete brand
module.exports.bulkDeleteBrand = async (req, res, next) => {
  try {
    const deletedBrands = await bulkDeleteBrandService(req.body);

    res.status(200).json({
      status: true,
      message: "Brands were deleted successfully",
      data: deletedBrands,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to delete products",
      error: error.message,
    });
  }
};
