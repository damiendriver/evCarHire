import React from "react";

function Steps() {
  return (
    <div className="container">
        <h2 className="text-center mt-4 mb-4">Electrify Your Journey</h2>
      <div className="row justify-content-center">
        <div className="col-lg-2 col-md-6 box">
          <div className="card border-0">
            <i id="custom-icon" className="bi bi-1-square-fill"></i>
            <div className="card-body">
              <p className="card-text">
                <strong>Join Today.</strong><br /> Some quick example text to build on the card title
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-2 col-md-6 box">
          <div className="card border-0">
            <i id="custom-icon" className="bi bi-2-square-fill"></i>
            <div className="card-body">
              <p className="card-text">
              <strong>Book a Car.</strong><br /> Some quick example text to build on the card title
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-2 col-md-6 box">
          <div className="card border-0">
            <i id="custom-icon" className="bi bi-3-square-fill"></i>
            <div className="card-body">
              <p className="card-text">
              <strong>Drive in Style.</strong><br /> Some quick example text to build on the card title
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-2 col-md-6 box">
          <div className="card border-0">
            <i id="custom-icon" className="bi bi-4-square-fill"></i>
            <div className="card-body">
              <p className="card-text">
              <strong>Return.</strong><br /> Some quick example text to build on the card title
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Steps;
