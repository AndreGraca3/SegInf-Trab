const GOOGLE_AUTHORIZATION_ENDPOINT =
  "https://accounts.google.com/o/oauth2/v2/auth";
const CALLBACK_PATH = "/callback";

const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_ENDPOINT = "https://www.googleapis.com/auth/userinfo.profile"
const GOOGLE_EMAIL_ENDPOINT = "https://www.googleapis.com/auth/userinfo.email"
const GOOGLE_TASKS_ENDPOINT = "https://www.googleapis.com/auth/tasks"

module.exports = {
  GOOGLE_AUTHORIZATION_ENDPOINT,
  CALLBACK_PATH,
  GOOGLE_TOKEN_ENDPOINT,
  GOOGLE_USERINFO_ENDPOINT,
  GOOGLE_EMAIL_ENDPOINT,
  GOOGLE_TASKS_ENDPOINT,
};
