import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [pickupdate, setPickupdate] = useState(null);
  const [returndate, setReturndate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/car/getallcars");
        setCars(response.data);
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
    if (Array.isArray(dates) && dates.length === 2) {
      setPickupdate(moment(dates[0].$d).format("DD-MM-YYYY"));
      setReturndate(moment(dates[1].$d).format("DD-MM-YYYY"));
    }
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
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
