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
	mapping(address => bool) public votersCasted;
	uint public votersCount;
	mapping(uint => Voter) public voters;
	struct Voter{
		address voterId;
		string googleId;
		bool isVotingApproved;
	}


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
		votersCount = 0;
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
	event VoterRegistered(address voterId, string googleId, bool isVotingApproved);

	/* Functions */
	function createCandidate(string memory _name) public onlyAdmin {
		// Make sure phase is right
		require(phase == 0, "Candidate Registration phase is over!");

		// Make sure the inputs exists
		require(bytes(_name).length > 0, "Candidate name is required!");

		// Add candidate
		candidatesCount++;
		candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);

		// Trigger event
		emit CandidateCreated(candidatesCount, _name, 0);
	}

	function changePhase() public onlyAdmin{
		require(phase < 3, "Election is over!");

		phase++;

		emit PhaseChanged(phase);
	}

	function resetPhase() public onlyAdmin{
		phase=0;

		emit PhaseChanged(phase);
	}

	function registerVoter(string memory _googleId) public {
		// Make sure its registration phase
		if(phase < 1){
			revert('Registration phase is not started!');
		}
		if(phase > 1){
			revert('Registration phase is over!');
		}

		Voter memory _voter;
		for(uint i=1; i <= votersCount; i++){
			if(voters[i].voterId == msg.sender || keccak256(bytes(voters[i].googleId)) == keccak256(bytes(_googleId))){
				_voter = voters[i]; 
			}
		}
		// Make sure voter is not yet registered
		require(_voter.voterId == address(0x0), "Voter is already registered!");

		// Add voter
		votersCount++;
		voters[votersCount] = Voter(msg.sender, _googleId, false);

		// Trigger event
		emit VoterRegistered(msg.sender, _googleId, false);
	}
}