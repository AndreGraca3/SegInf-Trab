const {
  PORT,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
} = require("../../config");
const { GITHUB_CALLBACK_PATH } = require("../../constants");
const githubUris = require("./githubUris");

function getGithubOAuthUrl(state) {
  return (
    `${githubUris.AUTHORIZATION_ENDPOINT}?` +
    `client_id=${GITHUB_CLIENT_ID}&` +
    `scope=openid user repo&` +
    `state=${state}&` +
    `redirect_uri=http://localhost:${PORT}${GITHUB_CALLBACK_PATH}`
  );
}

async function getGithubToken(code) {
  const tokenRes = await fetch(githubUris.TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      ACCEPT: "application/json",
    },
    body: new URLSearchParams({
      code,
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      redirect_uri: `http://localhost:${PORT}${GITHUB_CALLBACK_PATH}`, // why is this needed again?
      grant_type: "authorization_code",
    }),
  });
  const tokenDetails = await tokenRes.json();
  return tokenDetails.access_token;
}

async function getGithubUserInfo(token) {
  const userRes = await fetch(githubUris.USERINFO_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await userRes.json();
}

module.exports = {
  getGithubOAuthUrl,
  getGithubToken,
  getGithubUserInfo,
};
