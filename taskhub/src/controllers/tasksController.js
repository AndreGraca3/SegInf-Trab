const express = require("express");
const googleTasksService = require("../services/google/googleTasksService");

const router = express.Router();

router.get("/lists", async (req, rsp) => {
  const user = req.cookies.user;
  const lists = await googleTasksService.getListsFromUser(user.token);

  const listsWithTasks = await Promise.all(
    lists.map(async (list) => {
      const tasks = await googleTasksService.getTasksFromList(
        list.id,
        user.token
      );

      return {
        ...list,
        updated: new Date(list.updated).toLocaleDateString(),
        tasks,
      };
    })
  );

  rsp.render("lists", {
    user,
    lists: listsWithTasks,
  });
});

router.post("/lists", async (req, rsp) => {
  const { title } = req.body;
  const user = req.cookies.user;
  const newList = await googleTasksService.createList(title, user.token);
  rsp.status(201).send(newList);
});

router.post("/lists/:listId/tasks", async (req, rsp) => {
  const { listId } = req.params;
  const { title } = req.body;
  const user = req.cookies.user;
  const newTask = await googleTasksService.createTask(listId, title, user.token);
  rsp.status(201).send(newTask);
});

router.delete("/lists/:listId/tasks/:taskId", async (req, rsp) => {
  const { listId, taskId } = req.params;
  const user = req.cookies.user;
  await googleTasksService.deleteTaskFromList(listId, taskId, user.token);
  rsp.status(200).send();
});

module.exports = router;
