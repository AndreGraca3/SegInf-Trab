async function getMilestonesFromRepo(token, owner, repo) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/milestones`,
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  );
  return await res.json();
}