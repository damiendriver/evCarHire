import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Tag } from "antd";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { formatPrice } from "../utils/FormatPrice";

function AdminBookingpage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const columns = [
    {
      title: "Reservation ID",
      dataIndex: "_id",
      key: "_id",
    },
    { title: "Car ID", dataIndex: "carid", key: "carid" },
    { title: "Car", dataIndex: "car", key: "car" },
    { title: "Pickupdate", dataIndex: "pickupdate", key: "pickupdate" },
    { title: "Returndate", dataIndex: "returndate", key: "returndate" },
    { title: "Total Price", dataIndex: "totalprice", key: "totalprice", render: (text, record) => formatPrice(record.totalprice), },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          {status === "reserved" ? (
            <Tag color="green">CONFIRMED</Tag>
          ) : (
            <Tag color="red">CANCELLED</Tag>
          )}
        </>
      ),
    },
  ];


  async function getallbookings() {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("https://ev-car-hire-backend.vercel.app/api/booking/getallbookings");
      setBookings(response.data);
    } catch (error) {
      console.log(error);
      setError("Error fetching bookings");
    }
    setLoading(false);
  }

  useEffect(() => {
    console.log("Component mounted or updated.");
    getallbookings();
  }, []);

  return (
    <div className="row">
      {loading ? (
        <Loading></Loading>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className="col-md-12">
        {Array.isArray(bookings) && bookings.length ? (
          <h3>Total Bookings: {bookings.length}</h3>
        ) : null}
        <Table columns={columns} dataSource={bookings} rowKey="_id" />
      </div>
    )}
  </div>
);
}

export default AdminBookingpage;