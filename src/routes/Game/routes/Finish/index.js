import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonContext } from '../../../../context/pokemonContext';
import PokemonCard from '../../../../components/PokemonCard';
import { FireBaseContext } from '../../../../context/firebaseContext';


import s from "./style.module.css";

const FinishPage = () => {
    const pokemonContext = useContext(PokemonContext);
    const firebase = useContext(FireBaseContext);
    const [chosenCard, setChosenCard] = useState(null);
    const pokemons1 = pokemonContext.pokemons;
    const [pokemons2, setPokemons2] = useState(pokemonContext.pokemons2);

    const history = useHistory();

    const handlerClickEnd = () => {
        if (chosenCard !== null) {
            delete chosenCard.selected;
            firebase.addPokemon(chosenCard);
        };
        pokemonContext.clearCards();
    };

    const onChangeIsActive = (key) => {
        if (pokemonContext.winner === 1) {
            setPokemons2(prev => {
                return prev.reduce((acc, item) => {
                    item.selected = false;
                    if (item.id === key) {
                        setChosenCard(item);
                        item.selected = true;
                    };
                    acc.push(item);
                    return acc;
                }, []);
            });
        };
    };

    if (Object.keys(pokemons1).length === 0) {
        history.replace("/game");
    };

    return (
        <>
            <div className={s.flex}>
                {
                    Object.entries(pokemons1).map(([key, {name, id, img, type, values, selected}]) => (
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
            <button className={s.button} onClick={handlerClickEnd} disabled={( pokemonContext.winner === 1) && (chosenCard === null)}>
                END GAME
            </button>
            <div className={s.flex}>
                {
                    Object.entries(pokemons2).map(([key, {name, id, img, type, values, selected}]) => (
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
                            onChangeIsActive={onChangeIsActive}
                        />
                    ))
                }
            </div>
        </>
    );
};

export default FinishPage;
