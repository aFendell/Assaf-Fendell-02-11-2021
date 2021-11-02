import { Grid } from '@material-ui/core'
import {FavoriteItem} from './FavoriteItem'

export const FavoritesList = ({ favoritesToDisplay }) => {
    
    return (
        <Grid container spacing={1} >
            {favoritesToDisplay.map(location =>
                <FavoriteItem location={location} key={location.locationKey} />
            )}
        </Grid>
    )
}