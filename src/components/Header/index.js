import s from "./style.module.css";

const Header = ({ title, descr, onClickButton }) => {

    const handlerClick = () => {
        onClickButton && onClickButton("game");
    };

    return (
        <header className={s.root}>
            <div className={s.forest}></div>
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
