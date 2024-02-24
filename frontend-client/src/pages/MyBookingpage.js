import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Tag } from 'antd';
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

  async function cancelBooking(bookingid, carid) {
    setError("");
    setLoading(true);
    try {
      const result = (
        await axios.post("/api/booking/cancelbooking", { bookingid, carid })
      ).data;
      console.log(result);
      setLoading(false);
      Swal.fire({
        title: "Reservation Cancelled",
        text: "Would You Like to Make a New Booking",
        icon: "success",
        confirmButtonText: "New Booking",
      }).then((result) => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
          window.location.href = "/home";
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Sorry Cancel Failed",
        text: "Please try again",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="col-md-6">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error message={error} />
        ) : (
          bookings.map((booking) => (
            <div className="box" key={booking._id}>
              <br />
              <p>
                <b>Car Reserved:</b> {booking.car}
              </p>
              <p>
                <b>Booking ID:</b> {booking._id}
              </p>
              <p>
                <b>Pick Up Date:</b> {booking.pickupdate}
              </p>
              <p>
                <b>Return Date:</b> {booking.returndate}
              </p>
              <p>
                <b>Total Price:</b> {booking.totalprice}
              </p>
              <p>
                <b>Booking Status:</b>{" "}
                {booking.status === "cancelled" ?  <Tag color="red">Cancelled</Tag> : <Tag color="green">Confirmed</Tag>}
              </p>

              {booking.status !== "cancelled" && (
                <div className="text-right">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      cancelBooking(booking._id, booking.carid);
                    }}
                  >
                    Cancel Reservation
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyBookingpage;
