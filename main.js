import config from './config';
document.addEventListener("DOMContentLoaded", function () {

    const apiKey = config.apiKey;
    const apiUrl = config.apiUrl;
    

  const searchBox = document.querySelector(".search input");
  const searchBtn = document.querySelector(".search button");
  const weatherIcon = document.querySelector(".weather-icon");

  async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      var data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°c";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

      const weatherMain = data.weather[0].main.toLowerCase();
      console.log("Weather Main:", weatherMain);

      if (weatherMain.includes("cloud")) {
        weatherIcon.src = "images/clouds.png";
      } else if (weatherMain.includes("clear")) {
        weatherIcon.src = "images/clear.png";
      } else if (weatherMain.includes("rain")) {
        weatherIcon.src = "images/rain.png";
      } else if (weatherMain.includes("drizzle")) {
        weatherIcon.src = "images/drizzle.png";
      } else if (weatherMain.includes("mist")) {
        weatherIcon.src = "images/mist.png";
      } else if (weatherMain.includes("thunderstorm")) {
        weatherIcon.src = "images/storm.png";
      }

      document.querySelector(".error").style.display = "none";
      document.querySelector(".weather").style.display = "block";
    }
  }

  searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
  });
});
