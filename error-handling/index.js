const { updateLocals } = require("../middlewares/auth.middlewares.js");

module.exports = (app) => {
  app.use(updateLocals, (req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).render("not-found");
  });

  app.use(updateLocals, (err, req, res, next) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    console.error("ERROR", req.method, req.path, err);

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res.status(500).render("error");
    }
  });
};
