const apiKey = "c9a24fbb413edfeefaafe17df260aa25";
  
function updateTime(city, timezone) {
  const timeElement = document.querySelector(`#${city} .time`);
  const time = new Date().toLocaleTimeString('en-US', { timeZone: `${timezone}`, timeZoneName: 'short' });

  const [hour, minute, second] = time.split(':');
  const formattedTime = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`;
  
  
  timeElement.innerText = formattedTime;
        
}

function updateWeather(id, city) {
  const weatherElement = document.querySelector(`#${id} .weather`);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  fetch(url)
    .then(response => response.json())  // Il faut utiliser .json() ici
    .then(data => {

        console.log(data)
        const temp = Math.round(data.main.temp);
        const icon = data.weather[0].icon;
        
        weatherElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon"> ${temp}°C`;

    })
    .catch(error => {
        console.error("Error fetching weather data:", error);
        weatherElement.innerText = "Failed to load weather data";
    });
}
updateWeather("tokyo", "Tokyo");
updateWeather("losangeles", "Los Angeles");
updateWeather("newyork", "New York");


setInterval(() => {
    updateTime("tokyo", "Asia/Tokyo");
    updateTime("losangeles", "America/Los_Angeles");
    updateTime("newyork", "America/New_York");
}, 1000);

