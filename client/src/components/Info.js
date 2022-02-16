import { Offcanvas, Button } from "react-bootstrap";
import React, { useState } from "react";

function Info() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        About
      </Button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Fima Treiger</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          This companion website was created as the final project for
          Developers.Institute Bootcamp
          <img
            style={{ width: "390px", height: "150px" }}
            src={
              "https://developers.institute/wp-content/uploads/2019/03/LOGO-DI.png"
            }
            alt="DI bootcamp logo"
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Info;
