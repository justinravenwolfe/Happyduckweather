//Should not be editable/protects it
const key="54618fe1a12009457244e8835544de58";

// Your OpenWeather API Key

// The city you want the forecast for
//Container for all the buttons

// The URL to the 5 day / 3 hour forecast API


function getWeatherForecast() {
  var city = document.getElementById("city").value;
  const url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + encodeURIComponent(city) + '&units=metric&appid=' + key;
  
  fetch(url)
      .then(response => {
        if (response.ok) {
         return response.json();
        } else {
         throw new Error('Network response was not ok: ' + response.statusText);
        }
      })
      .then(data => {
        console.log(data); // Log the data object
        //Stores the city's name
        var city_name = data.city.name; 
        var new_btn = document.createElement('button'); 
        //The button will have the name of the city they searched for
        new_btn.textContent = city_name; 
        new_btn.classList.add("btn");
        new_btn.classList.add("btn-primary"); 
        new_btn.classList.add("col-2"); 
        document.getElementById("city_opts").appendChild(new_btn);
      })
      .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      });
  }

