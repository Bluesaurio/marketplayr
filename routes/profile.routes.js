const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares");
const Product = require("../models/Product.model");

// GET "/profile" => Renderizar vista perfil usuario

router.get("/", isLoggedIn, async (req, res, next) => {
  console.log("Información del usuario", req.session.user); // Información del user que hace la llamada
  console.log("ID del usuario:", req.session.user._id); // ID del user que hace la llamada

  // Buscar en la BD información del user
  try {
    const userProfile = await User.findById(req.session.user._id);
    res.render("profile/user.hbs", {
      userProfile,
    });
  } catch (error) {
    next(error);
  }
});

// GET "/profile/add-product" => Renderizar un formulario para crear productos
router.get("/add-product", (req, res, next) => {
  res.render("profile/add-product.hbs");
});

// POST "/profile/add-product" => Crear el producto en la BD con la info del form y redireccionar al producto

router.post("/add-product", async (req, res, next) => {
  console.log(req.body);
  const {
    title,
    platform,
    edition,
    releaseYear,
    developer,
    publisher,
    price,
    genre,
    stock,
  } = req.body;

  try {
    const newProduct = await Product.create({
      title,
      platform,
      edition,
      releaseYear,
      developer,
      publisher,
      price,
      genre,
      stock,
      seller: req.session.user._id,
    });
    res.redirect(`/product/${newProduct._id}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
