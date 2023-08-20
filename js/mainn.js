// // Today variables 

let searchInput = document.getElementById("search")
let todayName = document.getElementById("today_date_day_name")
let todayNumber = document.getElementById("today_date_day_number")
let todayMonth = document.getElementById("today_date_month")
let todayLocation = document.getElementById("today_location")
let todayTemp = document.getElementById("today_temp")
let todayImg = document.getElementById("today_condition_img")
let todayText = document.getElementById("today_condition_text")
let todayhumidity = document.getElementById("humidity")
let todayWind = document.getElementById("wind")
let todayWindDirection = document.getElementById("wind_direction")

let nextDay = document.getElementsByClassName("next_day_name")
let nextImg = document.getElementsByClassName("next_condition_img")
let nextMaxTemp = document.getElementsByClassName("next_max_temp")
let nextMinTemp = document.getElementsByClassName("next_min_temp")
let nextConditionText = document.getElementsByClassName("next_condition_text")



async function getDate(cityName){
    let weatherResponse = await  fetch(`https://api.weatherapi.com/v1/forecast.json?key=3683362d6da941b1b5f160059231108&q=${cityName}&days=3`)
    console.log(weatherResponse)
    let weatherData = await weatherResponse.json()
    return weatherData
  }  
  
  // display today data
  function displayTodayData(data){
  
      let todayDate = new Date()
      todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"})
      todayNumber.innerHTML = todayDate.getDate()
      todayMonth.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"})
  
      todayLocation.innerHTML=data.location.name
      todayTemp.innerHTML =data.current.temp_c
      todayImg.setAttribute("src",data.current.condition.icon)
      todayText.innerHTML = data.current.condition.text
      todayhumidity.innerHTML = data.current.humidity +"%"
      todayWind.innerHTML = data.current.wind_kph +"km/h"
      todayWindDirection.innerHTML = data.current.wind_dir
  
  
  }



  // display NextDay Data
function displayNaxtData(data){
    for(let i=0; i<2; i++){
        let nextDate =new Date(data.forecast.forecastday[i+1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
        nextMaxTemp[i].innerHTML = data.forecast.forecastday[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = data.forecast.forecastday[i+1].day.mintemp_c
        nextConditionText[i].innerHTML = data.forecast.forecastday[i+1].day.condition.text
        nextImg[i].setAttribute("src",data.forecast.forecastday[i+1].day.condition.icon)
    }

}

async function startApp(city='paris'){
    let weatherData = await getDate(city)
    displayTodayData(weatherData)
    displayNaxtData(weatherData)
}
startApp()


searchInput.addEventListener("input",function(){
    startApp(searchInput.value)
})