import React from "react";
import BlockchainProvider from "./contexts/BlockchainContext";
import VotingAppProvider from "./contexts/VotingAppContext";
import Login from "./components/guest/Login";
import Main from "./components/auth/Main";
import Navbar from "./containers/Navbar";
import { useAuth } from "./contexts/AuthContext";

import "./App.css";

function App() {
  const { user } = useAuth();

  return user !== null ? (
    <BlockchainProvider>
      <VotingAppProvider>
        <Navbar />
        <Main />
      </VotingAppProvider>
    </BlockchainProvider>
  ) : (
    <Login />
  );
}

export default App;
