import React, { useState, useEffect } from "react";
import axios from "axios";
import ChargePoints from "../components/Chargepoints";
import Map from "../components/Map";

function Mappage() {
  const [chargePoints, setChargePoints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/chargepoints/chargepoints");
        setChargePoints(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mappage-container box">
      <div className="chargepoints-list">
        <ChargePoints chargePoints={chargePoints} />
      </div>
      <div className="map-container">
        <Map chargePoints={chargePoints} />
      </div>
    </div>
  );
}

export default Mappage;
