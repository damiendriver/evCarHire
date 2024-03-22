import React, { useState, useEffect } from "react";
import axios from "axios";
import Map from "../components/Map";
import RentalLocations from "../components/RentalLocations";

function Locationpage() {
  const [rentalLocations, setRentalLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://ev-car-hire-backend.vercel.app/api/location/getalllocations");
        setRentalLocations(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mappage-container box">
      <h2 className="map-title">EV Rental Locations Map</h2>
      <div className="map-container">
        <Map rentalLocations={rentalLocations} />
      </div>
      <div className="rental-locations">
        <RentalLocations rentalLocations={rentalLocations} />
      </div>
    </div>
  );
}

export default Locationpage;