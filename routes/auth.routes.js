const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User.model");

// GET "/auth/register" => Renderizar el formulario de registro
router.get("/register", (req, res, next) => {
  res.render("auth/register.hbs");
});

// POST "/auth/signup" => Recibir los datos del usuario y crearlos en la DB
router.post("/register", async (req, res, next) => {
  console.log(req.body);

  const { username, email, password } = req.body;

  //* Los campos deben estar llenos
  if (!username || !email || !password) {
    console.log("Faltan campos por rellenar");
    res.status(400).render("auth/register.hbs", {
      errorMessage: "Faltan campos por rellenar",
    });

    return;
  }

  //* El username tiene que tener mínimo X chars
  if (username.length < 6) {
    console.log("Username tiene que tener más de 6 carácteres");
    res.status(400).render("auth/register.hbs", {
      errorMessage: "El usuario tiene que tener más de 6 carácteres",
    });

    return;
  }

  //* Password tiene que ser seguro
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  if (passwordRegex.test(password) === false) {
    res.status(400).render("auth/register.hbs", {
      errorMessage:
        "La contraseña no es suficientemente segura. Debe tener como mínimo 8 carácteres, mayúsculas, minúsculas y un número.",
    });
    return;
  }

  //* Email con formato correcto
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gm;

  if (emailRegex.test(email) === false) {
    res.status(400).render("auth/register.hbs", {
      errorMessage: "El formato del correo electrónico no es correcto",
    });
    return;
  }

  //* Username o email no repetido
  try {
    const foundUserWithSameEmail = await User.findOne({ email });

    if (foundUserWithSameEmail !== null) {
      res.status(400).render("auth/register.hbs", {
        errorMessage: "Este correo electrónico ya existe",
      });
      return;
    }

    const foundUserWithSameUsername = await User.findOne({ username });

    if (foundUserWithSameUsername !== null) {
      res.status(400).render("auth/register.hbs", {
        errorMessage: "Este usuario  ya existe",
      });
      return;
    }

    //* Cifrar la contraseña del user
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    //* Si todo sale bien, creamos el usuario
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    //* Redirección
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
