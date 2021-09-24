import { useRouteMatch, Route, Switch, Redirect } from "react-router-dom";

import StartPage from "./routes/Start";
import BoardPage from "./routes/Board";
import FinishPage from "./routes/Finish";
import NotFound from "../NotFound";
import { PokemonContext } from "../../context/pokemonContext";
import { useState } from "react";

const GamePage = () => {
    const [selectedPokemons, setSelectedPokemons] = useState({});
    const [player2Cards, setPlayer2Cards] = useState({});
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

    const handlerSetPlayer2 = (item) => {
        setPlayer2Cards(prev => prev = [...item]);
    };

    const cleanPokemons = () => {
        setSelectedPokemons(() => {return});
        setPlayer2Cards(() => {return});
    };

    return (
        <PokemonContext.Provider value={{
            pokemons: selectedPokemons,
            onSelectedPokemons: handlerSelectedPokemons,
            player2Pokemons: player2Cards,
            onSetPlayer2: handlerSetPlayer2,
            cleanCards: cleanPokemons,
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