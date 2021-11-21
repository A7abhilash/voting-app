import React, { useEffect, useState } from "react";
import ListCandidates from "./ListCandidates";
import Manual from "./Manual";
import Register from "./Register";
import Results from "./Results";

function VoterView({ views, selectedView }) {
  const [view, setView] = useState(<h1>Loading</h1>);

  useEffect(() => {
    switch (selectedView) {
      case views[0]:
        setView(<Manual />);
        break;
      case views[1]:
        setView(<Register />);
        break;
      case views[2]:
        setView(<ListCandidates />);
        break;
      case views[3]:
        setView(<Results />);
        break;
      default:
        return null;
    }
  }, [selectedView, views]);

  return view;
}

export default VoterView;
