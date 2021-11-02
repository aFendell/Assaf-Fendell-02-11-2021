import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { forecastService } from "../services/forecast-service";

export const getCurrentWeather = createAsyncThunk(
    "weather/getCurrentWeather",
    async (payload) => {
        const { Key, LocalizedName } = payload
        try {
            const currentWeather = await forecastService.getCurrentConditions(Key, LocalizedName)
            return currentWeather
        } catch (err) {
            console.log(err);
        }

    }
)

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        locationWeather: null,
        isLoading: false,
        isError: false,
    },
    reducers: {},
    extraReducers: {
        [getCurrentWeather.pending]: (state) => {
            state.status = "loading"
            state.isLoading = true
            state.isError = false
        },
        [getCurrentWeather.fulfilled]: (state, action) => {
            state.status = "success"
            state.isLoading = false
            state.locationWeather = action.payload
        },
        [getCurrentWeather.rejected]: (state) => {
            state.status = "failed"
            state.isLoading = false
            state.isError = true
        },

    },
})

export default weatherSlice.reducer
