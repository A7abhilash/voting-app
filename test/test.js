const VotingApp = artifacts.require("./VotingApp.sol");

require("chai").use(require("chai-as-promised")).should();

contract("VotingApp", (accounts) => {
  let votingApp;
  const [deployer, voter1, voter2, voter3, voter4, voter5] = accounts;
  const googleId = {
    [voter1]: "google1",
    [voter2]: "google2",
    [voter3]: "google3",
    [voter4]: "google4",
    [voter5]: "google5",
  };

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

    it("has an admin and google id", async () => {
      const admin = await votingApp.admin();
      assert.equal(admin, deployer);
      const adminGoogleId = await votingApp.adminGoogleId();
      assert.equal(adminGoogleId, "116975414122189328909");
    });

    it("initially, phase is 0", async () => {
      const phase = await votingApp.phase();
      assert.equal(phase.toNumber(), 0);
    });

    it("initially, voters count is 0", async () => {
      const votersCount = await votingApp.votersCount();
      assert.equal(votersCount.toNumber(), 0);
    });
  });

  describe("admin functions", async () => {
    let result, candidatesCount, phase;

    before(async () => {
      // Should be 0
      phase = await votingApp.phase();

      await votingApp.createCandidate("Candidate 1", { from: deployer });
      await votingApp.createCandidate("Candidate 2", { from: deployer });
      result = await votingApp.createCandidate("Candidate 3", {
        from: deployer,
      });
      candidatesCount = await votingApp.candidatesCount();
    });

    it("creates candidate", async () => {
      /*  SUCCESS */
      assert.equal(phase.toNumber(), 0, "it is candidate-registration phase");
      assert.equal(
        candidatesCount.toNumber(),
        3,
        "no. of candidates is correct"
      );

      const event = result.logs[0].args;
      assert.equal(event.candidateId, 3, "candidate id is correct");
      assert.equal(event.name, "Candidate 3", "candidate name is correct");
      assert.equal(event.votesCount, 0, "candidate votes count is correct");

      /*  FAILURE */
      // Only admin can create new candidate
      await votingApp.createCandidate("Candidate 8", { from: voter2 }).should.be
        .rejected;

      // Candidate name is required
      await votingApp.createCandidate("", { from: deployer }).should.be
        .rejected;
    });

    it("changes phase", async () => {
      /*  SUCCESS */
      // Should change to 1
      result = await votingApp.changePhase({ from: deployer });
      phase = result.logs[0].args.phase;
      assert.equal(phase.toNumber(), 1, "it is voters-registration phase");

      // Should change to 2
      result = await votingApp.changePhase({ from: deployer });
      phase = result.logs[0].args.phase;
      assert.equal(phase.toNumber(), 2, "it is voting phase");

      // Should change to 3
      result = await votingApp.changePhase({ from: deployer });
      phase = result.logs[0].args.phase;
      assert.equal(phase.toNumber(), 3, "it is results phase");

      /*  FAILURE */
      // Only admin can change the phase
      await votingApp.changePhase({ from: voter2 }).should.be.rejected;

      // Election is over
      // Should not change
      await votingApp.changePhase({ from: deployer }).should.be.rejected;
    });

    it("resets phase", async () => {
      /*  SUCCESS */
      // Resets to 0
      result = await votingApp.resetPhase({ from: deployer });
      phase = result.logs[0].args.phase;
      assert.equal(phase.toNumber(), 0, "it is candidate-registration phase");

      // Should change to 1
      result = await votingApp.changePhase({ from: deployer });
      phase = result.logs[0].args.phase;
      assert.equal(phase.toNumber(), 1, "it is voter-registration phase");

      /*  FAILURE */
      // Only admin can change the phase
      await votingApp.resetPhase({ from: voter2 }).should.be.rejected;
    });
  });

  describe("voters func", async () => {
    let result, votersCount, phase;

    before(async () => {
      phase = await votingApp.phase();
      assert.equal(phase.toNumber(), 1, "it is voter-registration phase");
    });

    it("voter can register", async () => {
      /* SUCCESS */
      await votingApp.registerVoter(googleId[voter1], { from: voter1 });
      await votingApp.registerVoter(googleId[voter2], { from: voter2 });
      await votingApp.registerVoter(googleId[voter3], { from: voter3 });
      await votingApp.registerVoter(googleId[voter4], { from: voter4 });
      result = await votingApp.registerVoter(googleId[voter5], {
        from: voter5,
      });
      let voter = result.logs[0].args;
      // console.log(voter);
      votersCount = await votingApp.votersCount();
      assert.equal(votersCount.toNumber(), 5, "voters count is 5");

      assert.equal(voter.voterId, voter5, "voter id is correct");
      assert.equal(voter.googleId, googleId[voter5], "google id is correct");
      assert.equal(voter.isVotingApproved, false, "voter is not approved");

      /* FAILURES */
      // Only unique voter id and google id
      await votingApp.registerVoter(googleId[voter1], { from: voter1 }).should
        .be.rejected;
      await votingApp.registerVoter(googleId[voter1], { from: voter2 }).should
        .be.rejected;
      await votingApp.registerVoter(googleId[voter3], { from: voter2 }).should
        .be.rejected;

      // Registration phase is over
      // Should change to 2
      await votingApp.changePhase();
      await votingApp.registerVoter(googleId[voter1], { from: voter1 }).should
        .be.rejected;

      // Registration phase is not started
      // Resets to 0
      await votingApp.resetPhase();
      await votingApp.registerVoter(googleId[voter1], { from: voter1 }).should
        .be.rejected;
    });

    it("admin approves voter", async () => {
      /* SUCCESS */
      // Resets to 0
      await votingApp.resetPhase();
      // Should change to 1
      await votingApp.changePhase();

      await votingApp.approveVoter(voter1, { from: deployer });
      await votingApp.approveVoter(voter2, { from: deployer });
      await votingApp.approveVoter(voter4, { from: deployer });
      result = await votingApp.approveVoter(voter5, { from: deployer });

      let voter = result.logs[0].args;
      assert.equal(voter.voterId, voter5, "voter id is correct");
      assert.equal(voter.googleId, googleId[voter5], "google id is correct");
      assert.equal(
        voter.isVotingApproved,
        true,
        "voter is approved for voting"
      );

      /* FAILURES */
      // Only admin can approve
      await votingApp.approveVoter(voter5, { from: voter1 }).should.be.rejected;

      // Invalid voter id
      await votingApp.approveVoter(accounts[9], { from: deployer }).should.be
        .rejected;

      // Registration phase is over
      // Should change to 2
      await votingApp.changePhase();
      await votingApp.approveVoter(voter1, { from: deployer }).should.be
        .rejected;

      // Registration phase is not started
      // Resets to 0
      await votingApp.resetPhase();
      await votingApp.approveVoter(voter1, { from: deployer }).should.be
        .rejected;
    });

    it("voter can cast their vote", async () => {
      /* SUCCESS */
      // Resets to 0
      await votingApp.resetPhase({ from: deployer });
      // Changes to 1
      await votingApp.changePhase({ from: deployer });

      await votingApp.approveVoter(voter1, { from: deployer });

      // Changes to 2
      await votingApp.changePhase({ from: deployer });

      // Test w.r.t event emitted
      result = await votingApp.castVote(2, {
        from: voter5,
      });
      let vote = result.logs[0].args;
      // console.log(voter);
      assert.equal(vote.voterId, voter5, "voter id is correct");
      assert.equal(vote.candidateId, 2, "candidate id is correct");
      assert.equal(vote.votesCount.toNumber(), 1, "voters count is correct");

      await votingApp.castVote(1, { from: voter1 });
      await votingApp.castVote(1, { from: voter2 });
      // await votingApp.castVote(1, { from: voter3 });
      result = await votingApp.castVote(1, { from: voter4 });

      vote = result.logs[0].args;
      assert.equal(vote.voterId, voter4, "voter id is correct");
      assert.equal(vote.candidateId, 1, "candidate id is correct");
      assert.equal(vote.votesCount.toNumber(), 3, "voters count is correct");

      // Test w.r.t candidates list
      const candidate1 = await votingApp.candidates(1);
      assert.equal(
        candidate1.votesCount.toNumber(),
        3,
        "candidate 1's votes count is correct"
      );
      const candidate2 = await votingApp.candidates(2);
      assert.equal(
        candidate2.votesCount.toNumber(),
        1,
        "candidate 2's votes count is correct"
      );
      const candidate3 = await votingApp.candidates(3);
      assert.equal(
        candidate3.votesCount.toNumber(),
        0,
        "candidate 3's votes count is correct"
      );

      /* FAILURES */
      // Invalid candidate id
      await votingApp.castVote(8, { from: voter1 }).should.be.rejected;
      // Invalid voter
      await votingApp.castVote(2, { from: accounts[9] }).should.be.rejected;
      // Voter is not approved
      await votingApp.castVote(1, { from: voter3 }).should.be.rejected;

      // voter already casted his vote
      await votingApp.castVote(1, { from: voter1 }).should.be.rejected;

      // Voting phase is over
      // phase changes to 3
      await votingApp.changePhase();
      await votingApp.castVote(1, { from: voter1 }).should.be.rejected;

      // Voting phase is not started
      // phase resets to 0
      await votingApp.resetPhase();
      await votingApp.castVote(2, { from: voter1 }).should.be.rejected;
    });
  });
});
