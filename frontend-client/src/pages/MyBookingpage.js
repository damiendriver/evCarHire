import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";

function MyBookingpage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const member = JSON.parse(localStorage.getItem("currentMember"));

  async function getbookingsbymemberid() {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("/api/booking/getbookingsbymemberid", {
        memberid: member.data._id,
      });
      setBookings(response.data);
    } catch (error) {
      console.log(error);
      setError("Error fetching bookings");
    }
    setLoading(false);
  }

  useEffect(() => {
    console.log("Component mounted or updated.");
    getbookingsbymemberid();
  }, []); 
  useEffect(() => {
    console.log("Bookings updated:", bookings);
  }, [bookings]);

  return (
    <div>
      <div>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error message={error} />
        ) : (
          bookings.map((booking) => (
            <div key={booking._id}>
              <br />
              <p><b>Car Reserved:</b> {booking.car}</p>
              <p><b>Booking ID:</b> {booking._id}</p>
              <p><b>Pick Up Date:</b> {booking.pickupdate}</p>
              <p><b>Return Date:</b> {booking.returndate}</p>
              <p><b>Total Price:</b> {booking.totalprice}</p>
              <p><b>Booking Status:</b> {booking.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyBookingpage;
