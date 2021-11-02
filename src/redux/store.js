import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice'
import forecastReducer from './forecastSlice'
import appSlice from './appSlice';

const store = configureStore({
    reducer: {
        weather: weatherReducer,
        forecast: forecastReducer,
        app: appSlice,
    },
})

export default store;