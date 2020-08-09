import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"
import './App.css';
import {createMuiTheme, ThemeProvider} from "material-ui-core"
import Signin from "./pages/signin"
import {Provider} from "react-redux"
import store from "./redux/store"
import themeFile from './util/theme'
import Dashboard from "./pages/dashboard"

const theme = createMuiTheme(themeFile)

function App() {
  return (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/signin' component={Signin}/>
                    <Route exact path='/' component={Dashboard}>
                        <Redirect to='/dashboard'/>
                    </Route>
                    <Route path={`/:item`} component={Dashboard}/>
                    <Route path='*' render={() => '404 Not found!'}/>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>
  );
}

export default App;
