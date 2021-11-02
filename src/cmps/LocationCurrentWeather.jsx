import { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { WbSunnyOutlined, NightsStayOutlined } from '@material-ui/icons';

export const LocationCurrentWeather = ({ locationWeather }) => {
    const [isNight, setIsNight] = useState(false)
    const { locationName, date, weekday, currHour, weatherDescription, temperature, temperatureUnit } = locationWeather

    useEffect(async () => {
        selectDayNightIcon()
    }, [])

    const selectDayNightIcon = async () => {
        if (currHour < 6 || currHour > 18) setIsNight(true)
    }

    return (
        <Card >
            <CardContent >
                <Grid container spacing={4}>
                    <Grid container item xs={12} spacing={1}>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="div">
                                {locationName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {isNight ? <NightsStayOutlined color='secondary' /> : <WbSunnyOutlined color='secondary' />}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ mb: 1.5 }} color='textSecondary'>
                                {weekday}, {date}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5">
                                {temperature} &deg;{temperatureUnit}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} >
                            <Typography variant='subtitle1' color='textSecondary'>
                                {weatherDescription}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}