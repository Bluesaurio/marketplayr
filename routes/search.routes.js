const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model.js");

// GET "/search" => renderizar resultados de la búsqueda introducida en el campo de búsqueda

router.get("/", async (req, res, next) => {
  try {
    //* Utilizamos Regex para hacer una búsqueda que no sea case-sensitive
    const regex = new RegExp(req.query.productTitle, "i");
    const videogamesFound = await Product.find({
      title: regex,
    });
    res.render("search/result.hbs", { videogamesFound });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
