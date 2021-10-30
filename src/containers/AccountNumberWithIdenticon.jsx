import React from "react";
import IdenticonAvatar from "./IdenticonAvatar";

function AccountNumberWithIdenticon({ account, icon = "left" }) {
  return (
    <div className="d-flex align-items-center">
      {icon === "right" ? (
        <>
          <h6 style={{ marginRight: 10, marginTop: 6 }} className="card-text">
            <small>{account}</small>
          </h6>
          <IdenticonAvatar account={account} />
        </>
      ) : (
        <>
          <IdenticonAvatar account={account} />
          <h6 style={{ marginLeft: 10 }} className="card-text">
            <small>{account}</small>
          </h6>
        </>
      )}
    </div>
  );
}

export default AccountNumberWithIdenticon;
