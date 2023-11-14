const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Order = require("../models/Order.model.js");
const Product = require("../models/Product.model.js");
const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares.js");

//GET "order/:productId/details" => Renderizar vista del pedido
router.get("/:productId/details", isLoggedIn, async (req, res, next) => {
  try {
    const videogameOrder = await Product.findById(req.params.productId);
    res.render("order/order-details.hbs", { videogameOrder });
  } catch (error) {
    next(error);
  }
});

router.post("/:productId/details", isLoggedIn, async (req, res, next) => {
  const { address, status } = req.body;
  const { productId } = req.params;
  console.log(req.session.user._id);
  console.log(req.body);

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

    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
