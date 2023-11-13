const express = require("express");
const router = express.Router();
const {
  isLoggedIn,
  updateLocals,
  isAdmin,
} = require("../middlewares/auth.middlewares.js");

// GET /admin para renderizar el perfil de admin

router.get("/", isAdmin, (req, res, next) => {
  res.render("admin/admin.hbs");
});

module.exports = router;
