import React from "react";

function Car({ car }) {
  return (
    <div className="row box" key={car._id}>
        <div className="col-md-4">
            <img src={car.imageURLs[0]} className='singleimg' alt="nice car" />
        </div>
        <div className="col-md-7">
            <h1>{car.makeModel}</h1>
            <p>Car Group:{car.carGroup}</p>
            <p>Acriss:{car.acriss}</p>
            <p>Battery:{car.batteryType}</p>

            <div>
                <button className="btn btn-primary">More Car Details</button>
            </div>
        </div>
      
    </div>
  );
}

export default Car;
