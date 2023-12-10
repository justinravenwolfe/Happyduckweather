//Should not be editable/protects it
const key="54618fe1a12009457244e8835544de58";
var images = ["https://www.freeiconspng.com/thumbs/sun-icon/sun-icon-4.jpg","https://www.freepnglogos.com/uploads/cloud-clipart/clipart-clouds-picture-images-0.png","https://banner2.cleanpng.com/20180322/brq/kisspng-rain-cloud-storm-weather-clip-art-rain-5ab47b2dee2374.9241528315217774539754.jpg"]; 
var type  = ["sun", "cloud", "rain"]; 

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
        var weather_cards= document.getElementById('weather_cards');
        var weather_list = data.list; 
        //Start at position 1 <- i = 0
        //Go all the way to the end of the list -> .length
        //Move in steps of 8 
        //3 hours * 8 = 24 hours
        for(var i = 0; i< weather_list.length; i+=8){
        var curr_day = weather_list[i];
        //.dt_txt <- holds the date
        //MM/DD/YYYY
        var date = Date(curr_day.dt_txt);
        /*
        A hierarchal structure of key value pairs
        Weather_Json {
          'main'{
            'tmp'{
              90 degrees
            }
          }
        }
        */
        var temp = curr_day.main.temp;
        var weather = curr_day.weather[0].main; 
        //Outer counter for the card
        var card_container = document.createElement('div');
        card_container.classList.add('weather_card');
        //Restrict the width
        card_container.classList.add('col-2'); 
        //H2 for the date
        var calendar = document.createElement('h4');
        calendar.id = "curr_date";
        calendar.textContent = date; 
        calendar.style.textDecoration = 'underline'; 
        //H3 for the Temperature
        var degrees= document.createElement('h5');
        degrees.id = "curr_temp";
        degrees.textContent = temp + "°C"; 
        //paragraph for the weather description 
        var desc = document.createElement('h4'); 
        desc.id = "weather_desc";
        desc.textContent = weather; 
        var weather_img = document.createElement('img');
        var desc_opt = weather;
        if(desc_opt== "Clear"){
          weather_img.url = images[0];
        } else if(desc_opt == "Cloudy"){
          weather_img.url = images[1];
        }else{
          weather_img.url = images[2];
        }
        //Append these element onto the main div
        card_container.appendChild(calendar);
        card_container.appendChild(degrees);
        card_container.appendChild(desc); 
        card_container.append(weather_img); 
        //Actually puts it on the webpage
        weather_cards.appendChild(card_container); 
      }
      })
      .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      });
  }
//Defining a new function<- can call it whatever you want
//Every 8 elements is a new day
