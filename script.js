const apiKey = "c9a24fbb413edfeefaafe17df260aa25";
  
function updateTime(city, timezone) {
  const timeElement = document.querySelector(`#${city} .time`);
  const time = new Date().toLocaleTimeString('en-US', { timeZone: `${timezone}`, timeZoneName: 'short' });

  const [hour, minute, second] = time.split(':');
  const formattedTime = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:${second.padStart(2, '0')}`;
  
  
  timeElement.innerText = formattedTime;
        
}

/* function updateWeather(city, apiKey) {
  const weatherElement = document.querySelector(`#${city} .weather`);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
  fetch(url)
    .then(response => response.json())  // Il faut utiliser .json() ici
    .then(data => {
        const temp = data.main.temp;
        console.log(temp);
        weatherElement.innerText = `${temp}°C`;
    })
    .catch(error => {
        console.error("Error fetching weather data:", error);
        weatherElement.innerText = "Failed to load weather data";
    });
}


updateWeather("Tokyo");
updateWeather("Los Angeles");
updateWeather("New York"); */

setInterval(() => {
    updateTime("tokyo", "Asia/Tokyo");
    updateTime("losangeles", "America/Los_Angeles");
    updateTime("newyork", "America/New_York");
}, 1000);


//[35.6895, 139.6917] tokyo

