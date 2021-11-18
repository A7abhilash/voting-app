import React from "react";
import { useBlockchain } from "../../../contexts/BlockchainContext";
import candidateIcon from "../../../candidate.png";
import { useVotingApp } from "../../../contexts/VotingAppContext";

function ListCandidates() {
  const { votingAppContract, account } = useBlockchain();
  const { candidates, phase } = useVotingApp();

  const castVote = (id) => {
    console.log("called");
    try {
      votingAppContract.methods
        .castVote(id)
        .send({ from: account })
        .on("receipt", () => {
          alert("Casted vote successfully");
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-2">
      <h4>Candidate Lists</h4>
      <div className="d-flex flex-wrap">
        {candidates.map((candidate, index) => (
          <div key={candidate.name + index} className="card p-0 m-1">
            <div className="card-body text-center">
              <img
                src={candidateIcon}
                alt={candidate.name}
                className="img-fluid my-2"
                style={{
                  width: 50,
                }}
              />
              <h6>{candidate.name}</h6>
              <p>
                <small>Candidate ID: {candidate.candidateId}</small>
              </p>
              <button
                className="btn btn-dark btn-sm"
                onClick={() => castVote(candidate.candidateId)}
                disabled={phase !== "2"}
              >
                Cast Vote
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListCandidates;
