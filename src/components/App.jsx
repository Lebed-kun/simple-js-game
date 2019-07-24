import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import IndexPage from './pages/IndexPage.jsx';
import EnterNamePage from './pages/EnterNamePage.jsx';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={IndexPage} />
                <Route exact path="/yourname" component={EnterNamePage} />
            </Switch>
        </Router>
    )
}

export default App;