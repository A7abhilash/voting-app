import React from "react";
import { Button } from "react-bootstrap";

function SidebarSelector({ selectedView, setSelectedView, views }) {
  return (
    <div className="my-2 d-grid gap-2">
      {views.map((view, index) => (
        <Button
          key={view + index}
          onClick={
            view === selectedView ? () => {} : () => setSelectedView(view)
          }
          variant={`${view === selectedView ? "primary" : "outline-primary"}`}
        >
          {view}
        </Button>
      ))}
    </div>
  );
}

export default SidebarSelector;
