const mongoose = require("mongoose");

//Schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand required"],
      unique: [true, "brand must be unique"],
      minlength: [3, "Too short brand name"],
      maxlength: [20, "Too long brand name"],
    },

    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);

const setImageURL = (dec) => {
  if (dec.image) {
    const imageUrl = `${process.env.BASE_URL}/brands/${dec.image}`;
    dec.image = imageUrl;
  }
};
//findOne, findAll and update
brandSchema.post("init", (dec) => {
  setImageURL(dec);
});
//create 
brandSchema.post("save", (dec) => {
  setImageURL(dec);
});

//model
const brandModel = mongoose.model("Brand", brandSchema);

module.exports = brandModel;
