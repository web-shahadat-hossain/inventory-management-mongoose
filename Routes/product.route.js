const express = require("express");
const productControllers = require("../Controllers/product.controller");
const router = express.Router();

router
  .route("/")
  .get(productControllers.getProduct)
  .post(productControllers.createProduct);

module.exports = router;
