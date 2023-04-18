import React, { useEffect, useState } from "react";
import Hot from "./assets/images/summer.jpg";
import Cold from "./assets/images/winter.jpg";
import Description from "./components/Description";
import { getWeatherData } from "./data/weatherService";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [city, setCity] = useState("London");
  const [bg, setBg] = useState(Hot);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWeatherData(city, units);
      setWeather(data);

      const threshold = units === "metric" ? 15 : 60;
      if (data.temp < threshold) setBg(Cold);
      else setBg(Hot);
    };
    fetchData();
  }, [units, city]);

  const handleUnits = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div
      className="w-full h-screen bg-center bg-cover text-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full h-screen bg-black/20">
        {weather && (
          <div className="sm:max-w-[600px] h-screen m-auto flex flex-col items-center justify-between p-4">
            <div className="w-full flex items-center justify-center p-4 rounded-lg bg-[var(--secondary-color)]">
              <input
                onKeyDown={enterKeyPressed}
                className="w-[260px] border-2 border-white rounded-lg bg-transparent p-2 font-semibold focus:outline-none placeholder:text-white"
                type="text"
                placeholder="Enter city name"
              />
              <button
                title="Navigate between metric/imperial"
                onClick={(e) => handleUnits(e)}
                className="px-2.5 py-12 border-none rounded-lg text-xl font-semibold hover:cursor-pointer"
              >
                °F
              </button>
            </div>

            <div className="flex items-center rounded-xl justify-between p-4 bg-[var(--secondary-color)]">
              <div className="flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-medium capitalize">{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3 className="text-2xl font-medium capitalize">
                  {weather.description}
                </h3>
              </div>
              <div className="temperature">
                <h1 className="text-2xl font-bold">{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>

            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
