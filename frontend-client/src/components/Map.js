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
  const map = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    map.current = L.map(mapRef.current).setView([52.350832, -6.453820], 12);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    // Update markers when chargePoints change
    if (!map.current || !chargePoints) return;

    // Clear existing markers
    map.current.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        map.current.removeLayer(layer);
      }
    });

    // Add markers for each charge point
    chargePoints.forEach(point => {
      L.marker([point.AddressInfo.Latitude, point.AddressInfo.Longitude])
        .addTo(map.current)
        .bindPopup(`
          <h3>${point.AddressInfo.Title}</h3>
          <p><strong>Address:</strong> ${point.AddressInfo.AddressLine1}, ${point.AddressInfo.Town}</p>
          <p><strong>Usage Type:</strong> ${point.UsageType?.Title || "N/A"}</p>
        `);
    });
  }, [chargePoints]);

  return <div style={{ height: '500px' }} ref={mapRef} />;
};

export default Map;

