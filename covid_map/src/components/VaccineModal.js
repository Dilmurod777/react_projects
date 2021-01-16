import { Button, Modal } from "react-bootstrap";
import { trim } from "leaflet/src/core/Util";
import React from "react";
import PropTypes from "prop-types";
import Vaccine from "../models/vaccine";

const VaccineModal = ({ isModalShown, closeModal, chosenVaccine }) => {
  const decodeHTMLEntities = (text) => {
    let txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
  };

  return (
    <Modal show={isModalShown} onHide={closeModal} size="lg" centered>
      <Modal.Header>
        <Modal.Title className="fw-bolder">
          Candidate: {chosenVaccine.candidate}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {chosenVaccine.trialPhase !== "" ? (
          <p className="mb-1">
            Phase:
            <span className="badge bg-primary ms-1">
              {chosenVaccine.trialPhase}
            </span>
          </p>
        ) : null}
        {chosenVaccine.sponsors !== undefined ? (
          <p className="mb-1">
            Sponsors:
            {chosenVaccine.sponsors.map((sponsor) =>
              sponsor.split(",").map((item, index) => (
                <span key={index} className="badge bg-secondary ms-1">
                  {trim(item)}
                </span>
              ))
            )}
          </p>
        ) : null}
        {chosenVaccine.institutions !== undefined &&
        chosenVaccine.institutions.some(Boolean) ? (
          <p>
            Institutions:
            {chosenVaccine.institutions.map((institution, index) => (
              <span key={index} className="badge bg-secondary ms-1">
                {trim(institution)}
              </span>
            ))}
          </p>
        ) : (
          <br />
        )}
        <p className="text-muted fw-lighter">
          {decodeHTMLEntities(
            trim(chosenVaccine.details.replace("Background:", ""))
          )}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

VaccineModal.propTypes = {
  isModalShown: PropTypes.bool,
  closeModal: PropTypes.func,
  chosenVaccine: PropTypes.instanceOf(Vaccine),
};

export default VaccineModal;
