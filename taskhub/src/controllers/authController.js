const express = require("express");
const randomstring = require("randomstring");
const googleAuthService = require("../services/google/googleAuthService");
const githubAuthService = require("../services/github/githubAuthService");
const {
  GOOGLE_CALLBACK_PATH,
  GOOGLE_STATE_COOKIE_NAME,
  GITHUB_STATE_COOKIE_NAME,
  GITHUB_CALLBACK_PATH,
  GOOGLE_COOKIE_NAME,
  GITHUB_COOKIE_NAME,
} = require("../constants");
const { getRoleFromUser } = require("../services/roleService");

const router = express.Router();

// Login with Google
router.get("/login/google", (req, rsp) => {
  const state = randomstring.generate();
  rsp.cookie(GOOGLE_STATE_COOKIE_NAME, state, {
    maxAge: 30000,
    httpOnly: true,
  });
  rsp.redirect(302, googleAuthService.getGoogleOAuthUrl(state));
});

router.get(GOOGLE_CALLBACK_PATH, async (req, rsp) => {
  const { code, state } = req.query;
  const cookieState = req.cookies[GOOGLE_STATE_COOKIE_NAME];

  if (state !== cookieState) {
    rsp.status(401).json({
      title: "Unauthorized",
      status: 401,
      message: "Unauthorized state mismatch",
    });
    return;
  }
  rsp.clearCookie(GOOGLE_STATE_COOKIE_NAME);

  const token = await googleAuthService.getGoogleToken(code);
  const userInfo = await googleAuthService.getGoogleUserInfo(token);
  const google = {
    name: userInfo.name,
    email: userInfo.email,
    picture: userInfo.picture,
    token: token,
    role: await getRoleFromUser(userInfo.name),
  };
  rsp.cookie(GOOGLE_COOKIE_NAME, google, {
    maxAge: 60 * (60 * 1000),
    httpOnly: true,
  });
  rsp.status(302).redirect("/");
});

router.get("/logout/google", (req, rsp) => {
  rsp.clearCookie(GOOGLE_COOKIE_NAME);
  rsp.redirect("/");
});

// Login with GitHub
router.get("/login/github", (req, rsp) => {
  const state = randomstring.generate();
  rsp.cookie(GITHUB_STATE_COOKIE_NAME, state, {
    maxAge: 30000,
    httpOnly: true,
  });
  rsp.redirect(302, githubAuthService.getGithubOAuthUrl(state));
});

router.get(GITHUB_CALLBACK_PATH, async (req, rsp) => {
  const { code, state } = req.query;
  const cookieState = req.cookies[GITHUB_STATE_COOKIE_NAME];

  if (state !== cookieState) {
    rsp.status(401).json({
      title: "Unauthorized",
      status: 401,
      message: "Unauthorized state mismatch",
    });
    return;
  }
  rsp.clearCookie(GITHUB_STATE_COOKIE_NAME);
  const token = await githubAuthService.getGithubToken(code);

  const userInfo = await githubAuthService.getGithubUserInfo(token);
  const github = {
    name: userInfo.login,
    picture: userInfo.avatar_url,
    token: token,
  };
  rsp.cookie(GITHUB_COOKIE_NAME, github, {
    maxAge: 60 * (60 * 1000),
    httpOnly: true,
  });
  rsp.status(302).redirect("/");
});

router.get("/logout/github", (req, rsp) => {
  rsp.clearCookie(GITHUB_COOKIE_NAME);
  rsp.redirect("/");
});

// Force authentication with Google
const forceGoogleAuth = (req, rsp, next) => {
  if (req.cookies[GOOGLE_COOKIE_NAME]) {
    next();
  } else {
    rsp.status(401).json({
      title: "Unauthorized",
      status: 401,
      message: "Unauthorized with Google",
    });
  }
};

// Force authentication with GitHub
const forceGithubAuth = (req, rsp, next) => {
  if (req.cookies[GITHUB_COOKIE_NAME]) {
    next();
  } else {
    rsp.status(401).json({
      title: "Unauthorized",
      status: 401,
      message: "Unauthorized with GitHub",
    });
  }
};

module.exports = {
  router,
  forceGoogleAuth,
  forceGithubAuth,
};