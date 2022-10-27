const {
  getProductService,
  createProductService,
} = require("../Services/product.service");

exports.getProduct = async (req, res) => {
  try {
    const result = await getProductService();
    // const result = await Product.findById(undefined);

    if (!result) {
      res.status(400).send({
        message: "No data found",
        status: false,
      });
    }

    res.status(200).send({
      status: true,
      message: "successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).send({
      status: false,
      message: "Sorry, there is a problem with the query",
      error: err.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  // save or create
  try {
    // create

    const result = await createProductService(req.body);

    // save
    // const product = new Product(req.body);
    // const result = await product.save();
    res.status(200).send({
      status: true,
      message: "Successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).send({
      status: false,
      message: "not saved",
      data: err.message,
    });
  }
};
