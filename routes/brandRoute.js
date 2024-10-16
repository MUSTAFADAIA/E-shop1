const express = require("express");
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require("../utills/validators/brandValidator ");
const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require("../services/brandService ");
const AuthService = require("../services/authService");

const router = express.Router();

router
  .route("/")
  .get(
    AuthService.protect,
    AuthService.allowedTo("user","admin", "manager"),
    getBrands
  )
  .post(
    AuthService.protect,
    AuthService.allowedTo("user","admin", "manager"),
    uploadBrandImage,
    resizeImage,
    createBrandValidator,
    createBrand
  );
router
  .route("/:id")
  .get(
    AuthService.protect,
    AuthService.allowedTo("user","admin", "manager"),
    getBrandValidator,
    getBrand
  )
  .put(
    AuthService.protect,
    AuthService.allowedTo("user","admin", "manager"),
    uploadBrandImage,
    resizeImage,
    updateBrandValidator,
    updateBrand
  )
  .delete(
    AuthService.protect,
    AuthService.allowedTo("user","admin", "manager"),
    deleteBrandValidator,
    deleteBrand
  );
module.exports = router;
