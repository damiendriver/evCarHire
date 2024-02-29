import React, { useEffect, useRef } from 'react';
import "leaflet/dist/leaflet.css";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
});

const Map = ({ chargePoints }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize map
    const map = L.map(mapRef.current).setView([52.350832, -6.453820], 10); // Set initial view to a location

    // Add tile layer (you can use other tile providers)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for each charge point
    chargePoints.forEach(point => {
      L.marker([point.AddressInfo.Latitude, point.AddressInfo.Longitude])
        .addTo(map)
        .bindPopup(`
          <h3>${point.OperatorsReference}</h3>
          <p><strong>Address:</strong> ${point.AddressInfo.AddressLine1}, ${point.AddressInfo.Town}</p>
          <p><strong>Usage Type:</strong> ${point.UsageType?.Title || "N/A"}</p>
        `);
    });

    return () => {
      map.remove();
    };
  }, [chargePoints]);

  return <div style={{ height: '900px' }} ref={mapRef} />;
};

export default Map;
