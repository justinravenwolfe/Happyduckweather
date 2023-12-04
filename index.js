//Should not be editable/protects it
const key="54618fe1a12009457244e8835544de58";

// Your OpenWeather API Key
const apiKey = 'YOUR_API_KEY';

// The city you want the forecast for
const city = 'London';

// The URL to the 5 day / 3 hour forecast API
const url = https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey};

// Function to get weather data
function getWeatherForecast() {
fetch(url)
    .then(response => {
      if (!response.ok) {
       throw new Error(HTTP error! status: ${response.status});
      }
      return response.json();
    })
    .then(data => {
      // This is where you get access to the forecast data
    console.log(data);
      // Do something with the forecast data
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
}

// Call the function to get the weather forecast
getWeatherForecast();