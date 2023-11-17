const express = require("express");
const router = express.Router();

const Order = require("../models/Order.model.js");
const Product = require("../models/Product.model.js");
const { isLoggedIn } = require("../middlewares/auth.middlewares.js");

//GET "order/:productId/details" => Renderizar vista del pedido
router.get("/:productId/details", isLoggedIn, async (req, res, next) => {
  try {
    const videogameOrder = await Product.findById(req.params.productId);
    res.render("order/order-details.hbs", { videogameOrder });
  } catch (error) {
    next(error);
  }
});

//POST "/order/:productID/details" => busca la ID del producto elegido y crea un pedido (orden) y redirige al perfil
router.post("/:productId/details", isLoggedIn, async (req, res, next) => {
  const { address, status } = req.body;
  const { productId } = req.params;

  try {
    const orderedProduct = await Product.findById(productId).populate("seller");
    const newOrder = await Order.create({
      buyer: req.session.user._id,
      seller: orderedProduct.seller._id,
      product: productId,
      address,
      status,
      orderPrice: orderedProduct.price,
    });

    await Product.findByIdAndUpdate(productId, { onSale: false });

    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
