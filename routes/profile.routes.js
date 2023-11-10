const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares");

// GET "/profile" => Renderizar vista perfil usuario

router.get("/", isLoggedIn, async (req, res, next) => {
  console.log("Información del usuario", req.session.user); // Información del user que hace la llamada
  console.log("ID del usuario:", req.session.user._id); // ID del user que hace la llamada

  // Buscar en la BD información del user

  try {
    const userProfile = await User.findById(req.session.user._id);
    res.render("profiles/user.hbs", {
      userProfile,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
