const { CALLBACK_PATH } = require("../../constants");
const {
  AUTHORIZATION_ENDPOINT: GOOGLE_AUTHORIZATION_ENDPOINT,
  TOKEN_ENDPOINT: GOOGLE_TOKEN_ENDPOINT,
  USERINFO_SCOPE_ENDPOINT: GOOGLE_USERINFO_SCOPE_ENDPOINT,
  EMAIL_SCOPE_ENDPOINT: GOOGLE_EMAIL_SCOPE_ENDPOINT,
  TASKS_SCOPE_ENDPOINT: GOOGLE_TASKS_SCOPE_ENDPOINT,
} = require("./googleUris");
const {
  PORT,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} = require("../../config");

function getGoogleOAuthUrl(state) {
  return (
    `${GOOGLE_AUTHORIZATION_ENDPOINT}?` +
    `client_id=${GOOGLE_CLIENT_ID}&` +
    `scope=openid ${GOOGLE_USERINFO_SCOPE_ENDPOINT} ${GOOGLE_EMAIL_SCOPE_ENDPOINT} ${GOOGLE_TASKS_SCOPE_ENDPOINT}&` +
    `state=${state}&` +
    `response_type=code&` +
    `redirect_uri=http://localhost:${PORT}${CALLBACK_PATH}`
  );
}

async function getGoogleToken(code) {
  const tokenRes = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: `http://localhost:${PORT}${CALLBACK_PATH}`, // why is this needed again?
      grant_type: "authorization_code",
    }),
  });
  const tokenDetails = await tokenRes.json();
  return tokenDetails.access_token;
}

async function getGoogleUserInfo(token) {
  const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await res.json();
}

module.exports = {
  getGoogleOAuthUrl,
  getGoogleToken,
  getGoogleUserInfo,
};
