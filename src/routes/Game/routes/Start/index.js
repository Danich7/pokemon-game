import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import PokemonCard from "../../../../components/PokemonCard";
import { FireBaseContext } from "../../../../context/firebaseContext";
import { PokemonContext } from "../../../../context/pokemonContext";

import s from "./style.module.css";

const StartPage = () => {
    const firebase = useContext(FireBaseContext);
    const pokemonsContext = useContext(PokemonContext);
    const history = useHistory();
    const [pokemons, setPokemonState] = useState({});

    useEffect(() => {
        firebase.getPokemonSoket((pokemons) => {
            setPokemonState(pokemons);
        });

        return () => firebase.offPokemonSoket();
    }, []);

    const handlerChangeSelect = (key) => {
        const pokemon = {...pokemons[key]};
        pokemonsContext.onSelectedPokemons(key, pokemon);

        setPokemonState(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                selected: !prev[key].selected,
            }
        }));
    };

    const handlerClick = () => {
        history.push("/game/board");
    };

    return (
        <>
            <div>
                <div className={s.button}>
                    <button 
                        onClick={handlerClick}
                        disabled={Object.keys(pokemonsContext.pokemons).length < 5}
                    >
                        Start Game
                    </button>
                </div>
				<div className={s.flex}>
					{
						Object.entries(pokemons).map(([key, {name, id, img, type, values, selected}]) => (
                            <PokemonCard 
                                className={s.card}
                                key={key}
                                name={name}
                                img={img}
                                type={type}
                                id={id}
                                values={values}
                                isActive={true}
                                isSelected={selected}
                                onChangeIsActive={() => {
                                    if (Object.keys(pokemonsContext.pokemons).length < 5 || selected) {
                                        handlerChangeSelect(key);
                                    };
                                }}
                            />
                        ))
					}
				</div>
            </div>
        </>
    );
};

export default StartPage;