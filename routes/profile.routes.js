const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const {
  isLoggedIn,
  isAdmin,
  updateLocals,
} = require("../middlewares/auth.middlewares");
const Product = require("../models/Product.model");

const uploader = require("../middlewares/cloudinary.middleware");

// GET "/profile" => Renderizar vista perfil usuario

router.get("/", isLoggedIn, updateLocals, async (req, res, next) => {
  console.log("Información del usuario", req.session.user); // Información del user que hace la llamada
  console.log("ID del usuario:", req.session.user._id); // ID del user que hace la llamada

  // Buscar en la BD información del user
  try {
    const userProfile = await User.findById(req.session.user._id);
    const allVideogames = await Product.find({
      seller: req.session.user._id,
    }).select({ title: 1, productPic: 1 });
    if (allVideogames !== null) {
      console.log(allVideogames);

      res.render("profile/user.hbs", {
        userProfile,
        allVideogames,
      });
    } else {
      res.render("profile/user.hbs", {
        userProfile,
      });
    }
  } catch (error) {
    next(error);
  }
});
// GET "/profile/:productId" => renderizar los detalles de los productos del usuario
router.get("/:productId", updateLocals, async (req, res, next) => {
  const productId = await Product.findById(req.params.productId);
  res.render("profile/product-details.hbs", { productId });
});
// GET "/profile/:productId/edit" => Renderizar un formulario para editar la información del producto
router.get("/:productId/edit", updateLocals, async (req, res, next) => {
  try {
    const productEdit = await Product.findById(req.params.productId);
    res.render("profile/product-edit.hbs", {
      productEdit,
    });
  } catch (error) {
    next(error);
  }
});
// POST "/profile/:productId/editProduct" para editar la info que se introduce en el formulario
router.post("/:productId/editProduct", async (req, res, next) => {
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
    const response = await Product.findByIdAndUpdate(req.body);
    res.render("profile/product-edit.hbs", { editedProduct: response });
  } catch (error) {
    next(error);
  }
});
// POST "/profile/:productId/delete" para borrar el producto seleccionado
router.post("/:productId/delete", async (req, res, next) => {
  console.log("Borrando producto", req.params.productId);

  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});
// GET "/profile/add-product" => Renderizar un formulario para crear productos
router.get("/add-product", updateLocals, (req, res, next) => {
  res.render("profile/add-product.hbs");
});

// POST "/profile/add-product" => Crear el producto en la BD con la info del form y redireccionar al producto

router.post(
  "/add-product",
  uploader.single("productPic"),
  async (req, res, next) => {
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
        productPic: req.file.path,
        seller: req.session.user._id,
      });
      res.redirect(`/product/${newProduct._id}`);
    } catch (error) {
      next(error);
    }
  }
);

// Ruta para subir imágenes de perfil
router.post(
  "/upload-picture",
  uploader.single("profilePic"),
  async (req, res, next) => {
    console.log(req.file);

    try {
      await User.findByIdAndUpdate(req.session.user._id, {
        profilePic: req.file.path,
      });
      res.redirect("/profile");
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
