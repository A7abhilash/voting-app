import React from "react";

function Manual() {
  return (
    <div className="my-2 bg-light p-2">
      <h4 className="display-4">User Manual</h4>
      <div className="mt-2">
        <ul>
          <li>
            Election Phases
            <ul>
              <li>
                0: Admin will create the candidates standing for the election
              </li>
              <li>
                1: Voters can register themselves with public account address
                and their google ID. Admin will verify the registrations and
                approve the voters.
              </li>
              <li>2. Voting Phase. No more registrations accepted!</li>
              <li>3. Election is over and results will be announced!</li>
            </ul>
          </li>
          <li>
            Voters Rules
            <ol>
              <li>
                Voter can register with atmost one public account address and
                google ID.
              </li>
              <li>Voter can cast their vote only once.</li>
              <li>No malpractices are allowed.</li>
            </ol>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Manual;
