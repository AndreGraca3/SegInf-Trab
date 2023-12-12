const { newEnforcer } = require("casbin");

async function canAccess(user, path, method) {
  console.log(`Checking if user ${user} can access ${method} ${path}`);
  const enforcer = await newEnforcer("rbac_model.conf", "rbac_policy.csv");
  return await enforcer.enforce(user, path, method);
}

module.exports = {
  canAccess,
};
