import { DayForecastItem } from "./DayForecastItem";

export const LocationForecast = ({ locationForecast }) => {
    const { DailyForecasts } = locationForecast

    return (
        <div>
            {DailyForecasts.map(dayForcast =>
                <DayForecastItem dayForcast={dayForcast} key={dayForcast.Date} />
            )}
        </div>
    )
}