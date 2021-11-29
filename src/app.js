function formatDate(date) {
  let today = date.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${today} ${month} ${year}, ${hours}:${minutes} hrs`;
}

let currentDate = document.querySelector("li .currentDate");
let currentTime = new Date();
currentDate.innerHTML = formatDate(currentTime);

function formatTimestamp(timestamp) {
  let date = new Date(timestamp * 1000);

  let forecastDate = date.getDate();
  let day = date.getDay();
  let daysForecast = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let monthsForecast = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  let month = monthsForecast[date.getMonth()];
  let weekDay = daysForecast[day];

  let dayNumber = forecastDate;
  if (forecastDate < 10) {
    dayNumber = `0${forecastDate}`;
  }

  return [dayNumber, weekDay, month];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  fiveDayForecast = formatTimestamp();

  forecast.forEach((fiveDayForecast, index) => {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
     <div class="col">
      <div class="weatherForecastWeekday" id="weather-forecast-weekday">${
        formatTimestamp(fiveDayForecast.dt)[1]
      }</div>
      <div class="weatherForecastDate" id="weather-forecast-date">${
        formatTimestamp(fiveDayForecast.dt)[0]
      }/${formatTimestamp(fiveDayForecast.dt)[2]}</div>
      <hr class="line" />
      <img
        src="http://openweathermap.org/img/wn/${
          fiveDayForecast.weather[0].icon
        }@2x.png"
        alt=""
        width="80px"
        class="forecastIcon"
      />
      <div class="weatherForecastTemperatures">
        <span class="weatherForecastTempMax">${Math.round(
          fiveDayForecast.temp.max
        )}°C </span>
        <span class="weatherForecastTempMin">| ${Math.round(
          fiveDayForecast.temp.min
        )}°C</span>
        <br />
        <br /> 
      </div>
    </div>
   `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let unit = `metric`;
  let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function showAllCityData(response) {
  celsiusTemperature = response.data.main.temp;

  let cityElement = document.querySelector("ul #city");
  cityElement.innerHTML = response.data.name;

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let lowestTempElement = document.querySelector("#lowest");
  lowestTempElement.innerHTML = Math.round(response.data.main.temp_min);

  let highestTempElement = document.querySelector("#highest");
  highestTempElement.innerHTML = Math.round(response.data.main.temp_max);

  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchCity(city) {
  let unit = `metric`;
  let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showAllCityData);
}

function executeCitySubmission(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function getLocation(position) {
  let unit = `metric`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3fdc8cfbf2d6fa0116c9ae92d3df4f79";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showAllCityData);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayAPoem() {
  let myArray = new Array(
    "'How many scenes, o sun, hast thou not shone upon? How many tears, o light, have dropped before thy sight? How many heart-felt sighs, how many piercing cries, how many deeds of woe, dost thy bright light not know!' - 'Ode to the Sun' by Eloise Bibb",
    "'The line-storm clouds fly tattered and swift, the road is forlorn all day, where a myriad snowy quartz stones lift, and the hoof-prints vanish away. The roadside flowers, too wet for the bee, expend their bloom in vain. Come over the hills and far with me, and be my love in the rain.' - 'A Line-storm Song' by Robert Frost",
    "'The wind begun to rock the grass, with threatening tunes and low, he flung a menace at the earth, a menace at the sky.' - from 'A Thunderstorm' by Emily Dickinson",
    "'I wandered lonely as a cloud that floats on high o'er vales and hills, when all at once I saw a crowd, a host, of golden daffodils. They stretched in never-ending line along the margin of a bay- ten thousand saw I at a glance, tossing their heads in sprightly dance.' - from 'I wandered lonely as a cloud' by William Wadsworth",
    "'Throughout the afternoon I watched them there, snow-fairies falling, falling from the sky, whirling fantastic in the misty air, contending fierce for space supremacy. And they flew down a mightier force at night, as though in heaven there was revolt and riot, and they, frail things had taken panic flight down to the calm earth seeking peace and quiet. I went to bed and rose at early dawn to see them huddled together in a heap, each merged into the other upon the lawn, worn out by the sharp struggle, fast asleep. The sun shone brightly on them half the day, by night they stealthily had stol’n away.' - from 'The Snow Fairy' by Claude McKay",
    "'I leant upon a coppice gate, when Frost was spectre-gray, and Winter’s dregs made desolate the weakening eye of day. The tangled bine-stems scored the sky like strings of broken lyres, and all mankind that haunted nigh had sought their household fires…' - from 'The Darkling Thrush' by Thomas Hardy",
    "'Cloud-walls of the morning's grey, faced with amber column, crowned with crimson cupola from a sunset solemn! May mists, for the casements, fetch pale and glimmering- with a sunbeam hid in each, and a smell of spring.' - from 'The House of Clouds' by Elizabeth Barrett Browning",
    "'Outside the garden the wet skies harden. The gates are barred on the summer side- 'Shut out the flower-time, sunbeam and shower-time, make way for our time', wild winds have cried. Green once and cheery, the woods, worn weary, sigh as the dreary weak sun goes home. A great wind grapples the wave, and dapples the dead green floor of the sea with foam.' - from 'Winter in Northumberland' by Algernon Charles Swinburne",
    "'This I saw on an April day- Warm rain spilt from a sun-lined cloud, a sky-flung wave of gold at evening, and a cock pheasant treading a dusty path, shy and proud.' - from 'In April' by James Hearst",
    "'Who has seen the wind? Neither I nor you. But when the leaves hang trembling, the wind is passing through. Who has seen the wind? Neither you nor I. But when the trees bow down their heads, the wind is passing by. - 'Who Has Seen the Wind?' by Christina Rossetti",
    "'O suns and skies and clouds of June, and flowers of June together, ye cannot rival for one hour October's bright blue weather- when loud the bumblebee makes haste, belated, thriftless vagrant and goldenrod is dying fast and lanes with grapes are fragrant.' - from 'October's Bright Blue Weather' by Helen Hunt Jackson",
    "'Once I dipt into the future far as human eye could see, and I saw the Chief Forecaster, dead as any one can be--, dead and damned and shut in Hades as a liar from his birth, with a record of unreason seldome paralleled on earth. While I looked he reared him solemnly, that incandescent youth, from the coals that he'd preferred to the advantages of truth. He cast his eyes about him and above him; then he wrote. On a slab of thin asbestos what I venture here to quote-- For I read it in the rose-light of the everlasting glow- Cloudy; variable winds, with local showers; cooler; snow.' - 'Weather' by Ambrose Bierce",
    "'Reader! what soul that laoves a verse can see. The spring return, nor glow like you and me? Hear the quick birds, and see the landscape fill, nor long to utter his melodious will? This more than ever leaps into the veins, when spring has been delay'd by winds and rains, and coming with a burst, comes like a show, blue all above, and basking green below, and all the people culling the sweet prime: Then issues forth the bee to cluth the Thyme.' 'Sudden Fine Weather' by James Henry Leigh Hunt",
    "'Rough winds do shake the darling buds of May, and summer’s lease hath all too short a date. Sometime too hot the eye of heaven shines, and often is his gold complexion dimmed; and every fair from fair sometime declines, by chance, or nature’s changing course, untrimmed- but thy eternal summer shall not fade, nor lose possession of that fair thou ow’st, nor shall death brag thou wand'rest in his shade, when in eternal lines to time thou grow'st.' - from 'Shall I compare thee to a summer's day?' by William Shakespeare"
  );

  let randomID = Math.floor(Math.random() * myArray.length);
  let arrayPoem = myArray[randomID];

  let poemArrayElement = document.querySelector("#array-poem");
  poemArrayElement.innerHTML = arrayPoem;
}

let searchInput = document.querySelector("#search-form");
searchInput.addEventListener("submit", executeCitySubmission);

let currentLocationElement = document.querySelector("#current-location");
currentLocationElement.addEventListener("click", getCurrentLocation);

let poemButton = document.querySelector("#array-poem");
poemButton.addEventListener("click", displayAPoem);

searchCity("Berlin");
