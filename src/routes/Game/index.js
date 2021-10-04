import { useRouteMatch, Route, Switch, Redirect } from "react-router-dom";

import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import NotFound from "../NotFound";

const GamePage = () => {
    const match = useRouteMatch();

    return (
        <Switch>
            <Route path="/404" component={NotFound} />
            <Route path={`${match.path}/`} exact component={StartPage} />
            <Route path={`${match.path}/board`} component={BoardPage} />
            <Route path={`${match.path}/finish`} component={FinishPage} />
            <Route render={() => (
                <Redirect to="/404" />
            )} />
        </Switch>
    );
};

export default GamePage;