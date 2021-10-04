import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PokemonCard from '../../../../components/PokemonCard';
import { addOnePokemon } from "./../../../../store/pokemons";
import { player1Card, player2Card, winnerPl, clean } from "./../../../../store/game";


import s from "./style.module.css";

const FinishPage = () => {
    const dispatch = useDispatch();
    const player1Cards = useSelector(player1Card);
    const player2Cards = useSelector(player2Card);
    const winnerPlayer = useSelector(winnerPl);

    const [pokemons2, setPokemons2] = useState(player2Cards);
    const [chosenCard, setChosenCard] = useState(null);
    
    const history = useHistory();

    const handlerClickEnd = () => {
        if (chosenCard !== null) {
            delete chosenCard.selected;
            dispatch(addOnePokemon(chosenCard));
        };
        dispatch(clean());
        history.replace("/game");
    };

    const onChangeIsActive = (key) => {
        if (winnerPlayer === 1) {
            setPokemons2(prev => {
                return prev.reduce((acc, item) => {
                    const newItem = {...item, selected: false};
                    if (newItem.id === key) {
                        setChosenCard(item);
                        newItem.selected = true;
                    };
                    acc.push(newItem);
                    return acc;
                }, []);
            });
        };
    };

    if (Object.keys(player1Cards).length === 0) {
        history.replace("/game");
    };

    return (
        <>
            <div className={s.flex}>
                {
                    Object.entries(player1Cards).map(([key, {name, id, img, type, values, selected}]) => (
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
            <button className={s.button} onClick={handlerClickEnd} disabled={( winnerPlayer === 1) && (chosenCard === null)}>
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
