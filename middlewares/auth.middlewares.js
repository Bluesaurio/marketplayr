function isLoggedIn(req, res, next) {
  if (req.session.user === undefined) {
    res.redirect("/auth/login");
  } else {
    next();
  }
}

function updateLocals(req, res, next) {
  if (req.session.user === undefined) {
    res.locals.isSessionActive = false;
  } else {
    res.locals.isSessionActive = true;
    if (req.session.user.role === "admin") {
      res.locals.isAdmin = true;
    } else {
      res.locals.isAdmin = false;
    }
  }
  next();
}

// TODO si quieren ver enlaces de admin o boton en el nav de admin cuando el usuario sea de tipo admin deben crear nuevas propiedades de res.locals

function isAdmin(req, res, next) {
  if (req.session.user.role === "admin") {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = {
  isLoggedIn,
  updateLocals,
  isAdmin,
};
