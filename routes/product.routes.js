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
    const response = await fetch(
      `https://api.rawg.io/api/games/${oneVideogame.apiId}?key=${process.env.API_KEY}`
    );
    const apiProduct = await response.json();
    // console.log(oneVideogame);
    res.render("product/product-details.hbs", {
      oneVideogame,
      apiProduct,
    });
  } catch (error) {
    next(error);
  }
});

// A ver si esto funciona

module.exports = router;
