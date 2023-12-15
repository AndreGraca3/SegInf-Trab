const AUTHORIZATION_ENDPOINT = "https://github.com/login/oauth/authorize";
const TOKEN_ENDPOINT = "https://github.com/login/oauth/access_token";

const USERINFO_ENDPOINT = "https://api.github.com/user";

const REPOS_FROM_USER_ENDPOINT = `https://api.github.com/user/repos`;

const getMilestoneFromRepoUri = (owner, repo) =>
  `https://api.github.com/repos/${owner}/${repo}/milestones`;

module.exports = {
  AUTHORIZATION_ENDPOINT,
  TOKEN_ENDPOINT,
  USERINFO_ENDPOINT,
  REPOS_FROM_USER_ENDPOINT,
  getMilestoneFromRepoUri,
};
