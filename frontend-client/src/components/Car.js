import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Car({ car, pickupdate, returndate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="row box" key={car._id}>
      <div className="col-md-4">
        <img src={car.imageURLs[0]} className="singleimg" alt="nice car" />
      </div>
      <div className="col-md-7">
        <h1>{car.makeModel}</h1>
        <p>Car Group:{car.carGroup}</p>
        <p>Acriss:{car.acriss}</p>
        <p>Battery:{car.batteryType}</p>

        <div>
          <Link to={`/book/${car._id}/${pickupdate}/${returndate}`}>
            <button className="btn btn-primary m-3">Book Now</button>
          </Link>
          <button className="btn btn-primary" onClick={handleShow}>
            More Car Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{car.makeModel}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {car.imageURLs.map((url, index) => {
              return (
                <Carousel.Item key={`${url}-${index}`}>
                  <img
                    className="d-block w-100 rotaimg"
                    src={url}
                    alt={car.makeModel}
                  />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <b>
            <p>Vehicle Acriss: {car.acriss}</p>
            <p>Vehicle Group: {car.carGroup}</p>
            <p>Vehicle Battery: {car.batteryType}</p>
          </b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Car;
