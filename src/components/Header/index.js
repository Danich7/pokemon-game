import s from "./style.module.css";

const Header = ({ title, descr, onClickButton }) => {
    return (
        <header className={s.root}>
            <div className={s.forest}></div>
            <div className={s.silhouette}></div>
            <div className={s.moon}></div>
            <div className={s.container}>
                <h1>This is title</h1>
                <p>This is Description!</p>
                <button onClick={onClickButton}>
                    Start Game
                </button>
            </div>
        </header>
    );
};

export default Header;
