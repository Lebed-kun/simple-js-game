import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import IndexPage from './pages/IndexPage.jsx';
import EnterNamePage from './pages/EnterNamePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import GamePage from './pages/GamePage.jsx';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={IndexPage} />
                <Route exact path="/yourname" component={EnterNamePage} />
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/game" component={GamePage} />
            </Switch>
        </Router>
    )
}

export default App;