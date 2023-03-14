const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router.route("/update/:id").patch(productController.updateProductById);
router.route("/bulkUpdate").patch(productController.bulkUpdateProduct);
router.route("/delete/:id").delete(productController.deleteProductById);
router.route("/getProductById/:id").get(productController.getProductById);

module.exports = router;
