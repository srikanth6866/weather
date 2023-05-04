const API_KEY = "AIzaSyA9x-Qbqg0c0oBqcwbx3zG7aYq6gbFnlc4";
const searchBox = document.querySelector(".search-box");
const city = document.querySelector(".city");
const date = document.querySelector(".date");
const temp = document.querySelector(".temp");
const weather = document.querySelector(".weather");
const hiLow = document.querySelector(".hi-low");

//function to fetch weather data from OpenWeatherMap API
async function getWeatherData(cityName) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
  const data = await response.json();
  return data;
}

// function to update the HTML with the weather data
function updateWeatherData(data) {
  city.textContent = `${data.name}, ${data.sys.country}`;
  const currentDate = new Date();
  date.textContent = currentDate.toLocaleDateString('en-US', {weekday: 'long', day: 'numeric', month: 'long'});
  temp.textContent = `${Math.round(data.main.temp)}°C`;
  weather.textContent = data.weather[0].main;
  hiLow.textContent = `${Math.round(data.main.temp_max)}°C / ${Math.round(data.main.temp_min)}°C`;
}

// event listener for the search box
searchBox.addEventListener("keypress", function(event) {
  if (event.keyCode === 13) {
    // get the weather data for the entered city
    getWeatherData(this.value)
      .then(data => {
        // update the HTML with the weather data
        updateWeatherData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }
});
function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  
    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector(".hi-low");
    hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
  }
  
  function dateBuilder(d) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }
  