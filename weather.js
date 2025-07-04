let city = document.querySelector(".city");
let btn = document.querySelector(".btn");
let text = document.querySelector(".temp");
let cityName = document.querySelector(".city-name");
let weatherIcon = document.querySelector(".weather-icon");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let visibility = document.querySelector(".visibility");
let pressure = document.querySelector(".pressure");
weatherIcon.style.display = "none";

let apiKey = `f2dd16c609fc4bf198c1ad2307dad774`;

btn.addEventListener("click", weather);
function weather() {
  if (city.value.trim() === "") {
    cityName.innerHTML = "";
    humidity.innerHTML = "";
    wind.innerHTML = "";
    visibility.innerHTML = "";
    pressure.innerHTML = "";
    text.innerHTML = "Please enter a city name";
    weatherIcon.src = "";
    weatherIcon.style.display = "none";
    return;
  }
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`
    )
    .then(function (response) {
      // handle success
      console.log(response);
      let citName = response.data.name;
      let iconCode = response.data.weather[0].icon;
      let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      let temp = response.data.main.temp;
      cityName.innerHTML = citName;
      text.innerHTML = `${temp} °C`;
      weatherIcon.style.display = "inline";
      weatherIcon.src = iconUrl;
      humidity.innerHTML = `HUMIDITY <br> ${response.data.main.humidity}%`;
      wind.innerHTML = `WIND <br> ${response.data.wind.speed} m/s`;
      visibility.innerHTML = `VISIBILITY <br> ${
        response.data.visibility / 1000
      } km`;
      pressure.innerHTML = `PRESSURE <br> ${response.data.main.pressure} hPa`;
    })
    .catch(function (error) {
      // handle error
      cityName.innerHTML = "";
      humidity.innerHTML = "";
      wind.innerHTML = "";
      visibility.innerHTML = "";
      pressure.innerHTML = "";
      weatherIcon.src = "";
      weatherIcon.style.display = "none";
      text.innerHTML = "City not found";
      console.log(error);
    });
  city.value = "";
}
