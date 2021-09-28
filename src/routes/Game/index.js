import { useRouteMatch, Route, Switch, Redirect } from "react-router-dom";

import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import NotFound from "../NotFound";
import { PokemonContext } from "../../context/pokemonContext";
import { useState } from "react";

const GamePage = () => {
    const [selectedPokemons, setSelectedPokemons] = useState({});
    const [selectedPokemons2, setSelectedPokemons2] = useState([]);
    const [winner, setWinner] = useState(0);
    const match = useRouteMatch();

    const handlerSelectedPokemons = (key, pokemon) => {
        setSelectedPokemons(prev => {
            if (prev[key]) {
                const copyState = {...prev};
                delete copyState[key];

                return copyState;
            };

            return {
                ...prev,
                [key]: pokemon,
            }
        });
    };

    const handlerSelectedPokemons2 = (pokemons2) => {
        setSelectedPokemons2(pokemons2);
    };

    const clearPokemons = () => {
        setSelectedPokemons(prev => { return Object() });
        setSelectedPokemons2(prev => { return []; });
    };

    return (
        <PokemonContext.Provider value={{
            pokemons: selectedPokemons,
            pokemons2: selectedPokemons2,
            onSelectedPokemons: handlerSelectedPokemons,
            pokemons2Selected: handlerSelectedPokemons2,
            clearCards: clearPokemons,
            winner: winner,
            setWinner: setWinner,
        }}>
            <Switch>
                <Route path="/404" component={NotFound} />
                <Route path={`${match.path}/`} exact component={StartPage} />
                <Route path={`${match.path}/board`} component={BoardPage} />
                <Route path={`${match.path}/finish`} component={FinishPage} />
                <Route render={() => (
                  <Redirect to="/404" />
                )} />
            </Switch>
        </PokemonContext.Provider>
    );
};

export default GamePage;