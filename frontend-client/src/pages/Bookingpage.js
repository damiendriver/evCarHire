import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Bookingpage() {
  const { carid } = useParams();
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [car, setcar] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const data = (await axios.post("/api/cars/getcarbyid", { carid })).data;

        setcar(data);
        setloading(false);
        console.log(data);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    };

    fetchData();

    return () => {};
  }, [carid]);

  return (
    <div className="m-5">
      {loading ? (
        <Loading/>
      ) : error ? (
        <Error />
      ) : (
        <div className="row justify-content-center mt-5 box">
          <div className="col-md-6">
            <h1>{car.makeModel}</h1>
            <img
              src={car.imageURLs[0]}
              className="rotaimg"
              alt={car.makeModel}
            />
          </div>
          <div className="col-md-6">
            <div style={{textAlign: 'right'}}>
            <b>
              <h2>Booking Information</h2>
              <hr />
              <p>Car Description: </p>
              <p>Battery Type: </p>
              <p>Pick Up Date: </p>
              <p>Return Date: </p>
            </b>
            </div>
            <div style={{textAlign: 'right'}}>
              <h2>Payment Amount</h2>
              <hr />
              <p>Total Days: </p>
              <p>Daily Price: {car.priceAmount} </p>
              <p>Total Price: </p>
            </div>
            <div style={{float: 'right'}}>
            <button className="btn btn-primary m-3">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingpage;
