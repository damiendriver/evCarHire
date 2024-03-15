import React from "react";
import { Link } from 'react-router-dom';
import Steps from "../components/Steps";

function Homepage() {
  return (
    <div className="container-fluid landing-container">
      <div className="row landing">
        <div className="col-md-12">
          <div className="backgroundHome">
            <div className="content text-left">
              <div className="content-box">
                <h2>EV Car Hire</h2>
                <div>
                  <Link to='/login' className="btn btn-primary">
                    Join Up Today
                  </Link>
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

