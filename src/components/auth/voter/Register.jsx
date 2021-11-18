import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useBlockchain } from "../../../contexts/BlockchainContext";
import { useVotingApp } from "../../../contexts/VotingAppContext";

function Register() {
  const { account, votingAppContract } = useBlockchain();
  const { phase } = useVotingApp();
  const { user } = useAuth();
  const [address, setAddress] = useState(phase === "1" ? account : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address && window.web3.utils.isAddress(address)) {
      registerVoter(address);
      setAddress("");
    }
  };

  const registerVoter = async (address) => {
    try {
      votingAppContract.methods
        .registerVoter(user.googleId)
        .send({ from: address })
        .on("receipt", () => {
          alert(
            "Your voter account has been registered. Wait for the approval to be eligible to vote."
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-2">
      <p className="display-4">Register as Voter</p>
      <div className="bg-light border-rounded p-3 my-2">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control my-2"
            placeholder="Enter voter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={phase !== "1"}
          />
          <button className="btn btn-warning" disabled={phase !== "1"}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
