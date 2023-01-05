import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDailyDatas } from "../firebase";
import { Container, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { weatherSituation } from "../utils";

export default function Home() {
  const allcities = useSelector((state) => state.allcity.allcities);
  const [searchText, setSearchText] = useState("");

  const date = new Date();
  const day = date.getUTCDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const [dateValue, setValue] = useState("2023-01-05");
  // year.toString() + "-" + month.toString() + "-" + day.toString()

  useEffect(() => {
    getDailyDatas(dateValue);
  }, [dateValue]);

  const getDateHandle = (e) => {
    setValue(e.target.value);
  };

  const cityFilter = allcities.filter(({ city }) =>
    city.toLowerCase().startsWith(searchText.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box fixed="true" sx={{ mb: "1rem", display: "flex" }}>
        <TextField
          id="filled-search"
          label="Search City"
          type="search"
          variant="filled"
          value={searchText}
          onChange={({ target }) => setSearchText(target.value)}
        />

        <input
          type="date"
          className="date-filter"
          value={"2023-01-05"}
          onChange={getDateHandle}
        />
      </Box>

      <h2>
        {dateValue}
        <span style={{ "font-weight": "400" }}> daily weather reports</span>
      </h2>
      <div className="card-wrapper">
        {allcities.map((city) => (
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
    </Container>
  );
}
