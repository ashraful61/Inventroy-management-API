const Supplier = require("../models/Supplier");
const mongoose = require("mongoose");
const {
  getSuppliersService,
  createSupplierService,
  getSupplierByIdService,
  updateSupplierByIdService,
  deleteSupplierByIdService
} = require("../services/supplier.services");
const { ObjectId } = mongoose.Types;

//Save a supplier
module.exports.createSupplier = async (req, res, next) => {
  try {
    // create
    const supplier = await createSupplierService(req.body);
    // supplier.logger();
    res.status(200).json({
      status: true,
      message: "Supplier added successfully",
      data: supplier,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Supplier is not inserted",
      error: error.message,
    });
  }
};

//Get all Supplier
module.exports.getSuppliers = async (req, res, next) => {
  try {
    const result = await getSuppliersService();
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

// Get supplier by id
module.exports.getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // need to add this code in global service for validate id
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({
        status: false,
        error: "Invalid id",
      });
    }
    const supplier = await getSupplierByIdService(id);
    if (!supplier) {
      res.status(400).json({
        status: false,
        message: "Couldn't find the supplier with this id",
        error: error.message,
      });
    }
    res.status(200).json({
      status: true,
      data: supplier,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Data not found",
      error: error.message,
    });
  }
};

//Update a supplier
module.exports.updateSupplierById = async (req, res, next) => {
  try {
    // update supplier
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({
        status: false,
        error: "Invalid id",
      });
    }
    const supplier = await updateSupplierByIdService(id, req.body);
    console.log(supplier);
    if (!supplier.nModified) {
      res.status(400).json({
        status: false,
        message: "Couldn't update the supplier with this id",
        error: error.message,
      });
    }

    res.status(200).json({
      status: true,
      message: "Supplier updated successfully",
      data: supplier,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to update supplier",
      error: error.message,
    });
  }
};

//Bulk update  products
module.exports.bulkUpdateSupplier = async (req, res, next) => {
  try {
    const supplier = await bulkUpdateSupplierService(req.body);

    res.status(200).json({
      status: true,
      message: "Suppliers were updated successfully",
      data: supplier,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to update products",
      error: error.message,
    });
  }
};

//Delete a supplier
module.exports.deleteSupplierById = async (req, res, next) => {
  try {
    // update supplier
    const { id } = req.params;
    const deletedSupplier = await deleteSupplierByIdService(id);
    console.log(deletedSupplier)
    if (!deletedSupplier.deletedCount) {
      return res.status(404).json({
        status: false,
        message: "Couldn't not delete the supplier!",
      });
    }
    console.log('hi')
    res.status(200).json({
      status: true,
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to delete supplier",
      error: error.message,
    });
  }
};

//Bulk delete supplier
module.exports.bulkDeleteSupplier = async (req, res, next) => {
  try {
    const deletedSuppliers = await bulkDeleteSupplierService(req.body);

    res.status(200).json({
      status: true,
      message: "Suppliers were deleted successfully",
      data: deletedSuppliers,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to delete products",
      error: error.message,
    });
  }
};
