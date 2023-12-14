const githubUris = require("./githubUris");

async function getReposFromUser(owner) {
  const res = await fetch(githubUris.getReposFromUserUri(owner));
  const repos = await res.json();
  const reposWithMileStones = repos.map(async (repo) => {
    const milestones = await getMilestonesFromRepo(owner, repo.name);
    return { name: repo.name, milestones };
  });
  return await Promise.all(reposWithMileStones);
}

async function getMilestonesFromRepo(owner, repo) {
  const res = await fetch(githubUris.getMilestoneFromRepoUri(owner, repo));
  const detailedMilestones = await res.json();
  return detailedMilestones.map((milestone) => {
    return { title: milestone.title, due_on: milestone.due_on };
  });
}

module.exports = {
  getReposFromUser,
  getMilestonesFromRepo,
};
