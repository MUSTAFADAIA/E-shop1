const express = require("express");
const {
  getSubCategoryValidator,
  createSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utills/validators/subcategoryValidator ");
const {
  getsubCategories,
  getsubCategory,
  createSubCategory,
  updatesubCategory,
  deletesubCategory,
  setCategoryTdToBody,
  createFilterObj,
} = require("../services/subcategoryService");
const AuthService = require("../services/authService");

//mergeParams : Allow us to access parameters on other routers
//ex:we need to access categoryId form category router
const router = express.Router({ mergeParams: true });
router
  .route("/")
  .post(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    setCategoryTdToBody,
    createSubCategoryValidator,
    createSubCategory
  )
  .get(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    createFilterObj,
    getsubCategories
  );
router
  .route("/:id")
  .get(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    getSubCategoryValidator,
    getsubCategory
  )
  .put(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    updateSubCategoryValidator,
    updatesubCategory
  )
  .delete(
    AuthService.protect,
    AuthService.allowedTo("admin", "manager"),
    deleteSubCategoryValidator,
    deletesubCategory
  );
module.exports = router;
