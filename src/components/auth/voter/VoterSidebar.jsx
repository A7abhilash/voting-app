import React, { useState } from "react";
import SidebarSelector from "../SidebarSelector";

function VoterSidebar() {
  const views = ["User manual", "Registration", "Vote", "Result"];
  const [selectedView, setSelectedView] = useState(views[0]);

  return (
    <div>
      <SidebarSelector
        views={views}
        selectedView={selectedView}
        setSelectedView={setSelectedView}
      />
    </div>
  );
}

export default VoterSidebar;
