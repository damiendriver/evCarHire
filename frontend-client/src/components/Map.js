import React, { useEffect, useRef } from 'react';
import "leaflet/dist/leaflet.css";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import customIcon from "../images/charging-station.png";
import rentalIcon from "../images/EV-CarRental-logo.png";
import L from "leaflet";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
});

const Map = ({ chargePoints, rentalLocations }) => {
  const mapRef = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    map.current = L.map(mapRef.current).setView([52.350832, -6.453820], 10);

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
    if (!map.current) return;

    map.current.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        map.current.removeLayer(layer);
      }
    });

    const customMarkerIcon = L.icon({
      iconUrl: customIcon,
      iconSize: [40, 40],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const rentalMarkerIcon = L.icon({
      iconUrl: rentalIcon,
      iconSize: [40, 40],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    if (chargePoints) {
      chargePoints.forEach(point => {
        L.marker([point.AddressInfo.Latitude, point.AddressInfo.Longitude], { icon: customMarkerIcon })
          .addTo(map.current)
          .bindPopup(`
            <h3>${point.AddressInfo.Title}</h3>
            <p><strong>Address:</strong> ${point.AddressInfo.AddressLine1}, ${point.AddressInfo.Town}</p>
            <p><strong>Usage Type:</strong> ${point.UsageType?.Title || "N/A"}</p>
          `);
      });
    }

    if (rentalLocations) {
      rentalLocations.forEach(location => {
        L.marker([location.latitude, location.longitude], { icon: rentalMarkerIcon })
          .addTo(map.current)
          .bindPopup(`
            <h3>${location.name}</h3>
            <p><strong>Address:</strong> ${location.town}</p>
            <p><strong>Eircode:</strong> ${location.eircode}</p>
            <p><strong>Opening Hours:</strong> ${location.openHours}</p>
          `);
      });
    }

  }, [chargePoints, rentalLocations]);

  return <div style={{ height: '750px', width: '100%' }} ref={mapRef} />;
};

export default Map;

