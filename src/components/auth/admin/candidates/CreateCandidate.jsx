import React, { useEffect, useState } from "react";
import { useBlockchain } from "../../../../contexts/BlockchainContext";
import candidateIcon from "../../../../candidate.png";
import { useVotingApp } from "../../../../contexts/VotingAppContext";

function CreateCandidate() {
  const [name, setName] = useState("");
  const { votingAppContract, account } = useBlockchain();
  const { phase, candidates } = useVotingApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      createCandidate(name);
      setName("");
    }
  };

  const createCandidate = async (name) => {
    try {
      votingAppContract.methods
        .createCandidate(name)
        .send({ from: account })
        .on("receipt", () => {
          window.location.reload();
          alert("New candidate added!");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p className="display-4">Create Candidate</p>
      <div className="bg-light border-rounded p-3 my-2">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control my-2"
            placeholder="Enter candidate name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={phase !== "0"}
          />
          <button className="btn btn-warning" disabled={phase !== "0"}>
            Create
          </button>
        </form>
      </div>
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
                <p className="mb-0">
                  <small>Candidate ID: {candidate.candidateId}</small>
                </p>
                <p className="mb-0">Count: {candidate.votesCount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateCandidate;
