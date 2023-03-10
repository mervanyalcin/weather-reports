// @ts-nocheck
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDailyDatas } from "../firebase";
import { weatherSituation } from "../utils";
import React from "react";
import AirIcon from "@mui/icons-material/Air";
import WindPowerIcon from "@mui/icons-material/WindPower";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import { DeviceThermostatSharp, Today } from "@mui/icons-material";

export default function Home() {
  const allcities = useSelector((state) => state.allcity.allcities);
  let date = new Date();
  let day = date.getUTCDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  const todayDate = year + "-" + month + "-" + day;

  const [searchText, setSearchText] = useState("");
  const [dateValue, setDateValue] = useState(todayDate);

  const cityFilter = allcities.filter((item) =>
    item.city.toLowerCase().startsWith(searchText.toLowerCase())
  );

  const bigCitiesFilter = allcities.filter((cityName) => {
    return (
      cityName.city === "Istanbul" ||
      cityName.city === "Izmir" ||
      cityName.city === "Ankara" ||
      cityName.city === "Bursa" ||
      cityName.city === "Antalya"
    );
  });

  const capitalCitiesFilter = allcities.filter((cityName) => {
    return (
      cityName.city === "Moskova" ||
      cityName.city === "Roma" ||
      cityName.city === "Paris" ||
      cityName.city === "Barcelona" ||
      cityName.city === "New_York"
    );
  });

  useEffect(() => {
    getDailyDatas(dateValue);
  }, [dateValue]);

  return (
    <div>
      {/* Header Search Area */}
      <div className="flex grow my-5">
        <input
          type="search"
          value={searchText}
          id="default-search"
          className="block w-full p-4 pl-10 text-sm  border border-gray-300 rounded-lg bg-gray-50 "
          placeholder="Search for the city you live in"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <input
          type="date"
          className="date-filter"
          max={todayDate}
          value={dateValue}
          onChange={(e) => {
            setDateValue(e.target.value);
          }}
        />
      </div>
      {searchText.length > 0 ? (
        <div className="">
          {cityFilter.length > 0 ? (
            <>
              {cityFilter.map((cityhaha) => {
                return (
                  <div className="flex flex-col bg-white mb-10 px-10 py-10 shadow-lg border-l-4 border-l-gray-500 rounded-2xl">
                    <h1 className="text-4xl font-bold text-center">
                      {cityhaha.city}
                    </h1>
                    <h2 className="mt-4 mb-2 text-lg text-center">
                      <span className="font-bold">{cityhaha.city}</span> i??in
                      bug??n neler olacak?
                    </h2>
                    <div className="flex rounded-xl border py-8 max-w-xl bg-white items-center self-center gap-x-20 px-10 mt-4 ">
                      <p className="font-bold">{cityhaha.date}</p>
                      {/* <h1 className=" mb-1">{cityhaha.city}</h1> */}
                      <p className="">{cityhaha.weather}</p>
                      <div className="flex gap-y-2 justify-around">
                        <img
                          src={`images/${weatherSituation(
                            cityhaha.weather
                          )}.svg`}
                          alt=""
                        />
                        <h2 className="font-bold">{cityhaha.degree}</h2>
                      </div>
                    </div>

                    <div className="flex justify-between text-center mt-6 mb-2">
                      <div>
                        <p className="font-bold">DERECE</p>
                        <p>
                          <DeviceThermostatSharp />
                          {cityhaha.degree}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">R??ZGAR</p>
                        <p>
                          <WindPowerIcon />
                          {cityhaha.wind}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">R??ZGAR Y??N??</p>
                        <p>
                          <AirIcon />
                          {cityhaha.windDirection}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">NEM</p>
                        <p>
                          <ThunderstormIcon />
                          {cityhaha.humidity}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">BASIN??</p>
                        <p>
                          <ThunderstormIcon />
                          {cityhaha.pressure}
                        </p>
                      </div>
                      <div>
                        <p className="font-bold">G??R???? MESAFES??</p>
                        <p>
                          <ThunderstormIcon />
                          {cityhaha.sightDistance}
                        </p>
                      </div>
                    </div>

                    <h2 className="mt-6">
                      <span className="font-bold"> {cityhaha.city}</span> i??in
                      ??n??m??zdeki g??nlere ait hava durumu tahminleri
                    </h2>

                    <div className="flex justify-between mt-4 text-center days ">
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">{cityhaha.day1}</p>
                        <img src={cityhaha.day1WeatherIcon} alt="" />
                        <p className="">
                          {cityhaha.day1HighDegree} / {cityhaha.day1LowDegree}
                        </p>
                      </div>
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">{cityhaha.day2}</p>
                        <img src={cityhaha.day2WeatherIcon} alt="" />
                        <p className="">
                          {cityhaha.day2HighDegree} / {cityhaha.day2LowDegree}
                        </p>
                      </div>
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">{cityhaha.day3}</p>
                        <img src={cityhaha.day3WeatherIcon} alt="" />
                        <p className="">
                          {cityhaha.day3HighDegree} / {cityhaha.day3LowDegree}
                        </p>
                      </div>
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">{cityhaha.day4}</p>
                        <img src={cityhaha.day4WeatherIcon} alt="" />
                        <p className="">
                          {cityhaha.day4HighDegree} / {cityhaha.day4LowDegree}
                        </p>
                      </div>
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">{cityhaha.day5}</p>
                        <img src={cityhaha.day5WeatherIcon} alt="" />
                        <p className="">
                          {cityhaha.day5HighDegree} / {cityhaha.day5LowDegree}
                        </p>
                      </div>
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">{cityhaha.day6}</p>
                        <img src={cityhaha.day6WeatherIcon} alt="" />
                        <p className="">
                          {cityhaha.day6HighDegree} / {cityhaha.day6LowDegree}
                        </p>
                      </div>
                      <div className="w-full flex flex-col items-center gap-y-6 pt-4">
                        <p className="day-name">{cityhaha.day7}</p>
                        <img src={cityhaha.day7WeatherIcon} alt="" />
                        <p className="">
                          {cityhaha.day7HighDegree} / {cityhaha.day7LowDegree}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div className="w-full bg-white my-10 py-10 px-5 shadow-lg">
                <p className="font-semibold text-md text-center  text-red-500 ">
                  Bug??ne ait herhangi bir hava durumu bilgisi yoktur.
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="bg-white my-10 py-10 px-5 shadow-lg">
          <p className="text-md text-center uppercase">
            Hava tahmini raporunu g??rmek istedi??iniz ??ehrin ad??n?? yaz??n??z.
          </p>
        </div>
      )}

      <div className="bg-white my-10 py-10 px-5 shadow-lg">
        <div className="rounded-lg">
          <p className="mb-6 font-semibold text-xl text-center uppercase text-black">
            Baz?? b??y??k ??ehirlerimizin g??nl??k hava durumu
          </p>
          <div className="flex text-center justify-between">
            {bigCitiesFilter.length > 0 ? (
              <>
                {bigCitiesFilter.map((city, index) => (
                  <div
                    className="flex flex-col w-[170px] border-t-4 border-2 border-t-[#10bbc7] items-center gap-y-4 py-6 bg-[#ffffff]"
                    onClick={() => {
                      setSearchText(city.city);
                    }}
                  >
                    <div className="">{city.city}</div>
                    <div className="">
                      <img
                        src={`images/${weatherSituation(city.weather)}.svg`}
                        alt=""
                      />
                    </div>
                    <div className="card-city-name">{city.weather}</div>
                    <div className="card-city-name">{city.degree}</div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="w-full">
                  <p className="font-semibold text-md text-center text-red-500 ">
                    Bug??ne ait herhangi bir hava durumu bilgisi yoktur.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white my-10 py-10 px-5 shadow-lg">
        <div className="rounded-lg">
          <p className="mb-6 font-semibold text-xl text-center uppercase text-black">
            BAZI ??LKELERIN BA??KENTLERININ G??NL??K HAVA DURUMU
          </p>
          <div className="flex text-center justify-between">
            {capitalCitiesFilter.length > 0 ? (
              <>
                {capitalCitiesFilter.map((city, index) => (
                  <div
                    className="flex flex-col w-[170px] border-t-4 border-2 border-t-[#10bbc7] items-center gap-y-4 py-6 bg-[#ffffff]"
                    onClick={() => {
                      setSearchText(city.city);
                    }}
                  >
                    <div className="">{city.city}</div>
                    <div className="">
                      <img
                        src={`images/${weatherSituation(city.weather)}.svg`}
                        alt=""
                      />
                    </div>
                    <div className="card-city-name">{city.weather}</div>
                    <div className="card-city-name">{city.degree}</div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="w-full">
                  <p className="font-semibold text-md text-center  text-red-500 ">
                    Bug??ne ait herhangi bir hava durumu bilgisi yoktur.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
