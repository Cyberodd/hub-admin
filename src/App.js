import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import {createMuiTheme, ThemeProvider} from "material-ui-core"
import Signin from "./pages/signin"
import {Provider} from "react-redux"
import jwtDecode from 'jwt-decode'
import store from "./redux/store"
import themeFile from './util/theme'
import Dashboard from "./pages/dashboard"
import axios from 'axios'
import {signOutUser} from "./api"
import {SIGN_IN_SUCCESS} from "./redux/types"
import AuthRoute from "./AuthRoute"

const theme = createMuiTheme(themeFile)

const token = localStorage.dairy
if (token){
    const decodedToken = jwtDecode(token)
    if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(signOutUser());
        window.location.href = '/';
    } else {
        store.dispatch({
            type: SIGN_IN_SUCCESS,
            // payload: token
        });
        axios.defaults.headers.common['Authorization'] = token;
    }
}

function App() {
  return (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <AuthRoute exact path='/' component={Signin}/>
                    <Route exact path='/dashboard' component={Dashboard}/>
                    <Route path={`/:item`} component={Dashboard}/>
                    <Route path='*' render={() => '404 Not found!'}/>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>
  );
}

export default App;
