import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import PokemonCard from "../../../../components/PokemonCard";
import { selectPokemonsData, selectPokemonsLoading, getPokemonsAsync } from "./../../../../store/pokemons";
import { player1Card, pokemonState } from "./../../../../store/game";

import s from "./style.module.css";

const StartPage = () => {
    const player1Cards = useSelector(player1Card);
    const pokemonsRedux = useSelector(selectPokemonsData);
    const isLoading = useSelector(selectPokemonsLoading);

    const dispatch = useDispatch();

    const history = useHistory();

    const [pokemons, setPokemonState] = useState(pokemonsRedux);

    useEffect(() => {
        dispatch(getPokemonsAsync());
    }, []);

    useEffect(() => {
        setPokemonState(pokemonsRedux);
    }, [pokemonsRedux]);

    const handlerChangeSelect = (key) => {
        const pokemon = {...pokemons[key]};
        dispatch(pokemonState({ key: key, value: pokemon}));

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
                        disabled={Object.keys(player1Cards).length < 5}
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
                                    if (Object.keys(player1Cards).length < 5 || selected) {
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