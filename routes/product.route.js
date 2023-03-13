const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router.route("/update/:id").patch(productController.updateProduct);

router.route("/getProductById/:id").get(productController.getProductById);

module.exports = router;
