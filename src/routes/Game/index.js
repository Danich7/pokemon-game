import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Layout from "../../components/Layout";
import PokemonCard from "../../components/PokemonCard";

import database from "../../service/firebase";

import s from "./style.module.css";

const GamePage = () => {
    const history = useHistory();
    const [pokemons, setPokemonState] = useState({});

    useEffect(() => {
        database.ref("pokemons").once("value", (snapshot) => {
            setPokemonState(snapshot.val());
        });
    }, []);

    const handlerPokemonCard = (id, isActive) => {
        setPokemonState(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]};
                if (pokemon.id === id) {
                    pokemon.active = !isActive;
                };

                database.ref("pokemons/" + item[0]).set(pokemon);
        
                acc[item[0]] = pokemon;
                return acc;
            }, {});
        });
    };

    const handlerClick = () => {
        history.push("/");
    };

    const addPokemon = () => {
        const pokemonsArr = Object.entries(pokemons);
        const leng = pokemonsArr.length
        const index = Math.floor(Math.random() * leng);
        const newObj = pokemonsArr[index];
        const pokemonItem = newObj[1];
        const newId = Date.now();
        pokemonItem.id = newId;

        const newKey = database.ref().child('pokemons').push().key;
        database.ref('pokemons/' + newKey).set(pokemonItem);
        database.ref("pokemons").once("value", (snapshot) => {
            setPokemonState(snapshot.val());
        });
    };

    return (
        <>
            <div>
                <button onClick={handlerClick}>
                    End Game
                </button>
                <Layout
				    title="Cards"
                />
                <div className={s.button}>
                    <button onClick={addPokemon}>ADD NEW POKEMON</button>
                </div>
				<div className={s.flex}>
					{
						Object.entries(pokemons).map(([key, {name, id, img, type, values, active}]) => (
                            <PokemonCard 
                                objID={key}
                                key={key}
                                name={name}
                                img={img}
                                type={type}
                                id={id}
                                values={values}
                                isActive={active}
                                onChangeIsActive={handlerPokemonCard}
                            />
                        ))
					}
				</div>
            </div>
        </>
    );
};

export default GamePage;