const VotingApp = artifacts.require("VotingApp");

module.exports = function (deployer) {
  deployer.deploy(VotingApp);
};
