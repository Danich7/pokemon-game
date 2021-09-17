import { useState } from "react";
import { useHistory } from "react-router";
import Layout from "../../components/Layout";
import PokemonCard from "../../components/PokemonCard";

import POKEMONS from "../../data/pokemon.json";
import s from "./style.module.css";

const GamePage = () => {
    const history = useHistory();
    const [pokemon, setPokemonState] = useState(() => [...POKEMONS]);

    const handlerPokemonCard = (id) => {
        setPokemonState(item => item.map(item => item.id === id ? {...item, active: !item.active}: item));
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
				title="Cards"
			    >
				<div className={s.flex}>
					{
						pokemon.map(item => <PokemonCard key={item.id} name={item.name} type={item.type} img={item.img} values={item.values} id={item.id} onChangeIsActive={handlerPokemonCard} isActive={item.active} />)
					}
				</div>
			</Layout>
            </div>
        </>
    );
};

export default GamePage;