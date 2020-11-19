const API_URL = `https://www.prevision-meteo.ch/services/json/`
const inputElt = document.querySelector("#formInput")
const weatherNowListElt = document.querySelector("#weatherNowList")
const formElt = document.querySelector("#form")
const titleElt = document.querySelector("#title")

function addLiToList(list, liTextContent) {
  let newLiElt = document.createElement("li")
  newLiElt.textContent = liTextContent

  list.appendChild(newLiElt)
}

function deleteAllLiInList(list) {
  let liArray = list.querySelectorAll("li")
  console.log(liArray)
  liArray.forEach(function(li) {
    li.style.display = "none"
  })
}

// Permet de rechercher puis renvoyer les informations météo en fonction d'une ville donné en paramètre
async function getWeatherDataFromCity(city) {
  
  try { // try = on essaie le code entre {}
    const dataToParse = await fetch( API_URL + city, {method: 'GET',}) // 
    return await dataToParse.json()
  } catch (error) { // si le code précédent (le try) renvoie une erreur, alors catch prend le relairs avec l'erreur en argument
    console.log(error)
  }
}

async function displayWeather(event) {
  event.preventDefault()

  // Execute la fonction getWeatherDataFromCity de façon synchrone
  // Cette fonction retourne les données météo d'une ville donné en paramètre
  // (await = asynchrone = on attend la réponse avant de continuer le programme)
  const weatherData = await getWeatherDataFromCity(inputElt.value)
  
  // Mettre à jour le titre de la page
  const cityName = weatherData.city_info.name
  titleElt.textContent = "Météo pour " + cityName

  // Supprimer les éléments actuels de la liste 
  deleteAllLiInList(weatherNowListElt)

  // Ajouter des informations pour la météo actuelle
  const currentHumidity =    weatherData.current_condition.humidity
  const currentTemperature = weatherData.current_condition.tmp
  const currentCondition =   weatherData.current_condition.condition
  addLiToList(weatherNowListElt, "Humidité : "    + currentHumidity +    "%" )
  addLiToList(weatherNowListElt, "Condition : "   + currentCondition         )
  addLiToList(weatherNowListElt, "Température : " + currentTemperature + "°C")
}

// Lorsque l'événement submit sera déclencher par formElt, la fonction displayWeather s'executera
formElt.addEventListener("submit", displayWeather)