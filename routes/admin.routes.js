const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares.js");

// GET /admin para renderizar el perfil de admin

router.get("/", isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.find().select({ username: 1, _id: 1 });
    console.log();
    res.render("admin/admin.hbs", { allUsers });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// GET "/admin/:userId/details" renderizar detalles del usuario seleccionado en la lista

router.get("/:userId/details", isAdmin, async (req, res, next) => {
  console.log(req.params.userId);
  try {
    const userDetails = await User.findById(req.params.userId);
    res.render("admin/user-details.hbs", { userDetails });
  } catch (error) {
    next(error);
  }
});
