const express = require("express");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utills/validators/productValidator");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
  resizeProductImages,
} = require("../services/productService");
const router = express.Router();
const AuthService = require("../services/authService");
const reviewRoute= require('../routes/reviewRoute')

router.use('/:productId/reviews',reviewRoute)
router
  .route("/")
  .get(
    AuthService.protect,
    AuthService.allowedTo("user","admin", "manager"),
    getProducts
  )
  .post(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  );
router
  .route("/:id")
  .get(
    AuthService.protect,
    AuthService.allowedTo("user","admin", "manager"),
    getProductValidator,
    getProduct
  )
  .put(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
  )
  .delete(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    deleteProductValidator,
    deleteProduct
  );
module.exports = router;
