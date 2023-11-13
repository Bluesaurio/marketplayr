const express = require("express");
const router = express.Router();

// GET /admin para renderizar el perfil de admin

router.get("/", (req, res, next) => {
  res.render("admin/admin.hbs");
});

module.exports = router;
