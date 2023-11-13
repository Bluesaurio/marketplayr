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

// GET "/product/:productId" => Renderizar un formulario para editar la informaciónd del producto
router.get("/:productId/edit", async (req, res, next) => {
  try {
    const productEdit = await Product.findById(req.params.productId);
    res.render("product/product-edit.hbs", {
      productEdit,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/:productId/delete", async (req, res, next) => {
  console.log("Borrando producto", req.params.productId);

  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
