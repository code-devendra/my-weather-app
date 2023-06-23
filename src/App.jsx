import "./App.css";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("Jaipur");
  const [weather, setWeather] = useState();
  const [population, setPopulation] = useState();
  const [error, setError] = useState(false);

  const fetchWeather = () => {
    setPopulation(null);
    setError(false);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6243aaf48b62471c43490a0d129cb8dc`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.cod === "404") {
          setError(true);
        } else {
          fetch("https://restcountries.com/v3.1/all?fields=capital,population")
            .then((res) => res.json())
            .then((data) => {
              data.forEach((element) => {
                if (element.capital[0] === city) {
                  setPopulation(element.population);
                }
              });
            })
            .catch((err) => console.log(error));
          setWeather(data);
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchWeather();
  };

  return (
    <div className="app flex flex-col items-center">
      <h1 className="my-5 text-3xl text-slate-700">Search Weather</h1>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            className="px-4 py-3 rounded-s-md outline-none"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-3 bg-blue-500 text-white rounded-e-md"
          >
            Search
          </button>
        </form>
        {error && (
          <p className="text-sm text-red-500 font-medium mt-1 pl-1">
            Invalid City Name
          </p>
        )}
      </div>

      {weather && (
        <div className="w-11/12 max-w-md mt-10 bg-white py-4 px-3 rounded-md shadow-sm">
          <img
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt="weather icon"
            className="mt-3 mx-auto w-[120px]"
          />
          <h2 className="text-2xl text-center text-black font-semibold">
            {(weather.main.temp - 273.15).toFixed(2)}&deg;C{" "}
            <span className="text-slate-700 font-medium">
              ({weather.weather[0].main})
            </span>
          </h2>
          <h4 className="text-lg text-center text-slate-600 font-semibold flex justify-center items-center">
            <span className="inline-block mr-1">
              <svg
                fill="#000000"
                width="20px"
                height="20px"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path d="M16.114-0.011c-6.559 0-12.114 5.587-12.114 12.204 0 6.93 6.439 14.017 10.77 18.998 0.017 0.020 0.717 0.797 1.579 0.797h0.076c0.863 0 1.558-0.777 1.575-0.797 4.064-4.672 10-12.377 10-18.998 0-6.618-4.333-12.204-11.886-12.204zM16.515 29.849c-0.035 0.035-0.086 0.074-0.131 0.107-0.046-0.032-0.096-0.072-0.133-0.107l-0.523-0.602c-4.106-4.71-9.729-11.161-9.729-17.055 0-5.532 4.632-10.205 10.114-10.205 6.829 0 9.886 5.125 9.886 10.205 0 4.474-3.192 10.416-9.485 17.657zM16.035 6.044c-3.313 0-6 2.686-6 6s2.687 6 6 6 6-2.687 6-6-2.686-6-6-6zM16.035 16.044c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4c2.207 0 4 1.794 4 4 0.001 2.206-1.747 4.044-3.954 4.044z"></path>{" "}
                </g>
              </svg>
            </span>
            {weather.name}
          </h4>
          <div className="flex justify-around items-center my-4 text-center">
            <div>
              <p className="text-slate-500 text-base font-medium mb-1">
                Humidity
              </p>
              <h4 className="text-black text-xl font-medium">
                {weather.main.humidity}%
              </h4>
            </div>
            <div>
              <p className="text-slate-500 text-base font-medium mb-1">
                Wind Speed
              </p>
              <h4 className="text-black text-xl font-medium">
                {weather.wind.speed} km/h
              </h4>
            </div>
          </div>
          {population && (
            <p className="text-center text-slate-500 font-medium">
              Population -{" "}
              <span className="text-black text-lg">{population}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
