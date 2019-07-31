import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import IndexPage from './pages/IndexPage.jsx';
import EnterNamePage from './pages/EnterNamePage.jsx';
import AboutPage from './pages/AboutPage.jsx';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={IndexPage} />
                <Route exact path="/yourname" component={EnterNamePage} />
                <Route exact path="/about" component={AboutPage} />
            </Switch>
        </Router>
    )
}

export default App;