const categoryRoute = require("./categoryRoute");
const subCategoryRoute = require("./subcategoryRoute");
const brandRoute = require("./brandRoute");
const productRoute = require("./productRoute");
const userRoute = require("./userRoute");
const authRoute = require("./authRoute");
const reviewRoute = require("./reviewRoute");
const wishlistRoute = require("./wishlistRoute");
const addressRoute = require("./addressRoute");
const couponRoute = require("./couponRoute");
const cartRoute = require("./cartRoute");
const orderRoute = require("./orderRoute");

const mountRoutes = (app) => {
  app.use("/api/v2/categories", categoryRoute);
  app.use("/api/v2/subcategories", subCategoryRoute);
  app.use("/api/v2/brands", brandRoute);
  app.use("/api/v2/products", productRoute);
  app.use("/api/v2/users", userRoute);
  app.use("/api/v2/auth", authRoute);
  app.use("/api/v2/review", reviewRoute);
  app.use("/api/v2/wishlist", wishlistRoute);
  app.use("/api/v2/address", addressRoute);
  app.use("/api/v2/coupons", couponRoute);
  app.use("/api/v2/cart", cartRoute);
  app.use("/api/v2/order", orderRoute);
};

module.exports = mountRoutes;
