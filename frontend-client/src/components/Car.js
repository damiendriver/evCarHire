import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/FormatPrice";

function Car({ car, pickupdate, returndate, canBook }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="card box">
      <img
        src={car.imageURLs[0]}
        className="card-img-top"
        alt={car.makeModel}
      />
      <div className="card-body">
        <h5 className="card-title">{car.makeModel}</h5>
        <p className="card-text">Car Group: {car.carGroup}</p>
        <p className="card-text">Acriss: {car.acriss}</p>
        <p className="card-text">Battery: {car.batteryType}</p>
        <p className="card-text">Price Per Day: {formatPrice(car.priceAmount)}</p>
        <div>
          {canBook && (
            <Link to={`/book/${car._id}/${pickupdate}/${returndate}`}>
              <button className="btn btn-primary m-3">Book Now</button>
            </Link>
          )}
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
            {car.imageURLs.map((url, index) => (
              <Carousel.Item key={`${url}-${index}`}>
                <img className="d-block w-100" src={url} alt={car.makeModel} />
              </Carousel.Item>
            ))}
          </Carousel>
          <b>
            <p>Vehicle Battery: {car.batteryType}</p>
            <p>Price Per Day: {formatPrice(car.priceAmount)}</p>
            <p>Free Charging Included.</p>
            <p>50 Kilometres Included, 0.17 EUR Each Extra Kilometre</p>
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