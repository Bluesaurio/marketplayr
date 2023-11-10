const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

//! GET "/auth/register" => Renderizar el formulario de registro
router.get("/register", (req, res, next) => {
  res.render("auth/register.hbs");
});

//! POST "/auth/register" => Recibir los datos del usuario y crearlos en la DB
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
    res.redirect("/auth/login");
  } catch (error) {
    next(error);
  }
});

//! GET "/auth/login" => Renderizar formulario de inicio de sesión

router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});

//! POST "/auth/login" => Recibir datos e iniciar una sesión y redirigir a home

router.post("/login", async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  // validar que los campos estén llenos
  if (email === "" || password === "") {
    res.status(400).render("auth/login.hbs", {
      errorMessage: "Faltan campos por rellenar",
    });
    return;
  }

  // validar que el correo/usuario exista
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser === null) {
      res.status(400).render("auth/login.hbs", {
        errorMessage: "Usuario no registrado",
      });
      return;
    }
    // validar contraseña válida

    console.log(foundUser);
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    console.log("la contraseña es valida?", isPasswordValid);
    if (isPasswordValid === false) {
      res.status(400).render("auth/login.hbs", {
        errorMessage: "Contraseña incorrecta.",
      });
      return;
    }
    // cuando esté todo ok, crear sesión activa
    const sessionInfo = {
      _id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
    };
    req.session.user = sessionInfo;
    req.session.save(() => {
      // redirigir a home
      res.redirect("/profile");
    });
  } catch (error) {
    next(error);
  }
});

// GET "auth/logout" cerrar sesión activa y redireccionar a "/"

router.get("/logout", (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
