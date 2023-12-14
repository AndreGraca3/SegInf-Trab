const express = require("express");
const githubService = require("../services/github/githubService");
const router = express.Router();

router.get("/github/:owner/repos", async (req, rsp) => {
  const { owner } = req.params;
  const repos = await githubService.getReposFromUser(owner);
  rsp.json(repos);
});

module.exports = router;
