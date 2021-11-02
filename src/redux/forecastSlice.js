import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { forecastService } from "../services/forecast-service";

export const getForecast = createAsyncThunk(
    "forecast/getForecast",
    async (payload) => {
        const forecast = await forecastService.getFiveDayForcast(payload)
        return forecast
    }
)

const forecastSlice = createSlice({
    name: 'forecast',
    initialState: {
        locationForecast: null,
        isLoading: false,
        isError: false,
    },
    reducers: {},
    extraReducers: {
        [getForecast.pending]: (state) => {
            state.status = "Loading"
            state.isLoading = true
            state.isError = false
        },
        [getForecast.fulfilled]: (state, action) => {
            state.status = "success"
            state.isLoading = false
            state.locationForecast = action.payload
        },
        [getForecast.rejected]: (state) => {
            state.status = "faild to retrieve data"
            state.isLoading = false
            state.isError = true
        },
    },
})

export default forecastSlice.reducer
