const getReposFromUserUri = (owner) =>
  `https://api.github.com/users/${owner}/repos`;

const getMilestoneFromRepoUri = (owner, repo) =>
  `https://api.github.com/repos/${owner}/${repo}/milestones`;

module.exports = {
  getReposFromUserUri,
  getMilestoneFromRepoUri,
};
