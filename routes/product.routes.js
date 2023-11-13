const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const User = require("../models/User.model");

// GET "/product/:productId" => Renderizar vista de detalles producto
router.get("/:productId", async (req, res, next) => {
  try {
    const oneVideogame = await Product.findById(req.params.productId).populate(
      "seller"
    );
    console.log(oneVideogame);
    res.render("product/product-details.hbs", {
      oneVideogame,
    });
  } catch (error) {
    next(error);
  }
});

// GET "/product/:productId" => Renderizar un formulario para editar la informaciónd del producto
router.get("/:productId/edit", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = router;
