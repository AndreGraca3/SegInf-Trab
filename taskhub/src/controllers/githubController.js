const express = require("express");
const githubService = require("../services/github/githubService");
const router = express.Router();

router.get("/github/repos", async (req, rsp) => {
  const { google, github } = req.cookies;
  const repos = await githubService.getReposFromUser(github.token);
  rsp.render("repos", { repos, google, github });
});

module.exports = router;
