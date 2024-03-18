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
      <h1>Electric Rental Locations</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {rentalLocations.map((location) => (
          <li key={location._id} className="box">
            <h3>{location.name}</h3>
            <p>
              <strong>Latitude:</strong> {Number(location.latitude).toFixed(4)},{" "}
              <strong>Longitude:</strong>{" "}
              {Number(location.longitude).toFixed(4)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RentalLocations;

  