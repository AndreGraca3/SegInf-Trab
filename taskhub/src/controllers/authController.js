const express = require("express");
const randomstring = require("randomstring");
const googleAuthService = require("../services/google/googleAuthService");
const { CALLBACK_PATH } = require("../constants");

const router = express.Router();

router.get("/login", (req, rsp) => {
  const state = randomstring.generate();
  rsp.cookie("state", state, { maxAge: 30000, httpOnly: true });
  rsp.redirect(302, googleAuthService.getGoogleOAuthUrl(state));
});

router.get(CALLBACK_PATH, async (req, rsp) => {
  const { code, state } = req.query;
  const { state: cookieState } = req.cookies;

  if (state !== cookieState) {
    rsp.status(401).send("Unauthorized state mismatch");
    return;
  }
  rsp.clearCookie("state");

  const token = await googleAuthService.getGoogleToken(code);
  const userInfo = await googleAuthService.getGoogleUserInfo(token);
  const user = {
    name: userInfo.name,
    email: userInfo.email,
    picture: userInfo.picture,
    token: token,
  };
  rsp.cookie("user", user, { maxAge: 10 * (60 * 1000), httpOnly: true });
  rsp.status(302).redirect("/");
});

router.use((req, rsp, next) => {
  if (req.cookies.user) {
    next();
  } else {
    rsp.status(302).redirect("/");
  }
});

module.exports = router;
