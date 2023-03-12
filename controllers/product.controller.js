const Product = require("../models/Product");
const {
  getProductsService,
  createProductService,
} = require("../services/product.services");

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
