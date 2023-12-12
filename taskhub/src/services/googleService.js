const {
  GOOGLE_AUTHORIZATION_ENDPOINT,
  GOOGLE_TOKEN_ENDPOINT,
  CALLBACK_PATH,
} = require("../constants");
const { PORT, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require("../config");

function getGoogleOAuthUrl(state) {
  return (
    `${GOOGLE_AUTHORIZATION_ENDPOINT}?` +
    `client_id=${GOOGLE_CLIENT_ID}&` +
    `scope=openid&` +
    `state=${state}&` +
    `response_type=code&` +
    `redirect_uri=http://localhost:${PORT}${CALLBACK_PATH}`
  );
}

async function getGoogleToken(code) {
  const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
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
  const token = await response.json();
  console.log("Got Token response:", token);
  return token;
}

module.exports = {
  getGoogleOAuthUrl,
  getGoogleToken,
};
