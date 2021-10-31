pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract VotingApp{
	string public name;
	string public adminGoogleId;
	address public admin;

	constructor() public{
		name = "VotingApp";
		admin = msg.sender;
		adminGoogleId = "116975414122189328909";
	}

	/* Modifier: Only Admin */
	modifier onlyAdmin{
		require(msg.sender == admin, "Only admin is allowed to perform this action");
		_;
	}
}