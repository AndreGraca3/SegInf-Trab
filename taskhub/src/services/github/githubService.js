const githubUris = require("./githubUris");

async function getReposFromUser(token) {
  const res = await fetch(githubUris.REPOS_FROM_USER_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
      "visibility": "private",
    },
  });
  const repos = await res.json();
  const reposWithMileStones = repos.map(async (repo) => {
    const milestones = await getMilestonesFromRepo(token, repo.owner.login, repo.name);
    return { name: repo.name, milestones };
  });
  return await Promise.all(reposWithMileStones);
}

async function getMilestonesFromRepo(token, owner, repo) {
  const res = await fetch(githubUris.getMilestoneFromRepoUri(owner, repo), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const detailedMilestones = await res.json();
  return detailedMilestones.map((milestone) => {
    return { title: milestone.title, due_on: milestone.due_on };
  });
}

module.exports = {
  getReposFromUser,
  getMilestonesFromRepo,
};
