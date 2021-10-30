import React from "react";
import { useAuth } from "../../contexts/AuthContext";

function Main() {
  const { user, logout } = useAuth();

  return (
    <div>
      <div className="text-center mt-5">
        <h5>{user.email}</h5>
        <button className="btn btn-sm btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Main;
