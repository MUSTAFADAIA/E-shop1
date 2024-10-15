const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const { uploadMixOfImages } = require("../middlewares/uploadImageMiddleware");

const productModel = require("../models/productModel");
const factory = require("./handlersFactory");

exports.uploadProductImages = uploadMixOfImages([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  // console.log(req.files);
  //1- Image processing for imageCover
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${imageCoverFileName}`);

    // Save image into our db
    req.body.imageCover = imageCoverFileName;
  }
  //2- Image processing for images
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${imageName}`);

        // Save image into our db
        req.body.images.push(imageName);
      })
    );

    next();
  }
});

//@desc   Get list of product
//@route   GET /api/v1/products
//@access   Public
exports.getProducts = factory.getAll(productModel, "Products");
// asyncHandler(async (req, res) => {
//1)Filtering
//   const queryStringObj = { ...req.query };
//   const excludesFields = ["page", "sort", "limit", "fields"];
//   excludesFields.forEach((field) => delete queryStringObj[field]);

//   //Apply filteration using [gte,gt,lte,lt]
//   let queryStr = JSON.stringify(queryStringObj);
//   queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

//   //2)pagination
//   const page = req.query.page * 1 || 1;
//   const limit = req.query.limit * 1 || 5;
//   const skip = (page - 1) * limit;

//   //Build query
//   const mongooseQuery = productModel
//     .find(JSON.parse(queryStr))
//     .skip(skip)
//     .limit(limit)
//     .populate({ path: "category", select: "name -_id" });

//   //3)Sorting
//   if (req.query.sort) {
//     const sortBy = req.query.sort.split(",").join(" ");
//     mongooseQuery.sort(sortBy);
//   } else {
//     mongooseQuery.sort("-createdAt");
//   }

//   //4)Fields Limiting
//   if (req.query.fields) {
//     const fields = req.query.fields.split(",").join(" ");
//     mongooseQuery.select(fields);
//   } else {
//     mongooseQuery.select("-__v");
//   }

//   //5)Search
//   // if (req.query.keyword) {
//   //   const query = {};
//   //   query.$or = [
//   //     { title: { $regex: req.query.keyword, $options: "i" } },
//   //     { description: { $regex: req.query.keyword, $options: "i" } },
//   //   ];
//   //   mongooseQuery.find(query);
//   // }

//   if (req.query.keyword) {
//     const keyword = req.query.keyword;
//     const regex = new RegExp(keyword, 'i'); // إنشاء regex
//     const query = {
//       $or: [
//         { title: regex },
//         { description: regex },
//       ],
//     };

//     console.log(query); // تحقق من الاستعلام

//     try {
//       const products = await productModel.find(query);

//       // تحقق من النتائج
//       console.log(products);

//       res.status(200).json({
//         success: true,
//         results: products.length, // عدد النتائج
//         page: 1, // افتراض صفحة واحدة هنا إذا لم تكن تستخدم pagination
//         data: products, // عرض النتائج
//       });
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: 'خطأ في البحث عن المنتجات',
//         error: error.message,
//       });
//     }
//   } else {
//     res.status(400).json({
//       success: false,
//       message: 'يرجى توفير الكلمة المفتاحية للبحث',
//     });
//   }
//   //Execute query
//   const product = await mongooseQuery;

//   res.status(200).json({ results: product.length, page, data: product });
// });
//اختصرنا الكود في كلاس لحال
// Build query
//   const documentsCounts = await productModel.countDocuments();
//   const apiFeatures = new ApiFeatures(productModel.find(), req.query)
//     .paginate(documentsCounts)
//     .filter()
//     .search()
//     .limitFields()
//     .sort();

//   // Execute query
//   const { mongooseQuery, paginationResult } = apiFeatures;
//   const product = await mongooseQuery;

//   res
//     .status(200)
//     .json({ results: product.length, paginationResult, data: product });
// });

//@desc   Get specific product by id
//@route   GET /api/v1/products/:id
//@access   public
exports.getProduct = factory.getOne(productModel, "reviews");

//@desc   Create product
//@route   POST /api/v1/products
//@access   provate
exports.createProduct = factory.createOne(productModel);

//@desc   Update product
//@route   PUT /api/v1/products:id
//@access   provate
exports.updateProduct = factory.updateOne(productModel);
//@desc   Delete product
//@route   DELETE /api/v1/products/:id
//@access   provate
exports.deleteProduct = factory.deleteOne(productModel);
