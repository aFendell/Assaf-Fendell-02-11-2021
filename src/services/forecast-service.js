import axios from "axios"

import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat)

const gLocationOptions = require('../data/autocomplete.json')
const gCurrentWeather = require('../data/locationsCurrentShort.json')
const gFiveDayForcast = require('../data/fiveDayForecast.json')

const BASE_URL = 'https://dataservice.accuweather.com'
const CROSS_DOMAIN = 'https://the-ultimate-api-challenge.herokuapp.com'
const REQUEST_URL = `${CROSS_DOMAIN}/${BASE_URL}`

const AUTOCOMPLETE_URL = 'locations/v1/cities/autocomplete'
const CURRENT_URL = 'currentconditions/v1'
const FORECAST_URL = 'forecasts/v1/daily/5day'
const API_KEY = 'CJehw8S6Kb9V8rZYjqOOhnZe223WU0Gj'

export const forecastService = {
    getLocationOptions,
    getCurrentConditions,
    getFiveDayForcast,
    getFavoritesWeather,
}


async function getLocationOptions(searchText) {

    //////////// Test data/////////////////
    // const data = gLocationOptions
    ////////////////////////////////////////////////////////////////////////////

    const { data } = await axios.get(`${REQUEST_URL}/${AUTOCOMPLETE_URL}`, { params: { apikey: API_KEY, q: searchText } })
    if (!data || data.length === 0) {
        console.log('Could not find the location you requested.');
        return
    }

    return data
}


async function getCurrentConditions(locationKey, locationName) {
    console.log(locationKey, locationName);
    //////////// Test data/////////////////
    // const data = await gCurrentWeather
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    const { data } = await axios.get(`${REQUEST_URL}/${CURRENT_URL}/${locationKey}`, { params: { apikey: API_KEY } })
    if (!data || data.length === 0) {
        console.log('Somthing went wrong.');
        return data
    }
    const currentConditions = _formatCurrentDayData(locationKey, locationName, data[0])
    return currentConditions
}

async function getFavoritesWeather(favoriteLocations) {
    const favoritesWeather = []
    if (!favoriteLocations || favoriteLocations.length === 0) return favoritesWeather
    await Promise.all(favoriteLocations.map(async (location) => {
        const { Key, LocalizedName } = location
        const locationWeather = await getCurrentConditions(Key, LocalizedName)
        favoritesWeather.push(locationWeather)
    }))
    return favoritesWeather
}


// 3. get location 5 days forecast
async function getFiveDayForcast(locationKey) {
    //////////// Test data/////////////////
    // const data = gFiveDayForcast
    /////////////////////////////////////////////////////

    const { data } = await axios.get(`${REQUEST_URL}/${FORECAST_URL}/${locationKey}`, { params: { apikey: API_KEY, metric: true } })
    if (!data || data.length === 0) {
        console.log('Somthing went wrong.');
        return
    }
    return data
}

function _formatCurrentDayData(locationKey, locationName, data) {
    return {
        locationKey: locationKey,
        locationName: locationName,
        date: dayjs(data.LocalObservationDateTime).format('MMMM Do'),
        weekday: dayjs(data.LocalObservationDateTime).format('dddd'),
        currHour: dayjs(data.LocalObservationDateTime).format('HH'),
        weatherDescription: data.WeatherText,
        weatherIcon: data.WeatherIcon,
        temperature: data.Temperature.Metric.Value,
        temperatureUnit: data.Temperature.Metric.Unit,
    }
}
