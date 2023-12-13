const express = require("express");
const googleTasksService = require("../services/google/googleTasksService");

const router = express.Router();

router.get("/tasks", async (req, rsp) => {
  const user = req.cookies.user;
  const tasks = await googleTasksService.getTasksFromUser(user.token);
  rsp.render("tasks", {
    user,
    tasks: tasks.map((task) => ({
      ...task,
      updated: new Date(task.updated).toLocaleDateString(),
    })),
  });
});

module.exports = router;
