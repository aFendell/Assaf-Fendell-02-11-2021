import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles, Grid, Paper } from '@material-ui/core';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

import './App.css';
import { Header } from './cmps/Header';
import { WeatherPage } from './pages/WeatherPage';
import { FavoritesPage } from './pages/FavoritesPage';


function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const theme = createTheme({
    palette: {
      type: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#263238' : '#1de9b6',
      },
      secondary: {
        main: '#1de9b6',
      },
      background: {
        paper: isDarkMode ? '#263238' : '#f5f5f5',
        default: isDarkMode ? '#263238' : '#f5f5f5',
      }
    },

  })

  const toggleDarkMode = (ev) => {
    setIsDarkMode(ev.target.checked)
  }


  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Paper className="App" >
          <Header toggleDarkMode={toggleDarkMode} />
          <Grid container>
            <Grid item xs={false} sm={2} lg={3} />
            <Grid item xs={12} sm={8} lg={6}>
              <Switch>
                <Route path="/favorites" component={FavoritesPage} />
                <Route path="/" component={WeatherPage} />
              </Switch>
            </Grid>
            <Grid item xs={false} sm={2} lg={3} />
          </Grid>
        </Paper>
      </ThemeProvider>
    </Router>
  );
}

export default App;
