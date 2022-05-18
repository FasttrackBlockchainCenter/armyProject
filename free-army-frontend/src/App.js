import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import Routes from './Routes';
import theme from './theme';
import './App.css';
import AppContextProvider from './context/AppContext';

const browserHistory = createBrowserHistory();

function App() {
  return (
  	<AppContextProvider>
	    <ThemeProvider theme={theme}>
	      <Router history={browserHistory}>
	        <Routes />
	      </Router>
	    </ThemeProvider>
    </AppContextProvider>
  );
}

export default App;
