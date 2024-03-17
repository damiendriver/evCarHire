import React, { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/reset.css";
import Loading from "../components/Loading";
import moment from "moment";
import { DatePicker } from "antd";
import Car from "../components/Car";

const { RangePicker } = DatePicker;

function VehiclePage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pickupdate, setPickupdate] = useState();
  const [returndate, setReturndate] = useState();
  const [matchcars, setMatchcars] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [batteryType, setBatteryType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/car/getallcars");
        setCars(response.data);
        setMatchcars(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError(true);
        setLoading(false);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await axios.get("/api/location/getalllocations");
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchData();
    fetchLocations();
  }, []);

  function filterByDate(dates) {
    try {
      if (Array.isArray(dates) && dates.length === 2) {
        setPickupdate(moment(dates[0].$d).format("YYYY-MM-DD"));
        setReturndate(moment(dates[1].$d).format("YYYY-MM-DD"));

        const tempCars = matchcars.filter((car) =>
          isCarAvailable(car, dates[0], dates[1])
        );
        setMatchcars(tempCars);
      }
    } catch (error) {
      console.error("Error filtering by date:", error);
    }
  }

  function isCarAvailable(car, startDate, endDate) {
    if (car.currentbookings.length === 0) return true;

    for (const booking of car.currentbookings) {
      if (
        !moment(startDate).isBetween(
          booking.pickupdate,
          booking.returndate,
          null,
          "[]"
        ) &&
        !moment(endDate).isBetween(
          booking.pickupdate,
          booking.returndate,
          null,
          "[]"
        )
      ) {
        return true;
      }
    }
    return false;
  }

  function disabledDate(current) {
    return current && current < moment().endOf("day");
  }

  function filterBySearch(e) {
    const value = e.target.value;
    setSearchKey(value);
    const tempCars = matchcars.filter((car) =>
      car.makeModel.toLowerCase().includes(value.toLowerCase())
    );
    setMatchcars(tempCars);
  }

  function filterByBatteryType(e) {
    setBatteryType(e);
    let tempCars = [];
    if (e !== "all") {
      if (selectedLocation) {
        tempCars = cars.filter(
          (car) =>
            car.batteryType.toLowerCase() === e.toLowerCase() &&
            car.location === selectedLocation
        );
      } else {
        tempCars = cars.filter(
          (car) => car.batteryType.toLowerCase() === e.toLowerCase()
        );
      }
    } else {
      if (selectedLocation) {
        tempCars = cars.filter((car) => car.location === selectedLocation);
      } else {
        tempCars = cars;
      }
    }
    setMatchcars(tempCars);
  }

  useEffect(() => {
    filterByBatteryType(batteryType);
  }, [selectedLocation]);

  return (
    <div className="container">
      <div className="row mt-3 box">
        <div className="col-md-4">
          <select
            className="form-control"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location._id} value={location._id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <RangePicker
            format="YYYY-MM-DD"
            onChange={filterByDate}
            disabledDate={disabledDate}
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search Cars"
            value={searchKey}
            onChange={filterBySearch}
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-control"
            value={batteryType}
            onChange={(e) => filterByBatteryType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="full electric">Full Electric</option>
            <option value="hybrid">Hybrid</option>
            <option value="plug-in hybrid">Plug-in-Hybrid</option>
          </select>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loading />
        ) : (
          matchcars.map((car) => (
            <div key={car._id} className="col-md-4 mb-4">
              <Car car={car} pickupdate={pickupdate} returndate={returndate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default VehiclePage;
