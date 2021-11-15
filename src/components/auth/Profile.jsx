import React from "react";
import { Badge } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";

function Profile({ isAdmin }) {
  const { user, logout } = useAuth();

  return (
    <div className="card p-0 mb-2">
      <div className="card-header">
        <h5 className="text-center">Profile</h5>
      </div>
      <div className="card-body">
        <div className="d-flex align-items-center">
          <img
            src={user.imageUrl}
            alt="Profile"
            className="img-fluid mb-2"
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              marginRight: 15,
            }}
          />
          <div>
            <h6 className="mb-0">{user.email}</h6>
            {isAdmin && (
              <>
                <Badge bg="secondary">Admin</Badge>
                <br />
              </>
            )}
            <button className="btn btn-sm btn-danger mt-2" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
