import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonContext } from '../../../../context/pokemonContext';
import PokemonCard from '../../../../components/PokemonCard';


import s from "./style.module.css";

const FinishPage = () => {
    const pokemonsContext = useContext(PokemonContext);
    const [pokemons, setPokemonState] = useState({});

    const history = useHistory();

    const hanlderClickEnd = () => {
        // pokemonsContext.clean();
        history.push("/game");
    };

    // if (Object.keys(pokemons).length === 0) {
    //     history.replace("/game");
    // };

    return (
        <>
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
                    />
                ))
            }
            </div>
            <button className={s.button} onClick={hanlderClickEnd}>
                END GAME
            </button>
            <div className={s.flex}>

            </div>
        </>
    );
};

export default FinishPage;
