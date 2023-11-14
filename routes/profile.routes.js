const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { isLoggedIn, isAdmin } = require("../middlewares/auth.middlewares");
const Product = require("../models/Product.model");

const uploader = require("../middlewares/cloudinary.middleware");

// GET "/profile" => Renderizar vista perfil usuario

router.get("/", isLoggedIn, async (req, res, next) => {
  // Buscar en la BD información del user
  try {
    const userProfile = await User.findById(req.session.user._id);
    const allVideogames = await Product.find({
      seller: req.session.user._id,
    }).select({ title: 1, productPic: 1 });
    if (allVideogames !== null) {
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

// POST "/profile/:productId/editProduct" para editar la info que se introduce en el formulario
router.post(
  "/:productId/editProduct",
  uploader.single("productPic"),
  async (req, res, next) => {
    console.log(req.file);
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
      const updateFields = {
        title,
        platform,
        edition,
        releaseYear,
        developer,
        publisher,
        price,
        genre,
        stock,
      };

      if (req.file !== undefined) {
        updateFields.productPic = req.file.path;
      }

      await Product.findByIdAndUpdate(req.params.productId, updateFields);
      res.redirect(`/profile/${req.params.productId}`);
    } catch (error) {
      next(error);
    }
  }
);

// POST "/profile/:productId/delete" para borrar el producto seleccionado

router.post("/:productId/delete", async (req, res, next) => {
  // console.log("Borrando producto", req.params.productId);
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});
// GET "/profile/add-product" => Renderizar un formulario para crear productos
router.get("/add-product", (req, res, next) => {
  res.render("profile/add-product.hbs");
});

// POST "/profile/add-product" => Crear el producto en la BD con la info del form y redireccionar al producto

router.post(
  "/add-product",
  uploader.single("productPic"),
  async (req, res, next) => {
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
      res.redirect(`/profile/${newProduct._id}`);
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

// GET "/profile/:productId" => renderizar los detalles de los productos del usuario
router.get("/:productId", async (req, res, next) => {
  const productId = await Product.findById(req.params.productId);
  res.render("profile/product-details.hbs", { productId });
});
// GET "/profile/:productId/edit" => Renderizar un formulario para editar la información del producto
router.get("/:productId/edit", async (req, res, next) => {
  try {
    const productEdit = await Product.findById(req.params.productId);
    res.render("profile/product-edit.hbs", {
      productEdit,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
