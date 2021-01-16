import React, { useEffect, useState } from "react";
import axios from "axios";

import CanvasJSReact from "../assets/js/canvasjs.react";
import PropTypes from "prop-types";
import LoadingSpinner from "./LoadingSpinner";

const getPointsArrayFromMap = (pointsMap) => {
  let pointsArray = [];

  for (let key in pointsMap) {
    const dateParts = key.split("/");
    pointsArray.push({
      x: new Date(+("20" + dateParts[2]), dateParts[0] - 1, +dateParts[1]),
      y: pointsMap[key],
    });
  }

  return pointsArray;
};

const Charts = ({ iso3 }) => {
  const CasesChart = CanvasJSReact.CanvasJSChart;
  const DeathChart = CanvasJSReact.CanvasJSChart;
  const RecoveredChart = CanvasJSReact.CanvasJSChart;

  const [isLoading, setLoadingState] = useState(true);
  const [hasError, setErrorState] = useState(false);
  const [casesPoints, setCasesPointsState] = useState({});
  const [deathPoints, setDeathPointsState] = useState({});
  const [recoveredPoints, setRecoveredPointsState] = useState({});

  const casesOptions = {
    animationEnabled: true,
    axisX: {
      tickColor: "darkblue",
      tickLength: 10,
      tickThickness: 2,
      gridColor: "lightblue",
      gridThickness: 2,
      interlacedColor: "#F0F8FF",
      lineColor: "darkblue",
      lineThickness: 2,
      valueFormatString: "MMM DD,Y",
    },
    axisY: {
      tickColor: "darkblue",
      tickLength: 10,
      tickThickness: 2,
      gridColor: "lightblue",
      gridThickness: 2,
      lineColor: "darkblue",
      lineThickness: 2,
      logarithmic: true,
      labelFormatter: function (e) {
        let value = e.value;

        if (value > 1000000) {
          return value / 1000000 + "M";
        }

        if (value > 1000) {
          return value / 1000 + "K";
        }

        return value;
      },
    },
    data: [
      {
        name: "Total Cases",
        showInLegend: true,
        markerSize: 10,
        markerColor: "darkblue",
        lineColor: "darkblue",
        type: "spline",
        dataPoints: getPointsArrayFromMap(casesPoints),
      },
    ],
  };

  const deathOptions = {
    animationEnabled: true,
    axisX: {
      tickColor: "rgba(255, 0, 0, 1)",
      tickLength: 10,
      tickThickness: 2,
      gridColor: "rgba(255, 0, 0, 0.1)",
      gridThickness: 2,
      interlacedColor: "rgba(255, 0, 0, 0.1)",
      lineColor: "rgba(255, 0, 0, 1)",
      lineThickness: 2,
      valueFormatString: "MMM DD,Y",
    },
    axisY: {
      tickColor: "rgba(255, 0, 0, 1)",
      tickLength: 10,
      tickThickness: 2,
      gridColor: "rgba(255, 0, 0, 0.1)",
      gridThickness: 2,
      lineColor: "rgba(255, 0, 0, 1)",
      lineThickness: 2,
      logarithmic: true,
      labelFormatter: function (e) {
        let value = e.value;

        if (value > 1000000) {
          return value / 1000000 + "M";
        }

        if (value > 1000) {
          return value / 1000 + "K";
        }

        return value;
      },
    },
    data: [
      {
        name: "Total Deaths",
        showInLegend: true,
        markerSize: 10,
        markerColor: "red",
        lineColor: "red",
        type: "spline",
        dataPoints: getPointsArrayFromMap(deathPoints),
      },
    ],
  };

  const recoveredOptions = {
    animationEnabled: true,
    axisX: {
      tickColor: "darkgreen",
      tickLength: 10,
      tickThickness: 2,
      gridColor: "lightgreen",
      gridThickness: 2,
      interlacedColor: "rgba(0, 255, 0, 0.1)",
      lineColor: "darkgreen",
      lineThickness: 2,
      valueFormatString: "MMM DD,Y",
    },
    axisY: {
      tickColor: "darkgreen",
      tickLength: 10,
      tickThickness: 2,
      gridColor: "lightgreen",
      gridThickness: 2,
      lineColor: "darkgreen",
      lineThickness: 2,
      logarithmic: true,
      labelFormatter: function (e) {
        let value = e.value;

        if (value > 1000000) {
          return value / 1000000 + "M";
        }

        if (value > 1000) {
          return value / 1000 + "K";
        }

        return value;
      },
    },
    data: [
      {
        name: "Total Recovered",
        showInLegend: true,
        markerSize: 10,
        markerColor: "darkgreen",
        lineColor: "darkgreen",
        type: "spline",
        dataPoints: getPointsArrayFromMap(recoveredPoints),
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingState(true);

      try {
        const result = await axios.get(
          `https://disease.sh/v3/covid-19/historical/${iso3}?lastdays=14`
        );

        if (result.status === 200) {
          setCasesPointsState(result.data["timeline"]["cases"]);
          setDeathPointsState(result.data["timeline"]["deaths"]);
          setRecoveredPointsState(result.data["timeline"]["recovered"]);
          setErrorState(false);
        } else {
          setErrorState(true);
        }
      } catch (e) {
        setErrorState(true);
      }

      setLoadingState(false);
    };

    fetchData().then(() => {});
  }, [iso3]);

  return isLoading ? (
    <LoadingSpinner />
  ) : hasError ? (
    <h1 className="display-6 text-center mt-5">
      No historical data for this country yet.
    </h1>
  ) : (
    <div className="charts">
      <CasesChart options={casesOptions} />
      <DeathChart options={deathOptions} />
      <RecoveredChart options={recoveredOptions} />
    </div>
  );
};

Charts.propTypes = {
  iso3: PropTypes.string,
};

export default Charts;
