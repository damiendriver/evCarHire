import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import { formatPrice } from "../utils/FormatPrice";

function Bookingpage() {
  const { carid, pickupdate, returndate } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [car, setCar] = useState();

  const totaldays = moment(returndate, "YYYY-MM-DD").diff(
    moment(pickupdate, "YYYY-MM-DD"),
    "days"
  );
  const [totalprice, settotalprice] = useState();

  useEffect(() => {

    if(!localStorage.getItem('currentMember')){
      window.location.href='/login'
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.post("/api/car/getcarbyid", { carid })).data;
        settotalprice(data.priceAmount * totaldays);

        setCar(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();

    return () => {};
  }, [carid, pickupdate, returndate, totaldays]);

  async function onToken(token) {
    console.log(token);
    const bookingDetails = {
      car,
      memberid: JSON.parse(localStorage.getItem("currentMember")).data._id,
      pickupdate,
      returndate,
      totaldays,
      totalprice,
      token,
    };
    console.log("Booking Details:", bookingDetails);

    try {
      setLoading(true);
      console.log("Sending POST request to /api/booking/bookcar...");
      const result = await axios.post("/api/booking/bookcar", bookingDetails);
      console.log("Response:", result.data);
      setLoading(false);
      Swal.fire({
        title: "Booking Confirmed",
        text: "You were Successful",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
          window.location.href = "/home";
        }
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Booking Failed",
        text: "Please try again",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      setLoading(false);
    }
  }

  return (
    <div className="m-5">
      {loading ? (
        <Loading />
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
            <div style={{ textAlign: "right" }}>
              <b>
                <h2>Booking Information</h2>
                <hr />
                <p>
                  Drivers Name:{" "}
                  {JSON.parse(localStorage.getItem("currentMember")).data.name}
                </p>
                <p>Battery Type: {car.batteryType}</p>
                <p>Pick Up Date: {pickupdate}</p>
                <p>Return Date: {returndate}</p>
              </b>
            </div>
            <div style={{ textAlign: "right" }}>
              <h2>Payment Amount</h2>
              <hr />
              <p>Total Days: {totaldays}</p>
              <p>Daily Price: {formatPrice(car.priceAmount)} </p>
              <p>Total Price: {formatPrice(totalprice)}</p>
            </div>
            <div style={{ float: "right" }}>
              <StripeCheckout
                amount={totalprice * 100}
                token={onToken}
                currency="EUR"
                stripeKey="pk_test_51Olh1nCck7o1Tqs2iZw12ToB859XvnE0af7sftdADqFP9VKmVjCBfVNflFWLfnhD1WCvYVmjVwRp06UU6qPDfVM800xsYLIHCo"
              >
                <button className="btn btn-primary m-3">Confirm & Pay</button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingpage;
