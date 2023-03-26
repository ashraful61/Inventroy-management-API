const Product = require("../models/Product");
const {
  getProductsService,
  createProductService,
  getProductByIdService,
  bulkUpdateProductService,
  updateProductByIdService,
  deleteProductByIdService,
  bulkDeleteProductService,
} = require("../services/product.services");

//Get all product
module.exports.getProducts = async (req, res, next) => {
  try {
    const products = await getProductsService();
    res.status(200).json({
      status: true,
      message: "Product list",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Data not found",
      error: error.message,
    });
  }
};

// Get product by id
module.exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);
    res.status(200).json({
      status: true,
      // message: "Product list",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Data not found",
      error: error.message,
    });
  }
};

//Save a product
module.exports.createProduct = async (req, res, next) => {
  try {
    // create
    const product = await createProductService(req.body);
    // product.logger();
    //save
    // const product = new Product(req.body);
    // const result = await product.save();
    // if (product.quantity === 0) {
    //   product.status = "out-of-stock";
    // }
    res.status(200).json({
      status: true,
      message: "Product added successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Product is not inserted",
      error: error.message,
    });
  }
};

//Update a product
module.exports.updateProductById = async (req, res, next) => {
  try {
    // update product
    const { id } = req.params;
    const product = await updateProductByIdService(id, req.body);

    res.status(200).json({
      status: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

//Bulk update  products
module.exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const product = await bulkUpdateProductService(req.body);

    res.status(200).json({
      status: true,
      message: "Products were updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to update products",
      error: error.message,
    });
  }
};

//Delete a product
module.exports.deleteProductById = async (req, res, next) => {
  try {
    // update product
    const { id } = req.params;
    const deletedProduct = await deleteProductByIdService(id);
    if (!deletedProduct.deletedCount) {
      return res.status(404).json({
        status: false,
        message: "Count not delete the product!",
      });
    }

    res.status(200).json({
      status: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

//Bulk delete product
module.exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const deletedProducts = await bulkDeleteProductService(req.body);

    res.status(200).json({
      status: true,
      message: "Products were deleted successfully",
      data: deletedProducts,
    });
  } catch (error) {
    res.status(400).send({
      status: false,
      message: "Failed to delete products",
      error: error.message,
    });
  }
};

module.exports.fileUpload = async (req, res) => {
  try {
    //req.files if i want to upload multiple images using uploader.array("image") instead of uploader.single("image")
    res.status(200).json(req.file);
  } catch (error) {}
};
