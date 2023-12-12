const express = require("express");
const googleTasksService = require("../services/google/googleTasksService");

const router = express.Router();

router.get("/tasks", async (req, rsp) => {
  const user = req.cookies.user;
  const tasks = await googleTasksService.getTasksFromUser(user.token);
  console.log(tasks);
  rsp.render("tasks", { user });
});

module.exports = router;
