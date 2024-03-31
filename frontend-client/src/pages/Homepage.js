import React from "react";
import { Link } from "react-router-dom";
import Steps from "../components/Steps";

function Homepage() {
  const member = JSON.parse(localStorage.getItem("currentMember"));
  return (
    <div className="container-fluid landing-container">
      <div className="row landing">
        <div className="col-md-12">
          <div className="backgroundHome">
            <div className="content text-left">
              <div className="content-box">
                {!member && (
                  <Link to="/register" className="btnHome btn-primary">
                    <h2 style={{ textAlign: "center", margin: 0 }}>
                      JOIN
                      <br />
                      FOR FREE
                    </h2>
                    <i className="bi bi-arrow-right-square-fill"></i>
                  </Link>
                )}
                {member && (
                  <Link to="/vehicle" className="btnHome btn-primary">
                    <h2 style={{ textAlign: "center", margin: 0 }}>
                      VEHICLE OPTIONS
                    </h2>
                    <i className="bi bi-arrow-right-square-fill"></i>
                  </Link>
                )}
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Steps />
    </div>
  );
}

export default Homepage;
