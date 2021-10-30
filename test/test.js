const VotingApp = artifacts.require("./VotingApp.sol");

require("chai").use(require("chai-as-promised")).should();

contract("VotingApp", (accounts) => {
  let votingApp;
  const [deployer, voter1, voter2, candidate1, candidate2, candidate3] =
    accounts;

  before(async () => {
    votingApp = await VotingApp.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await votingApp.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await votingApp.name();
      assert.equal(name, "VotingApp");
    });
  });
});
