//Should not be editable/protects it
const key="54618fe1a12009457244e8835544de58";

// Your OpenWeather API Key

// The city you want the forecast for
var city_in = document.getElementById("search");
var city = city_in.value; 

// The URL to the 5 day / 3 hour forecast API


// Function to get weather data
function getWeatherForecast() {
//Creates the specific link
const url = 'https://api.openweathermap.org/data/2.5/forecast?q=' +city+'&units=metric&appid='+key;
//Fetch call to grab the data
fetch(url)
.then(response => {
  if (response.ok) {
     return response.json();
  } else {
     throw new Error('Network response was not ok.');
  }
  })
  .then(data => {
    console.log(data); // Log the data object
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
}

