import React, { useEffect, useState } from "react";
import { useVotingApp } from "../../contexts/VotingAppContext";
import AdminView from "./admin/AdminView";
import Profile from "./Profile";
import SidebarSelector from "./SidebarSelector";
import VoterView from "./voter/VoterView";

function Main() {
  const { isAdmin } = useVotingApp();

  const admin_views = ["Register Candidate", "Approve Voters", "Phase"];
  const voter_views = ["User manual", "Registration", "Vote", "Result"];
  const [selectedView, setSelectedView] = useState("");

  useEffect(() => {
    setSelectedView(isAdmin ? admin_views[0] : voter_views[0]);
  }, [isAdmin]);

  return (
    <div className="container mt-5">
      <div className="row align-items-start">
        {/* Sidebar */}
        <div className="col-md-4 mx-auto my-1 bg-light p-2">
          {/* Profile */}
          <Profile isAdmin={isAdmin} />
          <hr />
          {/* SidebarSelector */}
          {isAdmin ? (
            <SidebarSelector
              views={admin_views}
              selectedView={selectedView}
              setSelectedView={setSelectedView}
            />
          ) : (
            <SidebarSelector
              views={voter_views}
              selectedView={selectedView}
              setSelectedView={setSelectedView}
            />
          )}
        </div>
        {/* Main */}
        <div className="col-md-6 mx-auto my-1">
          {isAdmin ? (
            <AdminView views={admin_views} selectedView={selectedView} />
          ) : (
            <VoterView views={voter_views} selectedView={selectedView} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
