import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Checkbox, Grid, IconButton } from "@material-ui/core"
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined"
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux"
import { setCurrentLocation, addToFavorites, removeFromFavorites } from "../redux/appSlice"
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    layout: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    flag: {
        alignSelf: 'center'
    },
    content: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
    }
});


export const FavoriteItem = ({ location }) => {

    const { locationKey, locationName, temperature, temperatureUnit } = location
    const classes = useStyles();
    const [isFavorite, setIsFavorite] = useState(true)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {

    }, [isFavorite])

    const toggleIsFavorite = (ev) => {
        setIsFavorite(ev.target.checked)
        if (ev.target.checked) dispatch(addToFavorites({ locationKey, locationName }))
        else dispatch(removeFromFavorites({ locationKey, locationName }))
    }

    const onSetLocation = () => {
        dispatch(setCurrentLocation({ locationKey, locationName }))
        history.push('/')
    }

    return (
        <Grid item xs={12} md={6}>
            <Card item xs={12} variant='outlined' >
                <CardContent >
                    <Grid container spacing={2}>
                        <Grid item xs={4} sm={6} md={12} >
                            
                            <Typography variant='h6'>
                                {locationName}
                            </Typography>
                            <Typography variant='caption' color='textSecondary'>
                                {locationKey}
                            </Typography>
                        </Grid>
                        <Grid item xs={4} sm={6} md={12}>
                            <Typography variant='h6'>
                                {temperature} &deg;{temperatureUnit}
                            </Typography>
                        </Grid>
                        <Grid container item xs={4} sm={12}>
                            <Grid item sm={6}>

                                <Checkbox
                                    checked={isFavorite}
                                    onChange={toggleIsFavorite}
                                    color='secondary'
                                    icon={<FavoriteBorderIcon />}
                                    checkedIcon={<FavoriteIcon />}
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <IconButton onClick={onSetLocation} aria-label="location-details" color='secondary'>
                                    <ArrowForwardIosOutlinedIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    )
}