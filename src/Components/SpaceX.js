import React, { useEffect, useState } from "react";
import "./SpaceX.css";
import axios from "axios";

const SpaceX = (props) => {
  const [searchResultsArray, setSearchResults] = useState([]);

  const getButtonsUsingMap = () => {
    const years = [
      2006,
      2007,
      2008,
      2009,
      2010,
      2011,
      2012,
      2013,
      2014,
      2015,
      2016,
      2017,
      2018,
      2019,
      2020,
    ];

    return years.map((year) => {
      return (
        <button key={year} onClick={handleSort(year)} className="btn btn-success">
          {year}
        </button>
      );
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const result = await axios({
          method: "GET",
          url: "https://api.spacexdata.com/v3/launches?limit=12",
          headers: {
            accept: " application/json",
          },
        });

        if (result) {
          setSearchResults(result.data);
        }
      } catch (err) {
        console.log(err.response);
      }
    })();
  }, []);

  const handleSuccess = (value) => (event) => {
    (async () => {
      try {
        const result = await axios({
          method: "GET",
          url: `https://api.spaceXdata.com/v3/launches?limit=8&launch_success=${value}`,
          headers: {
            accept: " application/json",
          },
        });

        if (result) {
          setSearchResults(result.data);
        }
      } catch (err) {
        console.log(err.response);
      }
    })();
  };

  const handleSuccessLanding = (value) => (event) => {
    (async () => {
      try {
        const result = await axios({
          method: "GET",
          url: `https://api.spaceXdata.com/v3/launches?limit=100&land_success=${value}`,
          headers: {
            accept: " application/json",
          },
        });

        if (result) {
          setSearchResults(result.data);
        }
      } catch (err) {
        console.log(err.response);
      }
    })();
  };

  const handleSort = (value) => (event) => {
    (async () => {
      try {
        const result = await axios({
          method: "GET",
          url: `https://api.spaceXdata.com/v3/launches?limit=8&launch_year=${value}`,
          headers: {
            accept: " application/json",
          },
        });

        if (result) {
          setSearchResults(result.data);
        }
      } catch (err) {
        console.log(err.response);
      }
    })();
  };

 
  return (
    <div className="container-fluid firstDiv">
      <h2>SpaceX Launch Programs</h2>

      <div className="row">
        <div className="col-md-2 filterCard">
          <div className="card" style={{ width: "13rem" }}>
            <div className="card-body">
              <h5 className="card-title">Filters</h5>
              <h6 className="mb-2 launch_year">
                Launch Year
                <hr />
              </h6>
              {getButtonsUsingMap()} <br /> <br />
              <h6 className="card-subtitle mb-2">
                <u>Successful Launch</u>
              </h6>
              <button onClick={handleSuccess(true)} className="btn btn-success">
                True
              </button>
              <button
                onClick={handleSuccess(false)}
                className="btn btn-success"
              >
                False
              </button>
              <br /> <br />
              <h6 className="card-subtitle mb-2">
                <u>Successful Landing</u>
              </h6>
              <button
                onClick={handleSuccessLanding(true)}
                className="btn btn-success"
              >
                True
              </button>
              <button
                onClick={handleSuccessLanding(false)}
                className="btn btn-success"
              >
                False
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-10">
          <div className="row rowDatas">
            {searchResultsArray.map((res) => (
              <div className="column col-md-3">
                <div
                  key={res.flight_number}
                  className="card resCards"
                  style={{ width: "16rem" }}
                >
                  <img
                    src={res.links.mission_patch}
                    className="card-img-top resImgs"
                    alt="Rocket"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {res.mission_name} #{res.flight_number}
                    </h5>
                    <p className="card-text">
                      <strong>Mission Ids: </strong> <li>{res.mission_id}</li>
                    </p>
                    <p className="card-text">
                      <strong>Launch Year: </strong> {res.launch_year}
                    </p>
                    <p className="card-text">
                      <strong>Successful Launch: </strong>
                      {res.launch_success.toString()}
                    </p>
                    <p className="card-text">
                      <strong>Successful Landing: </strong> {res.launch_landing}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-footer footerText">
        <h4>
          <strong>Developed by:</strong> Saikiran Neerukonda
        </h4>
      </div>
    </div>
  );
};

export default SpaceX;
