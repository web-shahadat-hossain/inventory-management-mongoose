const mongoose = require("mongoose");

// schema design start here

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide the name"],
      trim: true,
      unique: true,
      minLength: [3, "please provide min 3character name"],
      maxLength: [150, "max character 150"],
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
      enum: ["pcs", "litre", "kg"],
    },

    status: {
      type: String,
      required: true,
      enum: ["Out-Stock", "Stock"],
    },

    quantity: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
        message: " quantity must be integer",
      },

      status: {
        type: String,
        required: true,
        enum: {
          value: ["in stock", " out stock"],
          message: "must be statues",
        },
      },
    },

    //   createdAT: {
    //     type: Date,
    //     default: Date.now,
    //   },
    //   updatedAT: {
    //     type: Date,
    //     default: Date.now,
    //   },

    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "supplier",
    // },
    // catagories: [
    //   {
    //     name: {
    //       required: true,
    //       type: String,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);
// middleware
productSchema.pre("save", function (next) {
  if (this.quantity == 0) {
    this.status = "Out-Stock";
  }
  next();
});

// productSchema.post("save", function (doc, next) {
//   console.log("after");
//   next();
// });

// Model

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
