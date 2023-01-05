import {
  DeviceThermostat,
  DeviceThermostatOutlined,
  DeviceThermostatRounded,
  DeviceThermostatSharp,
} from "@mui/icons-material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { weatherSituation } from "../utils";
import AirIcon from "@mui/icons-material/Air";
import WindPowerIcon from "@mui/icons-material/WindPower";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";

export default function CityDetail() {
  const { city } = useParams();
  const currentCity = useSelector((state) => state.allcity.allcities);
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dateValue =
    year.toString() + "-" + month.toString() + "-" + day.toString();


  const cityhaha = currentCity.filter((cityname) => {
    return cityname.city === city;
  });

  const bigCityFounder = currentCity.filter((cityName) => {
    return (
      cityName.city === "Istanbul" ||
      cityName.city === "Izmir" ||
      cityName.city === "Ankara" ||
      cityName.city === "Bursa" ||
      cityName.city === "Antalya" ||
      cityName.city === "Adana"
    );
  });

  return (
    <div style={{"margin-bottom":"5rem"}}>
      <div className="city-detail-main">
        <div className="city-detail-left">
          <p>{cityhaha[0].date}</p>
          <h1 style={{ marginTop: "-5px", "margin-bottom": "5px" }}>
            {cityhaha[0].city}
          </h1>
          <div className="city-detail-left-weather">
            <img
              src={`images/${weatherSituation(cityhaha[0].weather)}.svg`}
              alt=""
            />
            <h2 style={{ "font-weight": "bold" }}> {cityhaha[0].degree}</h2>
          </div>
          <p style={{ "margin-bottom": "45px" }}>{cityhaha[0].weather}</p>
        </div>
        <div className="city-detail-right">
          <div className="city-detail-infos">
            <div>
              <p className="detail-heading">DEGREE</p>
              <p className="detail-content">
                <DeviceThermostatSharp /> {cityhaha[0].degree}
              </p>
            </div>
            <div>
              <p className="detail-heading">WIND DIRECTION</p>
              <p className="detail-content">
                {" "}
                <AirIcon /> {cityhaha[0].windDirection}
              </p>
            </div>
            <div>
              <p className="detail-heading">WIND</p>
              <p className="detail-content">
                <WindPowerIcon />
                {cityhaha[0].wind}
              </p>
            </div>
            <div>
              <p className="detail-heading">HUMIDITY</p>
              <p className="detail-content">
                <ThunderstormIcon />
                {cityhaha[0].humidity}
              </p>
            </div>
            <div>
              <p className="detail-heading">PRESSURE</p>
              <p className="detail-content">
                <ThunderstormIcon />
                {cityhaha[0].pressure}
              </p>
            </div>
            <div>
              <p className="detail-heading">SIGHT DISTANCE</p>
              <p className="detail-content">
                <ThunderstormIcon />
                {cityhaha[0].sightDistance}
              </p>
            </div>
          </div>
        </div>
      </div>

    <h2 style={{"margin":"4rem 0 0rem 0"}}>Weather forecasts for the coming days for {cityhaha[0].city}</h2>


      <div className="daily-degree-wrapper">
        <div className="days">
          <p className="day-name">{cityhaha[0].day1}</p>
          <img
            src={cityhaha[0].day1WeatherIcon}
            alt=""
          />
          <p className="low-high">
            {cityhaha[0].day1HighDegree} / {cityhaha[0].day1LowDegree}
          </p>
        </div>
        <div className="days">
          <p className="day-name">{cityhaha[0].day2}</p>
          <img
            src={cityhaha[0].day2WeatherIcon}
            alt=""
          />
          <p className="low-high">
            {cityhaha[0].day2HighDegree} / {cityhaha[0].day2LowDegree}
          </p>
        </div>
        <div className="days">
          <p className="day-name">{cityhaha[0].day3}</p>
          <img
            src={cityhaha[0].day3WeatherIcon}
            alt=""
          />
          <p className="low-high">
            {cityhaha[0].day3HighDegree} / {cityhaha[0].day3LowDegree}
          </p>
        </div>
        <div className="days">
          <p className="day-name">{cityhaha[0].day4}</p>
          <img
            src={cityhaha[0].day4WeatherIcon}
            alt=""
          />
          <p className="low-high">
            {cityhaha[0].day4HighDegree} / {cityhaha[0].day4LowDegree}
          </p>
        </div>
        <div className="days">
          <p className="day-name">{cityhaha[0].day5}</p>
          <img
            src={cityhaha[0].day5WeatherIcon}
            alt=""
          />
          <p className="low-high">
            {cityhaha[0].day5HighDegree} / {cityhaha[0].day5LowDegree}
          </p>
        </div>
        <div className="days">
          <p className="day-name">{cityhaha[0].day6}</p>
          <img
            src={cityhaha[0].day6WeatherIcon}
            alt=""
          />
          <p className="low-high">
            {cityhaha[0].day6HighDegree} / {cityhaha[0].day6LowDegree}
          </p>
        </div>
        <div className="days">
          <p className="day-name">{cityhaha[0].day7}</p>
          <img
            src={cityhaha[0].day7WeatherIcon}
            alt=""
          />
          <p className="low-high">
            {cityhaha[0].day7HighDegree} / {cityhaha[0].day7LowDegree}
          </p>
        </div>
      </div>

      <div
        className="card-wrapper"
        style={{ marginTop: "3rem", justifyContent: "space-evenly" }}
      >
        {bigCityFounder.map((city) => (
          <Link to={`/${city.city}`}>
            <div className="city-card">
              <div className="card-content-body">
                <div className="card-content-heading">{city.city}</div>
                <div className="card-image">
                  <img
                    src={`images/${weatherSituation(city.weather)}.svg`}
                    alt=""
                  />
                </div>
                <div className="card-city-name">{city.weather}</div>
                <div className="card-city-name">{city.degree}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
