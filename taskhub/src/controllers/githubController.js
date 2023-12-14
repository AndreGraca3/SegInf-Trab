const express = require("express");
const githubService = require("../services/github/githubService");
const googleTasksService = require("../services/google/googleTasksService");
const router = express.Router();

router.get("/github/repos", async (req, rsp) => {
  const { google, github } = req.cookies;

  const reposPromise = githubService.getReposFromUser(github.token);
  const listsPromise = googleTasksService.getListsFromUser(google.token);
  const [repos, lists] = await Promise.all([reposPromise, listsPromise]);

  rsp.render("repos", { repos, lists, google, github });
});

module.exports = router;
