const GOOGLE_AUTHORIZATION_ENDPOINT =
  "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";

const GOOGLE_USERINFO_SCOPE_ENDPOINT = "https://www.googleapis.com/auth/userinfo.profile"
const GOOGLE_EMAIL_SCOPE_ENDPOINT = "https://www.googleapis.com/auth/userinfo.email"
const GOOGLE_TASKS_SCOPE_ENDPOINT = "https://www.googleapis.com/auth/tasks"
const GOOGLE_TASKS_ENDPOINT = "https://www.googleapis.com/tasks/v1/users/@me/lists"

module.exports = {
  GOOGLE_AUTHORIZATION_ENDPOINT,
  GOOGLE_TOKEN_ENDPOINT,
  GOOGLE_USERINFO_SCOPE_ENDPOINT,
  GOOGLE_EMAIL_SCOPE_ENDPOINT,
  GOOGLE_TASKS_SCOPE_ENDPOINT,
  GOOGLE_TASKS_ENDPOINT
};
