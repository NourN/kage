document.addEventListener("DOMContentLoaded", function() {
  function updateTime(city, timezone) {
      const timeElement = document.querySelector(`#${city} .time`);
      const url = `http://worldtimeapi.org/api/timezone/${timezone}.json`;
      fetch(url)
          .then(response => response.json())
          .then(data => {
              const time = new Date(data.utc_datetime);
              timeElement.innerText = time.toLocaleTimeString();
          });
  }

  function updateWeather(city, apiKey) {
      const weatherElement = document.querySelector(`#${city} .weather`);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      fetch(url)
          .then(response => response.json())
          .then(data => {
              const temp = data.main.temp;
              weatherElement.innerText = `${temp}°C`;
          });
  }

  const apiKey = "22f28d4e6aa7d08955d7827877b3fede";  // Remplace par ta clé API

  updateTime("tokyo", "Asia/Tokyo");
  updateTime("losangeles", "America/Los_Angeles");
  updateTime("newyork", "America/New_York");

  updateWeather("Tokyo", apiKey);
  updateWeather("Los Angeles", apiKey);
  updateWeather("New York", apiKey);

  setInterval(() => {
      updateTime("tokyo", "Asia/Tokyo");
      updateTime("losangeles", "America/Los_Angeles");
      updateTime("newyork", "America/New_York");
  }, 1000);
});
