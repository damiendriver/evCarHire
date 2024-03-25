import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Input, Button, Space } from "antd";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { formatPrice } from "../utils/FormatPrice";
import BACKEND_URL from "../utils/BaseUrl";

const { Column } = Table;

function AdminCarpage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newPrices, setNewPrices] = useState({});

  const getallcars = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/car/getallcars`);
      setCars(response.data);
    } catch (error) {
      console.log(error);
      setError("Error fetching cars");
    }
    setLoading(false);
  };

  const handleUpdatePrice = async (id) => {
    const updatedPrice = newPrices[id];
    if (!updatedPrice || isNaN(updatedPrice)) {
      alert("Please enter a valid price.");
      return;
    }

    try {
      await axios.put(`${BACKEND_URL}/api/car/${id}`, { priceAmount: updatedPrice });
      setCars((prevCars) =>
        prevCars.map((car) =>
          car._id === id ? { ...car, priceAmount: parseFloat(updatedPrice) } : car
        )
      );
      setNewPrices((prevPrices) => {
        const updated = { ...prevPrices };
        delete updated[id];
        return updated;
      });
    } catch (error) {
      console.error("Error updating price:", error);
      alert("Error updating price. Please try again.");
    }
  };

  useEffect(() => {
    console.log("Component mounted or updated.");
    getallcars();
  }, []);

  const handleInputChange = (id, value) => {
    setNewPrices((prevPrices) => ({
      ...prevPrices,
      [id]: value.trim(),
    }));
  };

  return (
    <div className="admin-carpage-container">
      {loading ? (
        <Loading />
      ) : error ? (
        <Error msg={error} />
      ) : (
        <div className="table-container">
          {Array.isArray(cars) && cars.length ? (
            <>
              <h3>Total Cars: {cars.length}</h3>
              <Table dataSource={cars} rowKey="_id" className="responsive-table">
                <Column title="Car ID" dataIndex="_id" key="_id" />
                <Column title="Make Model" dataIndex="makeModel" key="makeModel" />
                <Column title="Acriss" dataIndex="acriss" key="acriss" />
                <Column title="Car Group" dataIndex="carGroup" key="carGroup" />
                <Column title="Battery Type" dataIndex="batteryType" key="batteryType" />
                <Column
                  title="Price"
                  dataIndex="priceAmount"
                  key="priceAmount"
                  render={(text, record) => formatPrice(record.priceAmount)}
                />
                <Column
                  title="Update Price"
                  key="update"
                  render={(text, record) => (
                    <Space size="middle">
                      <Input
                        type="number"
                        value={newPrices[record._id] || ""}
                        onChange={(e) => handleInputChange(record._id, e.target.value)}
                        placeholder="New Price"
                      />
                      <Button
                        type="primary"
                        onClick={() => handleUpdatePrice(record._id)}
                      >
                        Update
                      </Button>
                    </Space>
                  )}
                />
              </Table>
            </>
          ) : (
            <p>No cars available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminCarpage;
