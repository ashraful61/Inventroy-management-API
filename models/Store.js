const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a store name"],
      trim: true,
      lowercase: true,
      enum: {
        values: [
          "dhaka",
          "chattogram",
          "rajshahi",
          "khulna",
          "barishal",
          "rangpur",
        ],
        message: "{VALUE} is not valid name",
      },
    },
    description: String,

    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    manager: {
      name: {
        type: String,
        contactNumber: String,
        id: {
          type: ObjectId,
          ref: "User",
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
