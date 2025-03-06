const apiKey = "c9a24fbb413edfeefaafe17df260aa25";

async function loadCities() {
    try {
        const response = await fetch("cities.json");
        const cities = await response.json();
        const clocksContainer = document.getElementById("clocks");

        cities.forEach(city => {
            const cityDiv = document.createElement("div");
            cityDiv.classList.add("clock");
            cityDiv.id = city.name.toLowerCase().replace(/\s/g, "");

            cityDiv.innerHTML = `
                <h2>${city.name}</h2>
                <div class="weather"></div>
                <p class="date"></p>
                <p class="time"></p>
            `;

            clocksContainer.appendChild(cityDiv);
            updateWeather(city.id, city.name);
            updateTime(cityDiv.id, city.coord.lon);
        });

        setInterval(() => {
            cities.forEach(city => {
                updateTime(city.name.toLowerCase().replace(/\s/g, ""), city.coord.lon);
            });
        }, 1000);
    } catch (error) {
        console.error("Error loading cities:", error);
    }
}

function updateTime(cityId, lon) {
  const timeElement = document.querySelector(`#${cityId} .time`);
  const dateElement = document.querySelector(`#${cityId} .date`);
  const now = new Date();
  const utcOffset = lon / 15; 
  now.setUTCHours(now.getUTCHours() + utcOffset);

  const formattedTime = now.toTimeString().split(" ")[0]; 
  const formattedDate = now.toDateString();

  timeElement.innerText = formattedTime;
  dateElement.innerText = formattedDate;
}

function updateWeather(id, city) {
    const weatherElement = document.querySelector(`#${city.toLowerCase().replace(/\s/g, "")} .weather`);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const temp = Math.round(data.main.temp);
            const description = data.weather[0].description;
            const icon = data.weather[0].icon;
            weatherElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@4x.png" alt="Weather Icon">${description} ${temp}°C`;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherElement.innerText = "Failed to load weather";
        });
}

document.addEventListener("DOMContentLoaded", loadCities);
