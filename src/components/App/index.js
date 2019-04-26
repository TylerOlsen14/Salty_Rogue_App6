import React, { useState, useEffect } from 'react';
import './styles.css';
import HomePage from '../HomePage';
import Dashboard from '../Dashboard';
import CallList from '../CallList';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline, CircularProgress } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import firebase from '../firebase'

const theme = createMuiTheme()

export default function App() {

  const[firebaseInitialized, setFirebaseInitialized] = useState(false)

  useEffect(() => {
    firebase.isInitialized().then(val =>{
      setFirebaseInitialized(val)
    })
  })

  return firebaseInitialized !== false ? (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/phonerecords" component={CallList} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    ) : <div id="loader"><CircularProgress /></div>
  }

