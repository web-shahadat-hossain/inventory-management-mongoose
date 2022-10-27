const Product = require("../Model/Products");

exports.getProductService = async () => {
  const product = await Product.find({}).sort({ quantity: -1 });

  return product;
};

exports.createProductService = async (data) => {
  const product = await Product.create(data);

  return product;
};
