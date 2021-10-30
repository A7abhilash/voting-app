import React from "react";
import { useBlockchain } from "../contexts/BlockchainContext";
import AccountNumberWithIdenticon from "../containers/AccountNumberWithIdenticon";
import logo from "../logo.png";

function Navbar() {
  const { account } = useBlockchain();

  return (
    <nav className="navbar navbar-expand-lg shadow navbar-dark bg-light">
      <div className="container">
        <div className="navbar-brand">
          <div className="d-flex align-items-center">
            <img
              src={logo}
              alt="App Logo"
              className="img-fluid rounded-50"
              style={{ width: 30, marginRight: 10 }}
            />
            <h5 className="text-dark pt-2">Voting App</h5>
          </div>
        </div>
        <div className="ml-auto d-flex align-items-center">
          <AccountNumberWithIdenticon account={account} icon="right" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
