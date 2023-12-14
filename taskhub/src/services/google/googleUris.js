const AUTHORIZATION_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";

const USERINFO_SCOPE_ENDPOINT =
  "https://www.googleapis.com/auth/userinfo.profile";
const EMAIL_SCOPE_ENDPOINT = "https://www.googleapis.com/auth/userinfo.email";
const TASKS_SCOPE_ENDPOINT = "https://www.googleapis.com/auth/tasks";
const TASKS_LISTS_ENDPOINT =
  "https://www.googleapis.com/tasks/v1/users/@me/lists";

const getTasksFromListEndpoint = (listId) =>
  `https://www.googleapis.com/tasks/v1/lists/${listId}/tasks`;
const getTaskFromListEndpoint = (listId, taskId) =>
  `https://www.googleapis.com/tasks/v1/lists/${listId}/tasks/${taskId}`;

module.exports = {
  AUTHORIZATION_ENDPOINT,
  TOKEN_ENDPOINT,
  USERINFO_SCOPE_ENDPOINT,
  EMAIL_SCOPE_ENDPOINT,
  TASKS_SCOPE_ENDPOINT,
  TASKS_LISTS_ENDPOINT,
  getTasksFromListEndpoint,
  getTaskFromListEndpoint,
};
