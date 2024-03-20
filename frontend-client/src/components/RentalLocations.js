import React, { useState, useEffect } from "react";
import axios from "axios";

const RentalLocations = () => {
  const [rentalLocations, setRentalLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/location/getalllocations");
        setRentalLocations(response.data);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Electric Rental Locations</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {rentalLocations.map((location) => (
          <li key={location._id} className="box">
            <h3>{location.name}</h3>
            <p>
              <strong>Opening Hours:</strong> {location.openHours}
            </p>
            <p>
              <strong>Cars Available:</strong> {location.carsAvailable}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RentalLocations;

  