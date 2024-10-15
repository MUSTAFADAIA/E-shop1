const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: [true, "subCategory must be unique"],
    minlength: [2, "to short SubCatgory name"],
    maxlength: [50, "to long SubCatgory name"],
  },
  slug: {
    type: String,
    lowercase: true,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: [true, "SubCategory must be belong to parent category "],
  },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
