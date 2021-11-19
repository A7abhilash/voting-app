import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useBlockchain } from "../../../contexts/BlockchainContext";
import { useVotingApp } from "../../../contexts/VotingAppContext";

function Register() {
  const { account, votingAppContract } = useBlockchain();
  const { phase } = useVotingApp();
  const { user } = useAuth();
  const [address, setAddress] = useState(phase === "1" ? account : "");
  const [myVotingStatus, setMyVotingStatus] = useState({});

  useEffect(() => {
    getVoter();
  }, []);

  const getVoter = async () => {
    try {
      const status = await votingAppContract.methods
        .getVoter(account, user.googleId)
        .call();
      // console.log(status);
      setMyVotingStatus(status);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address && window.web3.utils.isAddress(address)) {
      registerVoter(address);
      // setAddress("");
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
          getVoter();
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
            value={myVotingStatus.googleId ? myVotingStatus.voterId : address}
            onChange={(e) => setAddress(e.target.value)}
            disabled={phase !== "1" || myVotingStatus.googleId}
          />
          <button
            className="btn btn-warning"
            disabled={phase !== "1" || myVotingStatus.googleId}
          >
            Register
          </button>
        </form>
      </div>
      <div className="my-2">
        <div className="bg-light p-2">
          <h5>My account status:</h5>
          <div className="my-2">
            {myVotingStatus.googleId ? (
              <div>
                <h6>Voter ID: {myVotingStatus.voterId}</h6>
                <p>Google ID: {myVotingStatus.googleId}</p>
                <Badge
                  bg={myVotingStatus.isVotingApproved ? "success" : "danger"}
                >
                  {myVotingStatus.isVotingApproved
                    ? "Approved"
                    : "Not Aprroved"}
                </Badge>
              </div>
            ) : (
              <div>
                <p className="small">You haven't registered for voting!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
