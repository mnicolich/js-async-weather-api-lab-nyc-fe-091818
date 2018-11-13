const API_KEY = "fbc9e5f72fbd95da0b0d8161cc39dee0" 

function handleFormSubmit(event) {
 //handle submit event
 const input = document.querySelector('#city')
 const city = input.value
 fetchCurrentWeather(city)
 fetchFiveDayForecast(city)
}

function fetchCurrentWeather(city) {
 //fetch current weather based on city
 //q is a query parameter
 fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + API_KEY + '&units=imperial')
 .then((response) => response.json())
 .then((responseJson) => displayCurrentWeather(responseJson)
)}

function displayCurrentWeather(json) {
 //render current weather data to the DOM using provided IDs and json from API
 const temperatureCell = document.querySelector('#temp')
 temperatureCell.innerText = json.main.temp + '°F'
 const low = document.querySelector('#low')
 const high = document.querySelector('#high')
 low.innerText = json.main.temp_min + '°F'
 high.innerText = json.main.temp_max + '°F'
 const humidity = document.querySelector('#humidity')
 const cloudCover = document.querySelector('#cloudCover')
 humidity.innerText = json.main.humidity + '%'
 cloudCover.innerText = json.clouds.all + '%'
}


function fetchFiveDayForecast(city) {
 //fetch five day forecast data based on city
 fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=' + API_KEY + '&units=imperial')
 .then((response) => response.json())
 .then((responseJson) => displayFiveDayForecast(responseJson))
  displayFiveDayForecast(responseJson)
  createChart(responseJson)
}

function displayFiveDayForecast(json) {
 //render five day forecast data to the DOM using provided IDs and json from API
 for (let i = 0; i < 39; i++) {
     console.log(json)
     const firstForecast = json.list[i]
     const div = document.createElement('div')
     div.innerHTML = '<p>' + firstForecast.dt_txt + '</p>' +
                     '<p>' + firstForecast.main.temp_min + '</p>' +
                     '<p>' + firstForecast.main.temp_max + '</p>'

     const aside = document.querySelector('aside')
     aside.appendChild(div)
 }

   console.log(firstForecast)

}

function getDateText(forecast) {
  return forecast.dt_txt
}

function createChart(json) {
 //Bonus: render temperature chart using five day forecast data and ChartJS
const ctx = document.getElementById("WeatherChart").getContext('2d');

const forecasts = json.list
const chartLabels = forecasts.map(getDateText)
console.log(jsonList)
console.log(chartLabels)

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: chartLabels,
        datasets: [{
            label: '# of votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}

document.addEventListener('DOMContentLoaded', function() {
 //add event listener here for form submission
 document.addEventListener('submit', function(event) {
   event.preventDefault()
   handleFormSubmit(event)
 })
 })