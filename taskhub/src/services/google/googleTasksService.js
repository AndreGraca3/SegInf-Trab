const { GOOGLE_TASKS_ENDPOINT } = require("./googleUris");

async function getTasksFromUser(token) {
  const res = await fetch(
    GOOGLE_TASKS_ENDPOINT,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const tasksListDetails = await res.json();
  return tasksListDetails.items;
}

module.exports = {
  getTasksFromUser,
};
