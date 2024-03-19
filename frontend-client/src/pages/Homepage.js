import React from "react";
import { Link } from "react-router-dom";
import Steps from "../components/Steps";

function Homepage() {
  return (
    <div className="container-fluid landing-container">
      <div className="row landing">
        <div className="col-md-12">
          <div className="backgroundHome">
            <div className="content text-left">
              <div className="content-box">
                <Link to="/register" className="btnHome btn-primary">
                  <h2 style={{ textAlign: "center", margin: 0 }}>
                    JOIN
                    <br />
                    FOR FREE
                  </h2>
                  <i class="bi bi-arrow-right-square-fill"></i>
                </Link>
                <div>
              </div>
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
