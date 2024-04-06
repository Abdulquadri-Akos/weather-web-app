import "./bling.js";

// declare the variables
const apiKey = "1e124a3eef78453697fd7ffcf843ae24";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchInput = $(".search input");
const searchButton = $(".search button");
const weatherIcon = $(".weather-icon");

// Get the current date and time
const date = new Date();
const options = {
  weekday: "long",
  month: "long",
  day: "2-digit",
  year: "numeric",
};

// Get the current time
const time = new Date();
const getTime = time.toLocaleTimeString(undefined);

const formattedDate = date.toLocaleDateString(undefined, options);
$(".date").innerHTML = `${formattedDate} ${getTime}`;

// Get the weather data from the API
async function getWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();

  console.log(data);

  if (response.status == 404) {
    $(".error").style.display = "block";
    $(".weather").style.display = "none";
  } else {
    $(".city").innerHTML = data.name;
    $(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    $(".humidity").innerHTML = data.main.humidity + "%";
    $(".wind").innerHTML = data.wind.speed + "km/h";
    $(".description").innerHTML = data.weather[0].main;

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "assets/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "assets/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "assets/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "assets/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "assets/mist.png";
    }

    $(".weather").style.display = "block";
    $(".error").style.display = "none";
  }
}

// Event listener for the search button
searchButton.on("click", function () {
  console.log("I'm clicked");
  getWeather(searchInput.value);
});
