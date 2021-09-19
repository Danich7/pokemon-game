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

    const handlerPokemonCard = (id, objID) => {
        setPokemonState(prev => {
            return Array.from(prev, (item) => {
                if (item.id === id) {
                    item.active = true;
                };
                return item;
            });
        });

        setPokemonState(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = {...item[1]};
                if (pokemon.id === id) {
                    pokemon.active = true;
                };
        
                acc[item[0]] = pokemon;
        
                return acc;
            }, {});
        });
        
        database.ref('pokemons/'+ objID).set({
            // Один item покемона
        });
    };


    const handlerClick = () => {
        history.push("/");
    };

    return (
        <>
            <div>
                This is Game Page!
                <button onClick={handlerClick}>
                    End Game
                </button>
                <Layout
				    title="Cards" />
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