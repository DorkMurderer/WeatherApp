const apikey = "7f5971219a687f4dec11237254b0430e"
const weatherDataEl = document.getElementById("weather-data")
const cityInputEl = document.getElementById("city-input")
const formEl = document.querySelector("form") 



formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue)


   
})  


async function getWeatherData(cityValue) {
         
    try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)

          if(!response.ok){
            throw new Error("Network response failed")
          }

          const data = await response.json()

          const tempreture = Math.round (data.main.temp)

          const description = data.weather[0].description

          const icon = data.weather[0].icon
          const details = [
            `Feels like: ${data.main.feels_like}`,

            `Humidity: ${data.main.humidity}%`,

            `Wind speed: ${data.wind.speed}m/s`,
          ]

          weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`
          weatherDataEl.querySelector(".temperature").textContent = `${tempreture}°C`
          weatherDataEl.querySelector(".description").textContent = description

          weatherDataEl.querySelector(".details").innerHTML = details.map((detail) => `<div>${detail}</div>`).join("")
    } catch (error) {
      weatherDataEl.querySelector(".icon").innerHTML = ``
      weatherDataEl.querySelector(".temperature").textContent = ``
      weatherDataEl.querySelector(".description").innerHTML = `An error occurred. Cannot find that city! 
        <hr>
      ${error}`

      weatherDataEl.querySelector(".details").innerHTML = "" 
    }
}