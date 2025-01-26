const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherBody = document.querySelector('.weather-body');
const locationNotFound = document.querySelector('.location-not-found');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

const apiKey = "4cd0eee81294c867b4bc4cfc64e998c5";

async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            locationNotFound.style.display = "block";
            weatherBody.style.display = "none";
            return;
        }

        locationNotFound.style.display = "none";
        weatherBody.style.display = "block";

        temperature.innerHTML = `${Math.round(data.main.temp - 273.15)}<sup>°C</sup>`;
        description.innerHTML = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${data.wind.speed} Km/H`;

        const weatherCondition = data.weather[0].main;
        const weatherIcons = {
            Clouds: "/assets/cloud.png",
            Clear: "/assets/clear.png",
            Rain: "/assets/rain.png",
            Mist: "/assets/mist.png",
            Snow: "/assets/snow.png",
        };

        weatherImg.src = weatherIcons[weatherCondition] || "/assets/default.png";
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city) {
        fetchWeather(city);
    }
});
