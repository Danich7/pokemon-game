import { useState } from "react";
import PokemonCard from "../../../../../../components/PokemonCard";
import cn from "classnames";

import s from "./style.module.css";

const PlayerBoard = ({ cards, onClickCard, player, turn }) => {
    const [isSelected, setSelected] = useState(null);

    return (
        <>
            {
                cards.map((item) => (
                    <div 
                        key={item.id}
                        className={cn(s.cardBoard, {
                            [s.selected]: isSelected === item.id
                        })}
                        onClick={() => {
                            if (turn === player) {
                                setSelected(item.id);
                                onClickCard && onClickCard({
                                    player,
                                    ...item,
                                });
                            };
                        }}
                    >
                        <PokemonCard
                            name={item.name}
                            img={item.img}
                            type={item.type}
                            id={item.id}
                            values={item.values}
                            minimize
                            isActive
                        />
                    </div>
                ))
            }
        </>
    );
};

export default PlayerBoard;
