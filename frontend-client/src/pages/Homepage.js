import React, { useState, useEffect } from "react";
import axios from "axios";
import "antd/dist/reset.css";
import Loading from "../components/Loading";
import Error from "../components/Error";
import moment from "moment";
import { DatePicker } from "antd";
import Car from "../components/Car";

const { RangePicker } = DatePicker;

function Homepage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pickupdate, setPickupdate] = useState();
  const [returndate, setReturndate] = useState();
  const [matchcars, setMatchcars] = useState([]);

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

    fetchData();
  }, []);

  function filterByDate(dates) {
    try {
      if (Array.isArray(dates) && dates.length === 2) {
        setPickupdate(moment(dates[0].$d).format("YYYY-MM-DD"));
        setReturndate(moment(dates[1].$d).format("YYYY-MM-DD"));
      }

      var tempCars = [];
      for (const car of matchcars) {
        var availability = false;
        if (car.currentbookings.length > 0) {
          for (const booking of car.currentbookings) {
            if (
              !moment(moment(dates[0].$d).format("YYYY-MM-DD")).isBetween(
                booking.pickupdate,
                booking.returndate
              ) &&
              !moment(moment(dates[1].$d).format("YYYY-MM-DD")).isBetween(
                booking.pickupdate,
                booking.returndate
              )
            ) {
              if (
                moment(dates[0].$d).format("YYYY-MM-DD") !==
                  booking.pickupdate &&
                moment(dates[0].$d).format("YYYY-MM-DD") !==
                  booking.returndate &&
                moment(dates[1].$d).format("YYYY-MM-DD") !==
                  booking.pickupdate &&
                moment(dates[1].$d).format("YYYY-MM-DD") !== booking.returndate
              ) {
                availability = true;
              }
            }
          }
        }
        if (availability === true || car.currentbookings.length === 0) {
          tempCars.push(car);
        }
      }
      setCars(tempCars);
    } catch (error) {}
  }

  // Function to disable past dates
  function disabledDate(current) {
    return current && current < moment().endOf("day");
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-3">
          <RangePicker
            format="YYYY-MM-DD"
            onChange={filterByDate}
            disabledDate={disabledDate}
          />
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : (
          cars.map((car) => (
            <div key={car._id} className="col-md-4 mb-4">
              <Car car={car} pickupdate={pickupdate} returndate={returndate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Homepage;

