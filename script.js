const landingPage = document.querySelector(".landing");
const fetchBtn = document.querySelector(".fetch-btn");
const mainPage = document.querySelector(".main-page");
const mapArea = document.querySelector(".map");
let latDiv = document.querySelector(".latitude");
let longDiv = document.querySelector(".longitude");

let loca = document.getElementById("location");
let latP = document.getElementById("lat");
let longP = document.getElementById("long");
let timeZone = document.getElementById("timeZone");
let windSpeed = document.getElementById("windSpeed");
let pressure = document.getElementById("pressure");
let humidity = document.getElementById("humidity");
let windDirection = document.getElementById("windDirection");
let uvIndex = document.getElementById("uvIndex");
let feelsLike = document.getElementById("feelsLike");
let API_KEY = "4ccb210f9d552f1bc1ab5385300801e2";
let api = "https://api.openweathermap.org/data/3.0/onecall";
//bank reject payment cannot get valid api_key
let MAP_API_KEY = "AIzaSyA7vE-bIu72vtt-I2sSQ2Xsl1fOou0nR7Y";

fetchBtn.addEventListener("click",()=>{
    landingPage.style.display = "none";
    mainPage.style.display = "block";

    function showPosition(position){
        //accessing lat and long
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        //displaying
        latDiv.innerText =`Latitude: ${latitude}`;
        longDiv.innerText = `Longitude: ${longitude}`;

        //map display
        const mapUrl = `https://www.google.com/maps/embed/v1/view?key=${MAP_API_KEY}&center=${latitude},${longitude}&zoom=15`;
        console.log(mapUrl);

        const map = document.createElement('iframe');
        map.setAttribute('src', mapUrl);
        map.setAttribute('width', '500');
        map.setAttribute('height', '320');
        map.classList.add("mapFrame");
        mapArea.appendChild(map);
  
        //fetching data
        let urlAPi =  api +"?lat=" +latitude +"&lon=" +longitude +"&appid=" +API_KEY +"&units=imperial";
        fetch(urlAPi)
        .then(response =>response.json())
        .then (data =>{
            //weather data
            latP.innerText = latP.innerText+" "+data.lat;
            longP.innerText = longP.innerText+" "+data.lon;
            timeZone.innerText = timeZone.innerText+" "+data.timezone;
            windSpeed.innerText = windSpeed.innerText+" "+data.current.wind_speed;
            pressure.innerText = pressure.innerText+" "+data.current.pressure;
            humidity.innerText = humidity.innerText+" "+data.current.humidity;
            windDirection.innerText = windDirection.innerText+" "+data.current.wind_deg;
            uvIndex.innerText = uvIndex.innerText+" "+data.current.uvi;
            feelsLike.innerText = feelsLike.innerText+" "+data.current.feels_like;
            console.log(data);
        })
        .catch(error => console.error(error));
    }

    function errorCallBack(error){
        console.log(error);
    }

    navigator.geolocation.getCurrentPosition(showPosition, errorCallBack);
})