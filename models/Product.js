const mongoose = require("mongoose");

//Schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product "],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too long"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs"],
        message: "unit can't be {VALUE}, must be kg/litre/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          }
          return false;
        },
      },
      message: "quantity must be an integer",
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message:
          "status can't be {VALUE}, must be in-stock/out-of-stock/discontinued",
      },
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },

    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    timestamps: true, // above commented createdAt and updatedAt code will equal to this line
    // _id: true/false //if users gives _id input _id: _id other wise mongoose generate _id
  }
);

//mongoose middleware for saving data: pre/post
productSchema.pre("save", function (next) {
  console.log("Before saving data");
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  }
  next();
});
// productSchema.post("save", function (doc, next) {
//   console.log("After saving data");
//   next();
// });

productSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

//SCHEMA -> MODEL -> QUERY
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
