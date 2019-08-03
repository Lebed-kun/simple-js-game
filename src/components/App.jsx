import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import IndexPage from './pages/IndexPage.jsx';
import EnterNamePage from './pages/EnterNamePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import GamePage from './pages/GamePage.jsx';

import reducer from './store/reducers/reducer.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" component={IndexPage} />
                    <Route exact path="/yourname" component={EnterNamePage} />
                    <Route exact path="/about" component={AboutPage} />
                    <Route exact path="/game" component={GamePage} />
                </Switch>
            </Router>
        </Provider>
    )
}

export default App;