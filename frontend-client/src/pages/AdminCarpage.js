import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Input, Button, Space, message, Modal } from "antd";
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
      message.error("Error fetching cars. Please try again later.");
    }
    setLoading(false);
  };

  const handleDeleteCar = async (_id) => {
    setError("");
    try {
      console.log("Deleting car with ID:", _id);
      await axios.delete(`${BACKEND_URL}/api/car/deletecar/${_id}`);
      setCars((prevCars) =>
        prevCars.filter((car) => car._id !== _id)
      );
      message.success("Car deleted successfully");
    } catch (error) {
      console.error("Error deleting car:", error);
      setError("Error deleting car. Please try again later.");
      message.error("Error deleting car. Please try again later.");
    }
  };

  const confirmDeleteCar = (_id) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this car?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => handleDeleteCar(_id),
    });
  };

  const handleUpdatePrice = async (id) => {
    const updatedPrice = newPrices[id];
    if (!updatedPrice || isNaN(updatedPrice)) {
      message.error("Please enter a valid price.");
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
      message.success("Price updated successfully");
    } catch (error) {
      console.error("Error updating price:", error);
      message.error("Error updating price. Please try again.");
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
        <div className="col-md-12">
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
                  <Column
                    title="Delete Car"
                    key="delete"
                    render={(text, record) => (
                      <Space size="middle">
                        <Button
                          type="primary" danger
                          onClick={() => confirmDeleteCar(record._id)}
                        >
                          Delete
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
        </div>
      )}
    </div>
  );
}

export default AdminCarpage;

