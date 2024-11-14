document.getElementById("location-form").addEventListener("submit", getWeather);

async function getWeather(e) {
  e.preventDefault();
  const city = document.getElementById("location-input").value;
  try {
    const weatherData = await fetchWeather(city);
    const fetchedCity = weatherData.name.toLowerCase();
    if (fetchedCity !== city.toLowerCase()) {
      throw new Error("City not found");
    }
    document.getElementById("weather-data").innerHTML = `
      <h2>${weatherData.name}</h2>
      <p>${weatherData.weather[0].description}</p>
      <p>Temperature: ${weatherData.main.temp}°C</p>
    `;
    document.getElementById("location-input").value=""
  } catch (error) {
    document.getElementById(
      "weather-data"
    ).innerText = "Error: City not found";
  }
}

async function fetchWeather(city) {
  const result = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&ap
pid=7b46115c3884923d1b4fa42835f228fd&units=metric`
  );
  if (!result.ok) {
    throw new Error("City not found");
  }
  return await result.json();
}
