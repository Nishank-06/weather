const apiKey = "9cb0f65dea4bda3a822d6076f787c2cd"; // Replace with your actual OpenWeatherMap API key

document.getElementById("searchBtn").addEventListener("click", getWeather);

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Please enter a city name.");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      document.getElementById("cityName").textContent = data.name;
      document.getElementById("description").textContent = data.weather[0].description;
      document.getElementById("temp").textContent = data.main.temp;
      document.getElementById("humidity").textContent = data.main.humidity;
      document.getElementById("wind").textContent = (data.wind.speed * 3.6).toFixed(1);

      const iconImg = document.getElementById("weatherIcon");
      iconImg.src = iconUrl;
      iconImg.alt = data.weather[0].description;
      iconImg.classList.remove("hidden");

      document.getElementById("weatherResult").classList.remove("hidden");
    })
    .catch(err => {
      alert(err.message);
      document.getElementById("weatherResult").classList.add("hidden");
    });
}
