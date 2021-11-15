import React, { useState } from "react";
import SidebarSelector from "../SidebarSelector";

function AdminSidebar() {
  const views = ["Register Candidate", "Approve voters", "Phase"];
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

export default AdminSidebar;
