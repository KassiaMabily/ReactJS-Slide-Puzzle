import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Game from "../pages/Game";
import Home from "../pages/Home";

export default function AppRoutes (){
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/game">
                    <Game />
                </Route>
            </Switch>
        </Router>
    )
}