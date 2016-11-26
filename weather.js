var apiOpenWeatherUrl;


var apiKey= "9ff24aa89f0e5dfc05d21e0903fcd70b";


var baseOpenWeatherUrl = "http://api.openweathermap.org/data/2.5/weather";
/*
function showPosition(position) {
  var x = document.getElementById('location');
  lat=position.coords.latitude;
  longit=position.coords.longitude;
  console.log('lat is : ',lat);
  console.log('longitude is : ',longit);
    x.innerHTML = "Latitude: " + Math.round((position.coords.latitude)*100)/100 + 
    "<br>Longitude: " + Math.round((position.coords.longitude)*100)/100; 
    
apiOpenWeatherUrl = "'"+ baseOpenWeatherUrl + "?lat="
 + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=" + apiKey+"'";
 console.log('apiOpenWeatherUrl is : ', apiOpenWeatherUrl);

 */
 
//===============================
//to get latitude and longitude from https://www.geoip-db.com/json/

var georequest = new XMLHttpRequest();

georequest.onreadystatechange = function(){
  if(georequest.readyState === XMLHttpRequest.DONE){
      if(georequest.status === 200){
          var location = georequest.responseText;
          console.log('location is : ',location);
      }
  }  
};

georequest.open('GET','https://www.geoip-db.com/json/',true);
georequest.send(null);







//======================================

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(){
  if(xhr.readyState===XMLHttpRequest.DONE){
    if(xhr.status===200){
      var city=document.getElementById('city');
      var country = document.getElementById('country');
var weathers = document.getElementById('weather');
var temperature = document.getElementById('temperature');

      var weather = xhr.responseText;
      console.log('weather is :',weather);
      var weather1 = JSON.parse(weather);
      //country.innerHTML = weather1.sys.country;
      console.log('weather1 is : ',weather1);
     var temperatureInCelsius = Math.round(weather1.main.temp - 273.5);
     console.log('temperatureInCelsius is : ',temperatureInCelsius);
      var cityName = weather1.name;
      
      console.log('city is : ',weather1.name);
      console.log('weather is : ',weather1.weather[0].description);
      var weatherDescription = weather1.weather[0].description;
      console.log('temperature is : ',weather1.main.temp);
      

var position = new XMLHttpRequest();
 position.onreadystatechange = function(){
  if(position.readyState === XMLHttpRequest.DONE && position.status ===200){
    var currentPosition = position.responseText;
    console.log('currentPosition is :',currentPosition);
    var currentPosition1 = JSON.parse(currentPosition);
    console.log( 'currentPosition1 is : ', currentPosition1);
    console.log('address is : ',currentPosition1.results[0]['address_components'][4]['long_name']);
    var countryName = currentPosition1.results[0]['address_components'][6]['long_name'];

    country.innerHTML = countryName +" , " +cityName;
    weathers.innerHTML = " , " + weatherDescription;
    temperature.innerHTML = temperatureInCelsius +" Celsius";
  }
 };

 position.open('GET','http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+longit,'true');
 position.send(null);

      var fahrenheitButton = document.getElementById('fahrenheit');
      fahrenheitButton.onclick = function(){
          convertToFahrenheit(temperatureInCelsius);
         };

      var celsiusButton = document.getElementById('celsius');
      celsiusButton.onclick = function(){
        temperature.innerHTML =  temperatureInCelsius + " celsius";
      };
 
 
    }
  }
};




console.log("2nd time apiOpenWeatherUrl is : ", apiOpenWeatherUrl);
xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&APPID=9ff24aa89f0e5dfc05d21e0903fcd70b', true);
xhr.send(null);



 getLocation();

 
 
var tempInFahrenheit;

function convertToFahrenheit(celcius){
 tempInFahrenheit = Math.round(celcius*1.8 +32);
 temperature.innerHTML = tempInFahrenheit+ " Fahrenheit";
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


 

 
