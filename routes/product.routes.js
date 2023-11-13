const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const { updateLocals } = require("../middlewares/auth.middlewares.js");

// GET "/product/:productId" => Renderizar vista de detalles producto
router.get("/:productId", updateLocals, async (req, res, next) => {
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

// A ver si esto funciona

module.exports = router;
