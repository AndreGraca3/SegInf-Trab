async function getTasksFromUser(token) {
  const res = await fetch(
    "https://www.googleapis.com/tasks/v1/users/@me/lists",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return await res.json();
}

module.exports = {
  getTasksFromUser,
};
