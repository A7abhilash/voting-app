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
      //
    } catch (error) {
      console.log(error);
      alert("Couldn't load your data, please try again");
    }
  }

  return (
    <VotingAppContext.Provider
      value={{
        loadBlockchainData,
      }}
    >
      {loading ? <Loading loadingMsg={loadingMsg} /> : children}
    </VotingAppContext.Provider>
  );
}

export default VotingAppProvider;
