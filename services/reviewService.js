const reviewModel = require("../models/reviewModel");
const factory = require("./handlersFactory");
const asyncHandler = require("express-async-handler");

//Nested rout
//Get /api/v1/products/:productId/review
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.productId) filterObject = { product: req.params.productId };
  req.filterObjects = filterObject;
  next();
};

//@desc   Get list of review
//@route   GET /api/v1/review
//@access   Public
exports.getReviews = factory.getAll(reviewModel);
//@desc   Get specific review by id
//@route   GET /api/v1/review/:id
//@access   public
exports.getReview = factory.getOne(reviewModel);


//Nested rout
exports.setProductIdToBody = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if(!req.body.user) req.body.user=req.user._id
  next();
};
//@desc   Create review
//@route   POST /api/v1/review
//@access   private/Protect/User
exports.createReview = factory.createOne(reviewModel);

//@desc   Update review
//@route   PUT /api/v1/review:id
//@access    private/Protect/User
exports.updateReview = factory.updateOne(reviewModel);

//@desc   Delete review
//@route   DELETE /api/v1/review/:id
//@access    private/Protect/User-Admin-Manager
exports.deleteReview = factory.deleteOne(reviewModel);
