import React, { useState } from "react";
import "../index.css";

const Whether = () => {
  const [City, setCity] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  let getData = (event) => {
    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${City}&units=metric&appid=f38b6732afeef6afde82d007063553e8`
    ).then((res) => {
      res.json().then((data) => {
        if (data.cod === "404") {
          setWeatherData("");
        } else {
          setWeatherData(data);
        }
      });
      setLoading(false);
    });
    event.preventDefault();
    setCity("");
  };

  return (
    <>
      <div className="flex justify-center items-center h-[85vh] text-black">
        <div className="text-center bg-purple-200 rounded-lg p-10">
          <h1 className="text-4xl font-bold ">Weather App</h1>
          <div className="flex justify-center items-center mt-10 gap-2">
            <form
              onSubmit={getData}
              className="flex justify-center items-center gap-2"
            >
              <input
                type="text"
                placeholder="Enter City"
                value={City}
                onChange={handleChange}
                className="bg-transparent border-2 border-zinc-900 outline-none rounded-md p-2  w-full"
              />
              <button className="bg-purple-800 text-white  px-4 py-2.5 rounded-md font-semibold flex justify-center items-center">
                Search
                <lord-icon
                  src="https://cdn.lordicon.com/msoeawqm.json"
                  trigger="hover"
                  colors="primary:#ffffff"
                  style={{ width: "25px", height: "25px", paddingLeft: "5px" }}
                ></lord-icon>
              </button>
            </form>
          </div>
          <div
            className={`loader flex justify-center items-center flex-col mt-10 ${
              loading ? "flex" : "hidden"
            }`}
          >
            <div className="spinner animate-spin h-10 w-10 border-t-2 border-b-2 border-gray-900 rounded-full"></div>
            <span className="text-xl font-bold">Loading...</span>
          </div>
          {weatherData !== "" ? (
            <>
              <div className=" text-center  items-center mt-10 gap-2">
                <div className="flex justify-center items-center flex-col w-full">
                  <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                    className="object-contain h-40 w-full object-center"
                  />
                  <span>{weatherData.weather[0].description}</span>
                </div>
                <div className="flex flex-col justify-center items-center mt-2">
                  <h2 className="text-2xl font-bold">
                    {weatherData.main.temp}°C
                  </h2>
                  <h1 className="text-4xl font-bold">{weatherData.name}</h1>
                </div>
              </div>
            </>
          ) : (
            <h1 className="text-2xl font-bold mt-10">No Data Found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Whether;
