import React, { useState, useEffect } from "react";
import axios from "axios";
import Car from "../components/Car";
import Loading from "../components/Loading";
import Error from "../components/Error";
import "antd/dist/reset.css";
import moment from "moment";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

function Homepage() {
  const [cars, setcars] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [pickupdate, setpickupdate] = useState();
  const [returndate, setreturndate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const data = (await axios.get("/api/cars/getallcars")).data;

        setcars(data);
        setloading(false);

        console.log(data);
      } catch (error) {
        seterror(true);
        console.log(error);
        setloading(false);
      }
    };

    fetchData();

    return () => {};
  }, []);

  function filterByDate(dates) {
    console.log("Selected dates:", dates);

    // Ensure dates array contains valid dates
    if (Array.isArray(dates) && dates.length === 2) {
      console.log(
        "First selected date:",
        moment(dates[0].$d).format("DD-MM-YYYY")
      );
      console.log(
        "Second selected date:",
        moment(dates[1].$d).format("DD-MM-YYYY")
      );

      setpickupdate(moment(dates[0].$d).format("DD-MM-YYYY"));
      setreturndate(moment(dates[1].$d).format("DD-MM-YYYY"));
    }
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
      </div>

      <div className="row justify-content-center mt-5"></div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        cars.map((car) => {
          return (
            <div key={car._id} className="col-md-9 mt-2">
              <Car car={car} pickupdate={pickupdate} returndate={returndate} />
            </div>
          );
        })
      )}
    </div>
  );
}

export default Homepage;
