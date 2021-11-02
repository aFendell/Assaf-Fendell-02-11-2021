import { AppBar, FormControlLabel, Switch, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';
import { Link } from "react-router-dom";


const useStyles = makeStyles(() => ({
    appBar: {
        marginBottom: "20px",
    },
    logo: {
        flexGrow: "1",
        cursor: "pointer",
    },
    typographyStyles: {
        justifyContent: "space-between"
    },
    navlinks: {
        flex: 1,
        justifyContent: "space-around"
    },
    link: {
        textDecoration: "none",
        color: "white",
        fontSize: "20px",
        marginLeft: "20px",
        marginRight: "20px",
        "&:hover": {
            borderBottom: "1px solid white",
        },
    },
}))

export const Header = ({ toggleDarkMode }) => {
    const classes = useStyles()

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar className={classes.typographyStyles} lg={8}>
                <Typography variant="h5" className={classes.logo}>
                    HWA
                </Typography>
                <div className={classes.navlinks}>
                    <Link to="/" className={classes.link}>Weather</Link>
                    <Link to="/favorites" className={classes.link}>Favorites</Link>
                </div>
                <FormControlLabel
                    control={<Switch
                        onChange={toggleDarkMode}
                        color="secondary" />}
                />
            </Toolbar>
        </AppBar>
    )
}