import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import L from "leaflet";
import { Marker, Popup, useMap } from "react-leaflet";
import axios from "axios";

import MapLocation from "../models/map_location";
import Layout from "../components/Layout";
import Container from "../components/Container";
import Map from "../components/Map";
import Description from "../components/Description";
import Charts from "../components/Charts";
import LoadingSpinner from "../components/LoadingSpinner";

const MapMarkers = ({ locations, onClick }) => {
  const map = useMap();
  const corner1 = L.latLng(-100, -200);
  const corner2 = L.latLng(100, 200);
  const bounds = L.latLngBounds(corner1, corner2);

  map.setMaxBounds(bounds);

  return locations.map((location) => (
    <Marker
      key={location.country}
      position={[location.lat, location.long]}
      eventHandlers={{
        click: () => onClick(location.iso3),
      }}
    >
      <Popup>{location.country}</Popup>
    </Marker>
  ));
};

const IndexPage = () => {
  const default_location = {
    lat: 8,
    lng: -10,
  };
  const center = [default_location.lat, default_location.lng];
  const zoom = 1.45;
  const minZoom = 1.45;
  const maxZoom = 4.5;

  const [isLoading, setLoadingState] = useState(true);
  const [iso3, setIso3State] = useState("USA");
  const [locations, setLocationsState] = useState([]);

  const mapSettings = {
    center: center,
    defaultBaseMap: "OpenStreetMap",
    zoom: zoom,
    minZoom: minZoom,
    maxZoom: maxZoom,
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingState(true);

      const result = await axios.get(
        "https://disease.sh/v3/covid-19/countries?yesterday=true&twoDaysAgo=false&allowNull=false"
      );

      let newLocations = [];
      for (let country of result.data) {
        newLocations.push(new MapLocation(country));
      }
      setLocationsState(newLocations);
      setLoadingState(false);
    };

    fetchData().then(() => {});
  }, []);

  return isLoading ? (
    <div className="mt-5">
      <LoadingSpinner />
    </div>
  ) : (
    <Layout pageName="home" class>
      <Helmet>
        <title>Covid Map</title>
      </Helmet>

      <Container className="upper_row">
        <Map {...mapSettings}>
          <MapMarkers
            locations={locations}
            onClick={(tempIso3) => setIso3State(tempIso3)}
          />
        </Map>

        <Description iso3={iso3} />
      </Container>

      <Container className="lower_row">
        <Charts iso3={iso3} />
      </Container>
    </Layout>
  );
};

export default IndexPage;
