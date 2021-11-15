import React from "react";
import { useVotingApp } from "../../contexts/VotingAppContext";
import AdminSidebar from "./admin/AdminSidebar";
import Profile from "./Profile";
import VoterSidebar from "./voter/VoterSidebar";

function Main() {
  const { isAdmin } = useVotingApp();

  return (
    <div className="container mt-5">
      <div className="row align-items-start">
        {/* Sidebar */}
        <div className="col-md-4 mx-auto my-1 bg-light p-2">
          {/* Profile */}
          <Profile isAdmin={isAdmin} />
          <hr />
          {/* SidebarSelector */}
          {isAdmin ? <AdminSidebar /> : <VoterSidebar />}
        </div>
        {/* Main */}
        <div className="col-md-6 mx-auto my-1"></div>
      </div>
    </div>
  );
}

export default Main;
