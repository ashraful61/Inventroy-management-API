const Store = require("../models/Store");

// Save / Create a store
exports.createStoreService = async (data) => {
  const result = await Store.create(data);
  return result;
};

//Get all store
exports.getStoreService = async () => {
  const categories = await Store.find({});
  return categories;
};

// Get store by id
exports.getStoreByIdService = async (id) => {
  const store = await Store.findById(id);
  return store;
};

//Update store
exports.updateStoreByIdService = async (storeId, data) => {
  const updatedStore = await Store.updateOne(
    { _id: storeId },
    { $set: data },
    { runValidators: true }
  );
  return updatedStore;
};

