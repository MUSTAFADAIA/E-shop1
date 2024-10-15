const brandModel = require("../models/brandModel");
const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");

exports.uploadBrandImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now}.jpeg`;
  if(req.file){
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${filename}`);
  }
  //Save image into our db
  req.body.image = filename;
  next();
});

//@desc   Get list of brand
//@route   GET /api/v1/brand
//@access   Public
exports.getBrands = factory.getAll(brandModel);
//@desc   Get specific brand by id
//@route   GET /api/v1/brand/:id
//@access   public
exports.getBrand = factory.getOne(brandModel);
//@desc   Create brand
//@route   POST /api/v1/brand
//@access   provate
exports.createBrand = factory.createOne(brandModel);

//@desc   Update brand
//@route   PUT /api/v1/brand:id
//@access   provate
exports.updateBrand = factory.updateOne(brandModel);

//@desc   Delete brand
//@route   DELETE /api/v1/brand/:id
//@access   provate
exports.deleteBrand = factory.deleteOne(brandModel);
