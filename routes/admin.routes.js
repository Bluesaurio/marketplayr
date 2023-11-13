const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const {
  isLoggedIn,
  updateLocals,
  isAdmin,
} = require("../middlewares/auth.middlewares.js");

// GET /admin para renderizar el perfil de admin

router.get("/", isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.find().select({ username: 1 });
    console.log("lista de usuarios: ", allUsers);
    res.render("admin/admin.hbs", { allUsers });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
