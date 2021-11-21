import React, { useEffect, useState } from "react";
import { useBlockchain } from "../../../contexts/BlockchainContext";
import { useVotingApp } from "../../../contexts/VotingAppContext";
import candidateIcon from "../../../candidate.png";

function Results() {
  const { votingAppContract } = useBlockchain();
  const { phase, candidates } = useVotingApp();
  const [winner, setWinner] = useState({});

  useEffect(() => {
    if (phase === "3") {
      getWinner();
    }
  }, [phase]);

  const getWinner = () => {
    try {
      const _candidates = candidates.sort((a, b) => parseInt(b.votesCount, 10) - parseInt(a.votesCount, 10));
      console.log(_candidates);

      setWinner(_candidates[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-2 bg-light p-2">
      <p className="display-4">Results</p>
      {phase === "3" ? (
        <div className="card p-0 m-1">
          <div className="card-body text-center">
            <img
              src={candidateIcon}
              alt={winner.name}
              className="img-fluid my-2"
              style={{
                width: 50,
              }}
            />
            <h6>{winner.name}</h6>
            <p>
              <small>Candidate ID: {winner.candidateId}</small>
            </p>
            <p className="mb-0">Count: {winner.votesCount}</p>
          </div>
        </div>
      ) : (
        <p className="small">Voting is not yet started/over!</p>
      )}
    </div>
  );
}

export default Results;
