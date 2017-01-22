/*
To Do list:
get user location...done
        location through browser ... had to use ip based because Chrome removed non secure geolocation
           check for location permission.. see above
           if no punt to zip...4th down
        input of zip code....done
     send location to open weather api. (lat, lon)   --not doing..went with zip
       
get users weather   (open weather api)--done
pictures for weather types.....done using the icons from the open weather api
display temp....done
toggle Fahrenheir or Celsius ... done
switch statement for wind direction api reports wind direction in degrees blowing from.--done
360 === out of the north
90  === out of the east
180 === out of the south
270 === out of the west
*/
// all sorts of varibles
var weather = "";
var temp = "did not change";
var wind = "";
var lat = "";
var lon = "";
var zip = "";
var status = "";
var zipBox = document.getElementById("zipBox").value;
var windDirection = "";
var tempScale = "f";
var tempK = "";
var icon = ""; //image icon for weather type
var city = "";

// ip based location because google removed non secure geolocation calls
function ipGeo() {
  $.getJSON("http://ip-api.com/json/?callback=?", function(data) {
    zip = data.zip;
    status = data.status;
    // $("#success").html(region); //test if it is working
    $("#zip").html(zip);
    getWeather(zip);

  });
};

function getWeather(zip) {
  var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + ",us&appid=911eb4551548c2ce7c9261b89eadc067";

  $.getJSON(url).then(function(data) {

    weather = data.weather[0].main;
    city = data.name;
    tempK = data.main.temp;
    wind = Math.round(data.wind.speed * 2.236936); // returned in kpm convert to mph
    windDirection = data.wind.deg;
    icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
    updateScale();
    $("#wind").html("Windspeed is " + wind + " mph");
    $("#weather").html("You have " + weather + " skies");
    $("#windDirection").html("from the " + windBlown(windDirection))
      // alert(weather); test
    $("#code").html("<img  src ='" + icon + "' >");
    $("#city").html(city);

  });
};

function submitZip(zipBox) {
  zip = document.getElementById("zipBox").value; //get zip from user input
  $("#zip").html(zip);
  getWeather(zip);
};

document.getElementById("subZip").onclick = function() {
  submitZip(zipBox);
};

document.getElementById("getWeather").onclick = function() {
  ipGeo();
};
document.getElementById("tempBtn").onclick = function() {
  changeScale(); // btn to change from celcius to farenheit
};

function windBlown(wd) {
  if (wd - 22 < 45 && wd + 22 > 45) {
    return "Northeast";
  } else if (wd - 22 < 45 && wd + 22 > 45) {
    return "East";
  } else if (wd - 22 < 90 && wd + 22 > 90) {
    return "Southeast";
  } else if (wd - 22 < 135 && wd + 22 > 135) {
    return "South";
  } else if (wd - 22 < 180 && wd + 22 > 180) {
    return "Southwest";
  } else if (wd - 22 < 225 && wd + 22 > 225) {
    return "West";
  } else if (wd - 22 < 270 && wd + 22 > 270) {
    return "NorthWest";
  } else {
    return "North";
  }

};

function cOrF(k) {
  if (tempScale === "f") {
    temp = (Math.round((tempK - 273.15) * 1.8) + 32) + " F";
  } else {
    temp = Math.round(tempK - 273.15) + " C";
  }
  return temp;
}; // takes the API kelvin output and converts to c or f based on scale selected by user...defaults to f.

function changeScale() {
  if (tempScale === "f") {
    tempScale = "c";
  } else {
    tempScale = "f";
  }
  updateScale();
}; // changes scale when called

function updateScale() {
  var tempWord = "";
  if (tempScale === "f") {
    tempWord = "Celsius";
  } else {
    tempWord = "Fahrenheit";
  }
  $("#tempBtn").attr('value', cOrF(tempScale));
  $("#temp").html("Click above to change the scale to " + tempWord);
}; // when page loads or scale is changed by user this updates the scale

//test