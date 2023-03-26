const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const uploader = require('../middleware/uploader')

router.post(
  "/file-upload",
  uploader.single("image"),
  productController.fileUpload
); // If I want to send multiple image then uploader.array("image")

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct);

router.route("/update/:id").patch(productController.updateProductById);
router.route("/bulkUpdate").patch(productController.bulkUpdateProduct);
router.route("/delete/:id").delete(productController.deleteProductById);
router.route("/getProductById/:id").get(productController.getProductById);
router.route("/bulkDelete").delete(productController.bulkDeleteProduct);

module.exports = router;
