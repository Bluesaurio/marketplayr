const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const User = require("../models/User.model");

// GET "/product/:productId" => Renderizar vista de detalles producto
router.get("/:productId", (req, res, next) => {
  res.render("product/product-details.hbs");
});

module.exports = router;
