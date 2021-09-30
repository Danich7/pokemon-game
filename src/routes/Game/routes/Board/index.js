import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import PokemonCard from '../../../../components/PokemonCard';
import PlayerBoard from "../Board/component/PlayerBoard";
import { player1Card, player2Set, setWinner } from "./../../../../store/game";

import s from './style.module.css';

const counterWin = (board, player1, player2) => {
    let player1Count = player1.length;
    let player2Count = player2.length;

    board.forEach(item => {
        if (item.card.possession === "red") {
            player2Count++;
        };

        if (item.card.possession === "blue") {
            player1Count++;
        };
    });

    return [player1Count, player2Count];
};

const BoardPage = () => {
    const player1Cards = useSelector(player1Card);
    const dispatch = useDispatch();
    
    const history = useHistory();

    const [board, setBoard] = useState([]);
    const [player1, setPlayer1] = useState(() => {
        return Object.values(player1Cards).map(item => ({
            ...item,
            possession: "blue",
        }));
    });
    const [player2, setPlayer2] = useState([]);

    const [steps, setSteps] = useState(0);
    const [choiseCard, setChoiseCard] = useState(null);
    const [turn, setTurn] = useState(1);
    
    if (Object.keys(player1Cards).length === 0) {
        history.replace("/game");
    };
  
    useEffect(() => {
        const fetchData = async () => {
            const boardResponce = await fetch("https://reactmarathon-api.netlify.app/api/board");
            const boardRequest = await boardResponce.json();
            
            setBoard(boardRequest.data);
            
            const player2Responce = await fetch("https://reactmarathon-api.netlify.app/api/create-player");
            const player2Request = await player2Responce.json();
            
            setPlayer2(() => {
                return player2Request.data.map(item => ({
                    ...item,
                    possession: "red",
                }));
            });

            dispatch(player2Set(player2Request.data.map(item => ({
                ...item,
            }))));
        };
        fetchData();
    }, []);

    const handlerClickBoardPlate = async (position) => {
        const isDouble = board.some(({ card }) => {
            return card?.id === choiseCard?.id && card?.possession === choiseCard?.possession;
        });
        if (isDouble) return;

        if (choiseCard) {
            const params = {
                position,
                card: choiseCard,
                board,
            };

            const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            const request = await res.json();
            
            if (choiseCard.player === 1) {
                setPlayer1(prev => prev.filter(item => item.id !== choiseCard.id));
                setTurn((prev) => prev + 1);
            };

            if (choiseCard.player === 2) {
                setPlayer2(prev => prev.filter(item => item.id !== choiseCard.id));
                setTurn((prev) => prev - 1);
            };

            setBoard(request.data);

            setSteps(prev => {
                const count = prev + 1;
                return count;
            });
        };
    };

    useEffect(() => {
        if (steps === 9) {
            const [count1, count2] = counterWin(board, player1, player2);

            if (count1 > count2) {
                alert("WIN");
                dispatch(setWinner(1));
            } else if (count1 < count2) {
                alert("LOSE");
            } else {
                alert("DRAW");
            };

            history.push("/game/finish");
        };
    }, [steps]);

    return (
        <div className={s.root}>
            <div className={s.playerOne}>
                <PlayerBoard 
                    player={1}
                    cards={player1}
                    onClickCard={(card) => setChoiseCard(card)}
                    turn={turn}
                />
            </div>
            <div className={s.board}>
                {
                    board.map(item => 
                        <div 
                            key={item.position}
                            className={s.boardPlate}
                            onClick={() => !item.card && handlerClickBoardPlate(item.position)}
                        >
                            {
                                item.card && <PokemonCard {...item.card} isActive minimize />
                            }
                        </div>
                    )
                }
            </div>
            <div className={s.playerTwo}>
                <PlayerBoard 
                    player={2}
                    cards={player2}
                    onClickCard={(card) => setChoiseCard(card)}
                    turn={turn}
                />
            </div>
        </div>
    );
};

export default BoardPage;
