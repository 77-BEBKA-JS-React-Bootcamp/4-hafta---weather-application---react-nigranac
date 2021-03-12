import { useEffect, useState } from "react";
import "./App.scss";

const App = () => {
  const [location, setLocation] = useState("Edirne");
  const [weatherInfo, setWeatherInfo] = useState({});
  const [city, setCity] = useState("");

  const params = {
    key: "7c38adb197df4dcfaf2100729211103",
    location,
    days: 3,
  };

  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${params.key}&q=${params.location}&days=${params.days}&aqi=no&alerts=no`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWeatherInfo(data);
      });
  }, [location]);

  return (
    <>
      {/* <input
        onKeyDown={(event) => (event.keyCode === 13 ? setLocation(city) : null)}
        onChange={(event) => setCity(event.target.value)}
        onBlur={() => setLocation(city)}
      /> */}
      <div className="container">
        {weatherInfo.current && (
          <div className="weather-cards day">
            <div className="toolbar">
              <input
                style={{ width: "40%", height: "100%", borderRadius: "20px" }}
                placeholder="Please enter a city name"
                onKeyDown={(event) =>
                  event.keyCode === 13 ? setLocation(city) : null
                }
                onChange={(event) => setCity(event.target.value)}
                onBlur={() => setLocation(city)}
              />
            </div>
            <div className="district-title">
              <h2>{weatherInfo.location.name}</h2>
            </div>
            <div className="weatherIcon">
              <img
                className="weather-icon-first"
                src={weatherInfo.forecast.forecastday[0].day.condition.icon}
              />
            </div>
            <div className="temperature">
              <h1>{weatherInfo.forecast.forecastday[0].day.avgtemp_c}</h1>
              <h2>{weatherInfo.forecast.forecastday[0].day.condition.text}</h2>
            </div>
            <div className="weeks">
              <div className="day">
                <div className="day-id">
                  <h5>Tomorrow</h5>
                </div>
                <div className="day-temperature">
                  <h5>{weatherInfo.forecast.forecastday[1].day.avgtemp_c}</h5>
                </div>
                <div className="day-weather-icon">
                  <span>
                    {weatherInfo.forecast.forecastday[1].day.condition.text}
                  </span>
                  <span>
                    {" "}
                    <img
                      className="weather-icon"
                      src={
                        weatherInfo.forecast.forecastday[1].day.condition.icon
                      }
                    />
                  </span>
                </div>
              </div>
              <div className="day">
                <div className="day-id">
                  <h5>Next Day</h5>
                </div>
                <div className="day-temperature">
                  <h5>{weatherInfo.forecast.forecastday[2].day.avgtemp_c}</h5>
                </div>
                <div className="day-weather-icon">
                  <span>
                    {weatherInfo.forecast.forecastday[2].day.condition.text}
                  </span>
                  <span>
                    {" "}
                    <img
                      className="weather-icon"
                      src={
                        weatherInfo.forecast.forecastday[2].day.condition.icon
                      }
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
