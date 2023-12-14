const express = require("express");
const googleTasksService = require("../services/google/googleTasksService");

const router = express.Router();

router.get("/lists", async (req, rsp) => {
  const googleSession = req.cookies.google;
  const lists = await googleTasksService.getListsFromUser(googleSession.token);

  const listsWithTasks = await Promise.all(
    lists.map(async (list) => {
      const tasks = await googleTasksService.getTasksFromList(
        list.id,
        googleSession.token
      );

      return {
        ...list,
        updated: new Date(list.updated).toLocaleDateString(),
        tasks,
      };
    })
  );

  rsp.render("lists", {
    google: googleSession,
    github: req.cookies.github,
    lists: listsWithTasks,
  });
});

router.post("/lists", async (req, rsp) => {
  const { title } = req.body;
  const googleSession = req.cookies.google;
  const newList = await googleTasksService.createList(title, googleSession.token);
  rsp.status(201).send(newList);
});

router.post("/lists/:listId/tasks", async (req, rsp) => {
  const { listId } = req.params;
  const { title } = req.body;
  const googleSession = req.cookies.google;
  const newTask = await googleTasksService.createTask(
    listId,
    title,
    googleSession.token
  );
  rsp.status(201).send(newTask);
});

router.delete("/lists/:listId/tasks/:taskId", async (req, rsp) => {
  const { listId, taskId } = req.params;
  const googleSession = req.cookies.google;
  await googleTasksService.deleteTaskFromList(listId, taskId, googleSession.token);
  rsp.status(200).send();
});

module.exports = router;
