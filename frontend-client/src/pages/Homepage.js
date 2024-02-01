import React, { useState, useEffect } from "react";
import axios from "axios";
import Car from "../components/Car";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Homepage() {
  const [cars, setcars] = useState([]);
  const [loading, setloading] = useState();
  const [error, seterror] = useState();
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

  return (
    <div className="container">
      <div className="row justify-content-center mt-5"></div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        cars.map((car) => {
          return (
            <div key={car._id} className="col-md-9 mt-2">
              <Car car={car}/>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Homepage;
