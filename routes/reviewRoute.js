const express = require("express");
const {
  createReviewValidator,
  getReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("../utills/validators/reviewValidator");
const {
  getReview,
  getReviews,
  createReview,
  deleteReview,
  updateReview,
  createFilterObj,
  setProductIdToBody,
} = require("../services/reviewService");
const AuthService = require("../services/authService");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(createFilterObj, getReviews)
  .post(
    AuthService.protect,
    AuthService.allowedTo("user"),
    setProductIdToBody,
    createReviewValidator,
    createReview
  );
router
  .route("/:id")
  .get(getReviewValidator, getReview)
  .put(
    AuthService.protect,
    AuthService.allowedTo("user"),
    updateReviewValidator,
    updateReview
  )
  .delete(
    AuthService.protect,
    AuthService.allowedTo("user", "admin", "manager"),
    deleteReviewValidator,
    deleteReview
  );
module.exports = router;
