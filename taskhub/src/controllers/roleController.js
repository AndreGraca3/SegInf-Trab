const express = require("express");
const { canAccess } = require("../services/roleService");

const router = express.Router();

router.use(async (req, rsp, next) => {
  const isPermitted = await canAccess(
    req.cookies.user.name,
    req.path,
    req.method
  );
  if (isPermitted) {
    next();
  } else {
    rsp
      .status(403)
      .send("Forbidden, you don't have role permission to make this action");
  }
});

module.exports = router;
