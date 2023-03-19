const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

//Schema design
const stockSchema = mongoose.Schema(
  {
    productId: {
      id: ObjectId,
      required: true,
      ref: "Product",
    },

    name: {
      type: String,
      required: [true, "Please provide a name for this product "],
      trim: true,
      unique: [true, "Name must be unique"],
      lowercase: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too long"],
    },
    
    description: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit can't be {VALUE}, must be kg/litre/pcs/bag",
      },
    },

    imageUrls: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },
          message: "Please provide valid url",
        },
      },
    ],

    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Brand",
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
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },

    suppliedBy: {
      name: {
        type: String,
        required: [true, "Please provide a store name"],
        trim: true,
      },
      id: {
        type: ObjectId,
        ref: "Supplier",
      },
    },

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
stockSchema.pre("save", function (next) {
  console.log("Before saving data");
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  }
  next();
});

stockSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

//SCHEMA -> MODEL -> QUERY
const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
