import React, { useEffect, useState } from "react";
import ListCandidates from "./candidates/ListCandidates";

function VoterView({ views, selectedView }) {
  const [view, setView] = useState(<h1>Loading</h1>);

  useEffect(() => {
    switch (selectedView) {
      case views[0]:
        setView(<h2>User Manual</h2>);
        break;
      case views[1]:
        setView(<h2>Register</h2>);
        break;
      case views[2]:
        setView(<ListCandidates />);
        break;
      case views[3]:
        setView(<h2>Results</h2>);
        break;
      default:
        return null;
    }
  }, [selectedView, views]);

  return view;
}

export default VoterView;
