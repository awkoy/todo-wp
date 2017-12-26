import React, { Component } from 'react';
import './App.css';

import {Provider} from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import {createStore, applyMiddleware} from 'redux';
import rootReducer from './../reducers/rootReducer';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import Home from './../components/pages/Home';
import Page404 from './../components/pages/Page404';
import Login from './../components/pages/Login';

const history = createHistory();
const routerHistory = routerMiddleware(history);
const middleware = composeWithDevTools( applyMiddleware( routerHistory, thunk, logger ) );
const store = createStore (rootReducer, middleware);

class App extends Component {
    render() {

        const isLoggedIn = window.localStorage.getItem('is_loginned');

        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route exact path="/" render={() => (
                            isLoggedIn ? (
                                <Home user='admin'/>
                            ) : (
                                <Home user='default'/>
                            )
                        )}/>
                        <Route path="/login" render={() => (
                            isLoggedIn ? (
                                <Redirect to="/"/>
                            ) : (
                                <Login />
                            )
                        )}/>
                        <Route component={Page404}/>
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    }
}

export default App;