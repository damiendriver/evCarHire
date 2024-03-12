import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { formatPrice } from "../utils/FormatPrice";

function AdminCarpage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const columns = [
    {
      title: "Car ID",
      dataIndex: "_id",
      key: "_id",
    },
    { title: "Make Model", dataIndex: "makeModel", key: "makeModel" },
    { title: "Acriss", dataIndex: "acriss", key: "acriss" },
    { title: "Car Group", dataIndex: "carGroup", key: "carGroup" },
    { title: "Battery Type", dataIndex: "batteryType", key: "batteryType" },
    { title: "Price", dataIndex: "priceAmount", key: "priceAmount", render: (text, record) => formatPrice(record.priceAmount), },
  ];

  async function getallcars() {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("/api/car/getallcars");
      setCars(response.data);
    } catch (error) {
      console.log(error);
      setError("Error fetching bookings");
    }
    setLoading(false);
  }

  useEffect(() => {
    console.log("Component mounted or updated.");
    getallcars();
  }, []);

  return (
    <div className="row">
      {loading ? (
        <Loading></Loading>
      ) : error.length > 0 ? (
        <Error msg={error}></Error>
      ) : (
        <div className="col-md-12">
          {Array.isArray(cars) && cars.length ? (
            <h3>Total Cars: {cars.length}</h3>
          ) : null}
          <Table columns={columns} dataSource={cars} rowKey="_id" />
        </div>
      )}
    </div>
  );
}

export default AdminCarpage;
