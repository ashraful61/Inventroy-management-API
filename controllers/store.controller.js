const Store = require("../models/Store");
const mongoose = require("mongoose");

const {
  getStoreService,
  createStoreService,
  getStoreByIdService,
  updateStoreByIdService,
} = require("../services/store.services");
const { ObjectId } = mongoose.Types;

//Save / create a store
module.exports.createStore = async (req, res, next) => {
  try {
    const store = await createStoreService(req.body);
    res.status(200).json({
      status: true,
      message: "Store added successfully",
      data: store,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Store is not inserted",
      error: error.message,
    });
  }
};

//Get all Store
module.exports.getStore = async (req, res, next) => {
  try {
    const result = await getStoreService();
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

// Get store by id
module.exports.getStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // need to add this code in global service for validate id
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({
        status: false,
        error: "Invalid id",
      });
    }
    const store = await getStoreByIdService(id);
    if (!store) {
      res.status(400).json({
        status: false,
        message: "Couldn't find the store with this id",
        error: error.message,
      });
    }
    res.status(200).json({
      status: true,
      data: store,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Data not found",
      error: error.message,
    });
  }
};

//Update a store
module.exports.updateStoreById = async (req, res, next) => {
  try {
    // update store
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(404).json({
        status: false,
       
        error: "Invalid id",
      });
    }
    const store = await updateStoreByIdService(id, req.body);
    console.log(store);
    if (!store.nModified) {
      res.status(400).json({
        status: false,
        message: "Couldn't update the store with this id",
        error: error.message,
      });
    }

    res.status(200).json({
      status: true,
      message: "Store updated successfully",
      data: store,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to update store",
      error: error.message,
    });
  }
};

//Bulk update  Store
module.exports.bulkUpdateStore = async (req, res, next) => {
  try {
    const store = await bulkUpdateStoreService(req.body);

    res.status(200).json({
      status: true,
      message: "Store were updated successfully",
      data: store,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to update Store",
      error: error.message,
    });
  }
};

//Delete a store
module.exports.deleteStoreById = async (req, res, next) => {
  try {
    // update store
    const { id } = req.params;
    const deletedStore = await deleteStoreByIdService(id);
    if (!deletedStore.deletedCount) {
      return res.status(404).json({
        status: false,
        message: "Count not delete the store!",
      });
    }

    res.status(200).json({
      status: true,
      message: "Store deleted successfully",
      data: store,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to delete store",
      error: error.message,
    });
  }
};

//Bulk delete Store
module.exports.bulkDeleteStore = async (req, res, next) => {
  try {
    const deletedStore = await bulkDeleteStoreService(req.body);

    res.status(200).json({
      status: true,
      message: "Store were deleted successfully",
      data: deletedStore,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to delete Store",
      error: error.message,
    });
  }
};
