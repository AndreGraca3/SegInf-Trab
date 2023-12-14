const express = require("express");

const router = express.Router();

router.get("/", (req, rsp) => {
  const session = {
    google: req.cookies.google,
    github: req.cookies.github,
  };
  rsp.render("home", session);
});

module.exports = router;
