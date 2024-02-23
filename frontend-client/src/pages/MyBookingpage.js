import React, { useState, useEffect } from "react";
import { Tag, Tabs } from "antd";
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
  }, []); // Empty dependency array to run once on component mount

  useEffect(() => {
    console.log("Bookings updated:", bookings);
  }, [bookings]); // Log whenever bookings change

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error message={error} />
      ) : (
        bookings.map((booking) => (
          <div key={booking._id}>
            <h1>{booking.car}</h1>
            <h1>{booking._id}</h1>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookingpage;

