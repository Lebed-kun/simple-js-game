import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import IndexPage from './pages/IndexPage.jsx';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={IndexPage} />
            </Switch>
        </Router>
    )
}

export default App;