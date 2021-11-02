import { Container, Typography } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FavoritesList } from "../cmps/FavoritesList"
import { forecastService } from "../services/forecast-service"

export const FavoritesPage = () => {
    const { favoriteLocations } = useSelector(state => state.app)
    const [favoritesToDisplay, setFavoritesToDisplay] = useState([])

    useEffect(() => {
        loadFavoritesWeather(favoriteLocations)
    }, [])

    const loadFavoritesWeather = async (favoriteLocations) => {
        const favoritesWeather = await forecastService.getFavoritesWeather(favoriteLocations)
        setFavoritesToDisplay(favoritesWeather)
    }
    
    return (
        <Container xs={12}>
            <Typography variant='h5' >Favorites</Typography>
            <FavoritesList favoritesToDisplay={favoritesToDisplay} />
        </Container>
    )
}