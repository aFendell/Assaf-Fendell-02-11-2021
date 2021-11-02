import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';

import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { Grid } from '@material-ui/core';

dayjs.extend(advancedFormat)

export const DayForecastItem = ({ dayForcast }) => {


    const { Date, Temperature } = dayForcast
    const weekday = dayjs(Date).format('dddd')

    return (
        <Card variant="outlined" >
            <CardContent >
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography >
                            {weekday}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <WbSunnyOutlinedIcon />
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>
                            {Temperature.Minimum.Value} - {Temperature.Maximum.Value} &deg;{Temperature.Minimum.Unit}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}