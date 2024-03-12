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
      <h1>EV Charge Point Details</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {chargePoints.map((point) => (
          <li key={point.ID} className='box'>
            <h3>{point.AddressInfo.Title}</h3>
            <p>
              <strong>Address:</strong> {point.AddressInfo.AddressLine1}, {point.AddressInfo.Town}, {point.AddressInfo.StateOrProvince}, {point.AddressInfo.Postcode}
            </p>
            <p><strong>Latitude:</strong> {Number(point.AddressInfo.Latitude).toFixed(4)}, <strong>Longitude:</strong> {Number(point.AddressInfo.Longitude).toFixed(4)}</p>
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




