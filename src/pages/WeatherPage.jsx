import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { Checkbox, Container, Grid, Paper } from "@material-ui/core"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import FavoriteIcon from "@material-ui/icons/Favorite"

import { forecastService } from "../services/forecast-service"
import { getCurrentWeather } from "../redux/weatherSlice"
import { getForecast } from "../redux/forecastSlice"

import { setCurrentLocation, addToFavorites, removeFromFavorites } from "../redux/appSlice"

import { SearchForm } from "../cmps/SearchForm"
import { LocationCurrentWeather } from "../cmps/LocationCurrentWeather"
import { LocationForecast } from "../cmps/LocationForecast"


export const WeatherPage = () => {

    const [searchOptions, setSearchOptions] = useState([])
    const { currentLocation } = useSelector((state) => state.app)
    const { locationWeather } = useSelector((state) => state.weather)
    const { locationForecast } = useSelector((state) => state.forecast)
    const dispatch = useDispatch()

    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        dispatch(getCurrentWeather(currentLocation))
        dispatch(getForecast(currentLocation.Key))
    }, [])

    const handleSearchChange = async (searchTxt) => {
        const result = await forecastService.getLocationOptions(searchTxt)
        setSearchOptions(result)
    }

    const onSubmit = async (searchTxt) => {
        try {
            const selectedLocation = searchOptions.find(option => option.LocalizedName === searchTxt)
            const { Key, LocalizedName } = selectedLocation
            dispatch(setCurrentLocation({ Key, LocalizedName }))
            dispatch(getCurrentWeather({ Key, LocalizedName }))
            dispatch(getForecast({ Key }))
            setSearchOptions([])
        } catch (err) {
            console.log('error:', err);
        }
    }

    const toggleIsFavorite = (ev) => {
        setIsFavorite(ev.target.checked)
        if (ev.target.checked) dispatch(addToFavorites(currentLocation))
        else dispatch(removeFromFavorites(currentLocation))
    }

    return (
        <Paper >
            <SearchForm submitSearch={onSubmit} handleSearchChange={handleSearchChange} searchOptions={searchOptions} />
            <Grid container>
                <Grid item xs={10}>
                    {locationWeather && <LocationCurrentWeather locationWeather={locationWeather} />}
                </Grid>
                <Grid item xs={2}>
                    <Checkbox
                        checked={isFavorite}
                        onChange={toggleIsFavorite}
                        color="primary"
                        icon={<FavoriteBorderIcon />}
                        checkedIcon={<FavoriteIcon />}
                    />
                </Grid>
                <Grid item item xs={12}>
                    {locationForecast && <LocationForecast locationForecast={locationForecast} />}

                </Grid>
            </Grid>
        </Paper>
    )
}