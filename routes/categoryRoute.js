const express = require("express");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
} = require("../utills/validators/categoryValidator");

const AuthService = require('../services/authService')

const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage,
} = require("../services/categoryService");
const subcategoriesRoute = require("./subcategoryRoute");
const router = express.Router();

// هاد الراوت بجيب الساب كاتيقوري الي بينتمي لكاتوقري معين
router.use("/:categoryId/subcategories", subcategoriesRoute);

router
  .route("/")
  .get(getCategories)
  .post(
    AuthService.protect,
    AuthService.allowedTo("user","admin","manager"),
    uploadCategoryImage,
    resizeImage,
    createCategoryValidator,
    createCategory
  );
router
  .route("/:id")
  .get(   AuthService.protect,
    AuthService.allowedTo("user","admin","manager"),getCategoryValidator, getCategory)
  .put(
    AuthService.protect,
    AuthService.allowedTo("user","admin","manager"),uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(   AuthService.protect,
    AuthService.allowedTo("user","admin","manager"),deleteCategoryValidator, deleteCategory);
module.exports = router;
