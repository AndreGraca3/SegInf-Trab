const googleUris = require("./googleUris");

async function getListsFromUser(token) {
  const res = await fetch(googleUris.TASKS_LISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const tasksListDetails = await res.json();
  return tasksListDetails.items;
}

async function createList(title, token) {
  const res = await fetch(googleUris.TASKS_LISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      title,
    }),
  });
  const taskListDetails = await res.json();
  return taskListDetails;
}

async function getTasksFromList(taskId, token) {
  const res = await fetch(googleUris.getTasksFromListEndpoint(taskId), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const taskDetails = await res.json();
  return taskDetails.items;
}

async function createTask(listId, title, token) {
  const res = await fetch(googleUris.getTasksFromListEndpoint(listId), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
    }),
  });
  const taskDetails = await res.json();
  return taskDetails;
}

async function deleteTaskFromList(listId, taskId, token) {
  await fetch(googleUris.getTaskFromListEndpoint(listId, taskId), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

module.exports = {
  getListsFromUser,
  createList,
  getTasksFromList,
  createTask,
  deleteTaskFromList,
};
