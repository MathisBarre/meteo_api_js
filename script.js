console.log("Le javascript marche !")

var formElt = document.querySelector("#form")
var inputElt = document.querySelector("#input")
var titleElt = document.querySelector("#title")
var listElt = document.querySelector("#list")

function addElementInList(text) {
  var newLiElt = document.createElement("li")
  newLiElt.textContent = text
  listElt.appendChild(newLiElt)
}

function getWeatherDataByCity(city) {
  var apiUrl = "https://www.prevision-meteo.ch/services/json/"
  
  return fetch(apiUrl + city, {method: "GET"})
    .then((data) => {
      return data.json()
    }).then((json) => {
      return json
    })
}

async function displayWeather(event) {
  event.preventDefault()
  
  // 1 récupérer le nom de la ville à aller chercher
  var cityName = inputElt.value
  console.log(cityName)

  // 2 récupérer les informations météo de cette ville
  var weatherData = await getWeatherDataByCity(cityName)
  console.log(weatherData)

  // 3 afficher les informations dans notre site internet
  var condition = weatherData.current_condition.condition
  var humidity = weatherData.current_condition.humidity
  var tmp = weatherData.current_condition.tmp

  // 3.1 Changement du texte du titre
  titleElt.textContent = "La météo du jour à " + cityName

  // 3.2 Clear list element
  listElt.innerHTML = ""

  // 3.3 Ajout d'un élément dans la liste
  addElementInList("Condition : " + condition)
  addElementInList("Humidité : " + humidity + "%")
  addElementInList("Température : " + tmp + "°C")
}

formElt.addEventListener("submit", displayWeather)