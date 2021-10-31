pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract VotingApp{
	// Admin
	string public name;
	string public adminGoogleId;
	address public admin;

	// Store phase
	uint public phase;
	/*
		0: Election is announced to be held and candidates can be created by admin
		1: Registration - Voters can register
		2: Voting - Voters are eligigle to vote. No new candidates!
		3: Results - No more voting!
	*/

	// Store voters
	mapping(address => bool) public voters;

	// Store candidates
	uint public candidatesCount;
	mapping(uint => Candidate) public candidates;
	struct Candidate{
		uint candidateId;
		string name;
		uint votesCount;
	}

	constructor() public{
		name = "VotingApp";
		admin = msg.sender;
		adminGoogleId = "116975414122189328909";

		phase = 0;
	}

	/* Modifiers */
	modifier onlyAdmin{
		require(msg.sender == admin, "Only admin is allowed to perform this action");
		_;
	}

	/* Events */
	event PhaseChanged(uint phase);
	event CandidateCreated(uint indexed candidateId, string name, uint votesCount);
	event CastedVote(uint indexed candidateId, string hash, uint votesCount);

	/* Functions */
	function createCandidate(string memory name) public onlyAdmin {
		// Make sure phase is right
		require(phase == 0, "Candidate Registration phase is over!");

		// Make sure the inputs exists
		require(bytes(name).length > 0, "Candidate name is required!");

		// Add candidate
		candidatesCount++;
		candidates[candidatesCount] = Candidate(candidatesCount, name, 0);

		// Trigger event
		emit CandidateCreated(candidatesCount, name, 0);
	}

	function changePhase() public onlyAdmin{
		require(phase <= 3, "Election is over!");

		phase++;

		emit PhaseChanged(phase);
	}
}