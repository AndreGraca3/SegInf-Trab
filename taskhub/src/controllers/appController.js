const express = require("express");

const router = express.Router();

router.get("/", (req, rsp) => {
  rsp.render("home", {user: req.cookies.user});
});

module.exports = router;
