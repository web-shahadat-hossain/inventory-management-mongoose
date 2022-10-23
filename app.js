const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// schema

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

    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "supplier",
    },
    catagories: [
      {
        name: {
          required: true,
          type: String,
        },
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

//middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
