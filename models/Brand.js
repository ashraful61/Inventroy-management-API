const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema(
  {
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],

    name: {
      type: String,
      required: [true, "Please provide a brand name"],
      trim: true,
      unique: true,
      lowercase: true,
      maxLength: [100, "Brand name length can't be greater than 100"],
    },
    description: String,
    email: {
      type: String,
      lowercase: true,
      validate: [validator.isEmail, "Please provide valid email"],
    },
    website: {
      type: String,
      validate: [validator.isURL, "Please provide valid url"],
    },
    location: String,

    suppliers: [
      {
        name: String,
        contactNumber: String,
        id: { type: ObjectId, ref: "Supplier" },
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
