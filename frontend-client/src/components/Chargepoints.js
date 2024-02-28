import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChargePoints = () => {
  const [chargePoints, setChargePoints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/chargepoints/chargepoints');
        setChargePoints(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>EV Charge Points</h1>
      <ul>
        {chargePoints.map((point) => (
          <li key={point.ID}>
            <h3>{point.OperatorsReference}</h3>
            <p>
              <strong>Address:</strong> {point.AddressInfo.AddressLine1}, {point.AddressInfo.Town}, {point.AddressInfo.StateOrProvince}, {point.AddressInfo.Postcode}
            </p>
            <p><strong>Latitude:</strong> {point.AddressInfo.Latitude}, <strong>Longitude:</strong> {point.AddressInfo.Longitude}</p>
            <p>
              <strong>Usage Type:</strong> {point.UsageType?.Title || "N/A"}
            </p>
            <strong>Connections:</strong>
            <ul>
              {point.Connections.map((connection) => (
                <li key={connection.ID}>
                  {connection.ConnectionType.Title} - {connection.PowerKW} kW
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChargePoints;




