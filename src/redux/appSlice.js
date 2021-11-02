import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { forecastService } from "../services/forecast-service";


export const appSlice = createSlice({
    name: 'app',
    initialState: {
        currentLocation: { Key: 215854, LocalizedName: 'Tel Aviv' },
        favoriteLocations: [
            { Key: 2723742, LocalizedName: 'Telégrafo' },
            { Key: 3453754, LocalizedName: 'Telaga Asih' },
        ],
        isDarkMode: false
    },
    reducers: {
        setCurrentLocation: (state, action) => {
            state.currentLocation = action.payload
        },
        addToFavorites: (state, action) => {
            state.favoriteLocations.push(action.payload)
        },
        removeFromFavorites: (state, action) => {
            state.favoriteLocations = state.favoriteLocations.filter(location => location.locationKey !== action.payload.locationKey)
        },
        toggleDarkMode: (state, action) => {
            state.isDarkMode = action.payload
        },
    },
})

export const { setCurrentLocation, addToFavorites, removeFromFavorites, toggleDarkMode } = appSlice.actions

export default appSlice.reducer