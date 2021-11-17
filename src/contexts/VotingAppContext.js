import React, { createContext, useContext, useEffect, useState } from "react";
import Loading from "../containers/Loading";
import { useAuth } from "./AuthContext";
import { useBlockchain } from "./BlockchainContext";

const VotingAppContext = createContext();

export const useVotingApp = () => useContext(VotingAppContext);

function VotingAppProvider({ children }) {
  const { user } = useAuth();
  const { votingAppContract } = useBlockchain();
  const [loading, setLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [phase, setPhase] = useState("");
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    if (!loading) {
      setLoadingMsg("");
    }
  }, [loading]);

  useEffect(() => {
    if (votingAppContract) {
      setLoading(true);
      setLoadingMsg("Loading your data...");
      loadBlockchainData().then(() => setLoading(false));
    }
  }, [votingAppContract]);

  async function loadBlockchainData() {
    try {
      // Get admin
      const _adminGoogleId = await votingAppContract.methods
        .adminGoogleId()
        .call();
      setIsAdmin(_adminGoogleId === user.googleId);

      // Get phase
      votingAppContract.methods
        .phase()
        .call()
        .then((_phase) => {
          setPhase(_phase);
        });

      // Get candidates
      const _candidatesCount = await votingAppContract.methods
        .candidatesCount()
        .call();
      const _candidates = [];
      for (let i = 1; i <= _candidatesCount; i++) {
        let _candidate = await votingAppContract.methods.candidates(i).call();
        _candidates.unshift(_candidate);
      }
      // console.log(_candidates);
      setCandidates(_candidates);
    } catch (error) {
      console.log(error);
      alert("Couldn't load your data, please try again");
    }
  }

  return (
    <VotingAppContext.Provider
      value={{
        loadBlockchainData,
        isAdmin,
        phase,
        candidates,
      }}
    >
      {loading ? <Loading loadingMsg={loadingMsg} /> : children}
    </VotingAppContext.Provider>
  );
}

export default VotingAppProvider;
