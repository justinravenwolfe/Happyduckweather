//Should not be editable/protects it
const key="54618fe1a12009457244e8835544de58";
var images = ["Images/sunny.png", "Images/clouds.png", "Images/rain.png"]; 
var type  = ["sun", "cloud", "rain"]; 

// Your OpenWeather API Key

// The city you want the forecast for
//Container for all the buttons

// The URL to the 5 day / 3 hour forecast API
function removeAllChildren(element) {
  while (element.firstChild) {
      element.removeChild(element.firstChild);
  }
}

function getForecastButton(button) {
  var city = button.innerText; 
  console.log(city);
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
        //Keyword this is just going to hold the specific word that on the button
        //The button will have the name of the city they searched for
        var weather_list = data.list; 
        //Start at position 1 <- i = 0
        //Go all the way to the end of the list -> .length
        //Move in steps of 8 
        //3 hours * 8 = 24 hours
        var weather_cards = document.getElementById("weather_cards");
        weather_cards.innerHTML = ""; 
        for(var i = 0; i< weather_list.length; i+=8){
        //Grab all weather cards from HTML

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
       
        //every time they search a city it will empty out <- stop the rows of cards 
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
        weather_img.id = 'weather_img'; 
        var desc_opt = weather.trim();
        if(desc_opt== "Clear"){
          weather_img.src = images[0];
        } else if(desc_opt == "Clouds"){
          weather_img.src = images[1];
        }else if(desc_opt == "Rain"){
          weather_img.src = images[2];
        }
        //Append these element onto the main div
        card_container.appendChild(calendar);
        card_container.appendChild(degrees);
        card_container.appendChild(desc); 
        card_container.appendChild(weather_img);
        card_container.classList.add('card'); 
        //Adding it to the HTMl after the div is loaded with all the info
        weather_cards.append(card_container);  
      }
      })
      .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      });
  }

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
        new_btn.setAttribute('onclick', 'getForecastButton(this)');   
        document.getElementById("city_opts").appendChild(new_btn);
        var weather_list = data.list; 
        //Start at position 1 <- i = 0
        //Go all the way to the end of the list -> .length
        //Move in steps of 8 
        //3 hours * 8 = 24 hours
        var weather_cards = document.getElementById("weather_cards");
        weather_cards.innerHTML = ""; 
        for(var i = 0; i< weather_list.length; i+=8){
        //Grab all weather cards from HTML

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
       
        //every time they search a city it will empty out <- stop the rows of cards 
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
        weather_img.id = 'weather_img'; 
        var desc_opt = weather.trim();
        if(desc_opt== "Clear"){
          weather_img.src = images[0];
        } else if(desc_opt == "Clouds"){
          weather_img.src = images[1];
        }else if(desc_opt == "Rain"){
          weather_img.src = images[2];
        }
        //Append these element onto the main div
        card_container.appendChild(calendar);
        card_container.appendChild(degrees);
        card_container.appendChild(desc); 
        card_container.appendChild(weather_img);
        card_container.classList.add('card'); 
        //Adding it to the HTMl after the div is loaded with all the info
        weather_cards.append(card_container);  
      }
      })
      .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      });
  }
//Defining a new function<- can call it whatever you want
//Every 8 elements is a new day
