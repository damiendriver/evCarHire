import React, { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/reset.css";
import Loading from "../components/Loading";
import moment from "moment";
import { DatePicker, Button } from "antd";
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
  const [canBook, setCanBook] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://ev-car-hire-backend.vercel.app/api/car/getallcars");
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
        const response = await axios.get("https://ev-car-hire-backend.vercel.app/api/location/getalllocations");
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchData();
    fetchLocations();
  }, []);
  

  function isCarAvailable(car, startDate, endDate) {
    if (car.currentbookings.length === 0) return true;
  
    for (const booking of car.currentbookings) {
      const bookingStartDate = moment(booking.pickupdate);
      const bookingEndDate = moment(booking.returndate);
  
      // Check if the selected date range overlaps with any booking
      if (
        (moment(startDate).isSameOrAfter(bookingStartDate) && moment(startDate).isBefore(bookingEndDate)) ||
        (moment(endDate).isAfter(bookingStartDate) && moment(endDate).isSameOrBefore(bookingEndDate)) ||
        (moment(startDate).isBefore(bookingStartDate) && moment(endDate).isAfter(bookingEndDate))
      ) {
        return false; // Car is not available for this date range
      }
    }
    return true; // Car is available for the selected date range
  }
  

  function disabledDate(current) {
    return current && current < moment().endOf("day");
  }

  function filterByDate(dates) {
    try {
      if (Array.isArray(dates) && dates.length === 2) {
        const startDate = moment(dates[0].$d).format("YYYY-MM-DD");
        const endDate = moment(dates[1].$d).format("YYYY-MM-DD");
  
        setPickupdate(startDate);
        setReturndate(endDate);
  
        let tempCars = cars;
        if (selectedLocation !== "") {
          // Filter by selected location
          tempCars = tempCars.filter((car) => car.location === selectedLocation);
        }
  
        tempCars = tempCars.filter((car) => isCarAvailable(car, startDate, endDate));
        
        setMatchcars(tempCars);
        setCanBook(selectedLocation !== "" && tempCars.length > 0); // Check both location and available cars
      }
    } catch (error) {
      console.error("Error filtering by date:", error);
    }
  }
  
  function filterBySearch(e) {
    const value = e.target.value;
    setSearchKey(value);
    let tempCars = cars;
    if (value === "") {
      // Reset the search key when input is empty
      if (selectedLocation !== "") {
        // Filter by selected location
        tempCars = tempCars.filter((car) => car.location === selectedLocation);
      }
      if (pickupdate && returndate) {
        // Filter by selected date range
        tempCars = tempCars.filter((car) =>
          isCarAvailable(car, pickupdate, returndate)
        );
      }
      setMatchcars(tempCars);
    } else {
      const searchTerm = value.toLowerCase();
      if (selectedLocation !== "") {
        // Filter by selected location
        tempCars = tempCars.filter((car) => car.location === selectedLocation);
      }
      if (pickupdate && returndate) {
        // Filter by selected date range
        tempCars = tempCars.filter((car) =>
          isCarAvailable(car, pickupdate, returndate)
        );
      }
      // Filter by search term
      tempCars = tempCars.filter((car) =>
        car.makeModel.toLowerCase().includes(searchTerm)
      );
      setMatchcars(tempCars);
    }
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
    setCanBook(selectedLocation !== "" && pickupdate && returndate && tempCars.length > 0); // Check all conditions for booking
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
            disabled={!selectedLocation} // Disable date picker until location is selected
            allowEmpty={!selectedLocation} // Allow empty only when location is not selected
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
            disabled={!selectedLocation} // Disable battery type selection until location is selected
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
        ) : matchcars.length > 0 ? (
          matchcars.map((car) => (
            <div key={car._id} className="col-md-4 mb-4">
              <Car
                car={car}
                pickupdate={pickupdate}
                returndate={returndate}
                canBook={canBook} // Pass canBook prop to Car component
              />
            </div>
          ))
        ) : (
          <div className="col-md-12 text-center">
            <p>No cars available for the selected criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VehiclePage;


