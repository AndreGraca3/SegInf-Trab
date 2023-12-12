const express = require("express");
const randomstring = require("randomstring");
const { CALLBACK_PATH } = require("./constants");
const googleService = require("./services/googleService");

const router = express.Router();

router.get("/login", (req, rsp) => {
  const state = randomstring.generate();
  rsp.cookie("state", state, { maxAge: 30000, httpOnly: true });

  rsp.redirect(302, googleService.getGoogleOAuthUrl(state));
});

router.get(CALLBACK_PATH, async (req, rsp) => {
  const { code, state } = req.query;
  const { state: cookieState } = req.cookies;
  if (state !== cookieState) {
    rsp.status(401).send("Unauthorized");
    return;
  }
  rsp.clearCookie("state");
  const token = await googleService.getGoogleToken(code);
  // TODO: store token in cookie?
});

module.exports = router;
