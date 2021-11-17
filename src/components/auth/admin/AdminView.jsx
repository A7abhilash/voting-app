import React, { useEffect, useState } from "react";
import CreateCandidate from "./candidates/CreateCandidate";
import PhaseSelector from "./phase/PhaseSelector";

function AdminView({ views, selectedView }) {
  const [view, setView] = useState(<h1>Loading</h1>);

  useEffect(() => {
    switch (selectedView) {
      case views[0]:
        setView(<CreateCandidate />);
        break;
      case views[1]:
        setView(<h2>Approve</h2>);
        break;
      case views[2]:
        setView(<PhaseSelector />);
        break;
      default:
        return null;
    }
  }, [selectedView, views]);

  return view;
}

export default AdminView;
