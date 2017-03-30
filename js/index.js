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
var tempF = "";
var tempC = "";
var icon = ""; //image icon for weather type
var city = "";

          // ip based location because google removed non secure geolocation calls
          function ipGeo() {
            $.getJSON("https://freegeoip.net/json/?callback=?", function(data) {
              zip = data.zip_code;
              status = data.status;
              // $("#success").html(region); //test if it is working
              $("#zip").html(zip);
              getWeather(zip);

            });
          };


// add geolocation 


function getWeather(zip) {
    var url = "https://api.apixu.com/v1/current.json?key=c5323737d83c48e692023922170903&q=" + zip;


  $.getJSON(url).then(function(data) {

    weather = data.current.condition.text;
    city = data.location.name;
    tempF = data.current.temp_f;
    tempC = data.current.temp_c;
    wind = data.current.wind_mph;
    windDirection = data.current.wind_degree;
    icon = data.current.condition.icon ;
    updateScale();
    $("#wind").html("Windspeed is " + wind + " mph");
    $("#weather").html("You have " + weather + " skies");
    $("#windDirection").html("from the " + windBlown(windDirection))
      // alert(weather); test
    $("#code").html("<img src ='" + icon + "' >");
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
    temp = tempF + "F";
  } else {
    temp = tempC + "C";
  }
  return temp;
}; 

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