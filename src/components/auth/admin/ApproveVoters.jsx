import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { useBlockchain } from "../../../contexts/BlockchainContext";
import { useVotingApp } from "../../../contexts/VotingAppContext";

function ApproveVoters() {
  const { votingAppContract, account } = useBlockchain();
  const { phase } = useVotingApp();
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    loadVoters();
  }, []);

  const loadVoters = async () => {
    try {
      const _votersCount = await votingAppContract.methods.votersCount().call();
      const _voters = [];
      for (let i = 1; i <= _votersCount; i++) {
        let _voter = await votingAppContract.methods.voters(i).call();
        _voters.unshift(_voter);
      }
      //   console.log(_voters);
      setVoters(_voters);
    } catch (error) {
      console.log(error);
    }
  };

  const approveVoter = async (voterId) => {
    try {
      votingAppContract.methods
        .approveVoter(voterId)
        .send({ from: account })
        .on("receipt", () => {
          alert("Voter Approved!");
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p className="display-4">Approve Voters</p>
      <div className="d-flex flex-wrap my-2">
        {voters.map((voter, index) => (
          <div key={voter.googleId} className="card m-1">
            <div className="card-body p-3">
              <h6>{voter.voterId}</h6>
              <p>
                <small>
                  <strong>Google ID:</strong> {voter.googleId}
                </small>
              </p>
              {!voter.isVotingApproved || index === 2 ? (
                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => approveVoter(voter.voterId)}
                  // disabled={phase !== "1"}
                >
                  Approve Voter
                </button>
              ) : (
                <Badge bg="success">Voter Approved</Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApproveVoters;
