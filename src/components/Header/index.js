import { useHistory } from "react-router";

import s from "./style.module.css";

const Header = ({ title, descr, onClickButton }) => {
    const history = useHistory();

    const handlerClick = () => {
        history.push("/game");
    };

    return (
        <header className={s.root}>
            <div className={s.forest}></div>
            <div className={s.silhouette}></div>
            <div className={s.moon}></div>
            <div className={s.container}>
                <h1>This is title</h1>
                <p>This is Description!</p>
                <button onClick={handlerClick}>
                    Start Game
                </button>
            </div>
        </header>
    );
};

export default Header;
