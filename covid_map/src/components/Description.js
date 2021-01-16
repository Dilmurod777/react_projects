import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import MapLocation from "../models/map_location";
import LoadingSpinner from "./LoadingSpinner";
import Vaccine from "../models/vaccine";
import { Button, Modal } from "react-bootstrap";
import { trim } from "leaflet/src/core/Util";
import VaccineModal from "./VaccineModal";

const Description = ({ iso3 }) => {
  const [isLoading, setLoadingState] = useState(true);
  const [isModalShown, setModalShownState] = useState(false);
  const [chosenVaccine, setChosenVaccine] = useState(new Vaccine());
  const [location, setDataState] = useState(new MapLocation());
  const [vaccines, setVaccinesState] = useState([]);

  const closeModal = () => setModalShownState(false);
  const showModal = () => setModalShownState(true);

  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = ("0" + date.getMonth() + 1).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return day + "." + month + "." + year;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingState(true);

      if (iso3 === "") {
        return;
      }

      let result = await axios(
        `https://disease.sh/v3/covid-19/countries/${iso3}`
      );

      if (result.status === 200) {
        setDataState(new MapLocation(result.data));
      }

      result = await axios("https://disease.sh/v3/covid-19/vaccine");

      if (result.status === 200) {
        let newVaccines = [];
        for (let vaccine of result.data["data"]) {
          newVaccines.push(new Vaccine(vaccine));
        }

        setVaccinesState([...newVaccines]);
      }

      setLoadingState(false);
    };

    fetchData().then(() => {});
  }, [iso3]);

  return isLoading ? (
    <div className="description">
      <LoadingSpinner />
    </div>
  ) : (
    <div className="description">
      <div className="location">
        <div className="title">
          <div className="country_info">
            <img src={location.flag} alt={iso3} className="img-thumbnail" />
            <div>
              <h1>
                {location.country}, {location.continent}
              </h1>
              <small className="text-muted">
                Population: {location.population}
              </small>
            </div>
          </div>
          <p className="text-muted">{getFormattedDate(location.updated)}</p>
        </div>

        <div className="details">
          <table className="table table-light table-bordered align-middle text-end">
            <thead>
              <tr>
                <th className="text-start">#</th>
                <th className="text-center">Total</th>
                <th className="text-center">Today</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="text-start">Cases</th>
                <td>{location.cases}</td>
                <td>{location.todayCases}</td>
              </tr>
              <tr>
                <th className="text-start">Deaths</th>
                <td>{location.deaths}</td>
                <td>{location.todayDeaths}</td>
              </tr>
              <tr>
                <th className="text-start">Recovered</th>
                <td>{location.recovered}</td>
                <td>{location.todayRecovered}</td>
              </tr>
              <tr>
                <th className="text-start">Tests</th>
                <td colSpan="2">{location.tests}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h5 className="text-muted">Click to get more information</h5>
      <div className="vaccines">
        <ul className="list-group">
          {vaccines.map((vaccine) => (
            <li
              key={vaccines.indexOf(vaccine)}
              className="list-group-item"
              aria-current="true"
              onClick={() => {
                setChosenVaccine(vaccine);
                showModal();
              }}
            >
              {vaccine.candidate}
            </li>
          ))}
        </ul>
      </div>

      {isModalShown ? (
        <VaccineModal
          isModalShown={isModalShown}
          chosenVaccine={chosenVaccine}
          closeModal={closeModal}
        />
      ) : null}
    </div>
  );
};

Description.propTypes = {
  iso3: PropTypes.string,
};

export default Description;
