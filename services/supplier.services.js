const Supplier = require("../models/Supplier");

// Save / Create a supplier
exports.createSupplierService = async (data) => {
  const supplier = await Supplier.create(data);
  return supplier;
};

//Get all supplier
exports.getSuppliersService = async () => {
  const suppliers = await Supplier.find({})
  return suppliers;
};

// Get supplier by id
exports.getSupplierByIdService = async (id) => {
  const supplier = await Supplier.findById(id);
  return supplier;
};

//Update supplier
exports.updateSupplierByIdService = async (supplierId, data) => {
  const updatedSupplier = await Supplier.updateOne(
    { _id: supplierId },
    { $set: data },
    { runValidators: true }
  );
  return updatedSupplier;
};

// //Bulk update suppliers
// exports.bulkUpdateSupplierService = async (data) => {
//   const suppliers = [];
//   for (const supplier of data.list) {
//     const updatedSupplier = supplier.updateOne(
//       { _id: supplier.id },
//       { $set: { price: supplier.price } },
//       { runValidators: true }
//     );
//     suppliers.push(updatedSupplier);
//   }
//   const result = await Promise.all(suppliers);
//   console.log(result);
//   return result;
// };

//delete a supplier
exports.deleteSupplierByIdService = async (supplierId) => {
  const deletedSupplier = await Supplier.deleteOne({ _id: supplierId });
  console.log('deletedSupplier',deletedSupplier)
  return deletedSupplier;
};
