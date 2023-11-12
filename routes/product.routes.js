const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const User = require("../models/User.model");

// GET "/product/:productId" => Renderizar vista de detalles producto
router.get("/:productId", async (req, res, next) => {
  try {
    const oneVideogame = await Product.findById(req.params.productId);
    res.render("product/product-details.hbs", {
      oneVideogame,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
