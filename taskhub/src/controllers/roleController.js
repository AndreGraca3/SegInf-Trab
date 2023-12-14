const express = require("express");
const rolService = require("../services/roleService");

const router = express.Router();

router.use(async (req, rsp, next) => {
  const isPermitted = await rolService.canAccess(
    req.cookies.user.name,
    req.path,
    req.method
  );
  if (isPermitted) {
    next();
  } else {
    rsp.status(403).send({
      title: "Forbidden",
      status: 403,
      message: "You don't have role permission to make this action",
    });
  }
});

module.exports = router;
