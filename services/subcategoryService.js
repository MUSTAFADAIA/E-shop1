const subcategoryModel = require("../models/subCategoryModel");
const factory = require("./handlersFactory");

exports.setCategoryTdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
//Nested rout
//Get /api/v1/categories/:categoryId/subcategory
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObjects = filterObject;
  next();
};
//@desc   Get list of subcategory
//@route   GET /api/v1/subcatecories
//@access   Public
exports.getsubCategories = factory.getAll(subcategoryModel);

//@desc   Get specific subcategory by id
//@route   GET /api/v1/subcatecories/:id
//@access   public
exports.getsubCategory = factory.getOne(subcategoryModel);

//@desc   Create subcategory
//@route   POST /api/v1/subcatecories
//@access   provate
exports.createSubCategory = factory.createOne(subcategoryModel);

//@desc   Update subcategory
//@route   PUT /api/v1/subcatecories:id
//@access   provate
exports.updatesubCategory = factory.updateOne(subcategoryModel);

//@desc   Delete subcategory
//@route   DELETE /api/v1/subcatecories/:id
//@access   provate
exports.deletesubCategory = factory.deleteOne(subcategoryModel);
