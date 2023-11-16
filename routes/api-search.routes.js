const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model.js");

// GET "/api-search" => renderizar resultados de la búsqueda introducida en el campo de búsqueda

router.get("/", async (req, res, next) => {
  try {
    const searchTitle = req.query.searchTitle || "";

    const response = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.API_KEY}`
    );

    const data = await response.json();

    res.json({ results: data.results });

    console.log(data.results);

    // console.log("Respuesta; ", data);

    // data.results.forEach((game) => {
    //   console.log(game.name);
    // });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
