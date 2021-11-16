import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useBlockchain } from "../../../../contexts/BlockchainContext";

function PhaseSelector() {
  const { account, votingAppContract, getErrorMessage } = useBlockchain();
  const [phaseText, setPhaseText] = useState("Loading...");
  const [phase, setPhase] = useState("");

  const loadPhase = () => {
    votingAppContract.methods
      .phase()
      .call({ from: account })
      .then((_phase) => {
        //   console.log(_phase);
        setPhase(_phase);
        switch (_phase) {
          case "0":
            setPhaseText("Candidate Registration Phase");
            break;
          case "1":
            setPhaseText("Voter Registration Phase");
            break;
          case "2":
            setPhaseText("Voting Phase");
            break;
          case "3":
            setPhaseText("Results");
            break;
          default:
            setPhaseText("");
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (votingAppContract) {
      loadPhase();
    }
  }, [votingAppContract, account]);

  const changePhase = async () => {
    try {
      await votingAppContract.methods
        .changePhase()
        .send({ from: account })
        .on("receipt", () => {
          alert("Phase changed");
          loadPhase();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const resetPhase = async () => {
    try {
      await votingAppContract.methods
        .resetPhase()
        .send({ from: account })
        .on("receipt", () => {
          alert("Phase reset done");
          loadPhase();
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mb-2">
        <h5>Current:</h5>
        <p className="display-4 text-success">{phaseText}</p>
      </div>
      <div className="my-2 d-flex">
        <Button
          variant="warning"
          className="m-1"
          disabled={phase === "3"}
          onClick={changePhase}
        >
          Change to next phase
        </Button>
        <Button
          variant="secondary"
          className="m-1"
          disabled={phase === "0"}
          onClick={resetPhase}
        >
          Reset phase
        </Button>
      </div>
    </div>
  );
}

export default PhaseSelector;
