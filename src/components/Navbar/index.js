import s from "./style.module.css";
import cn from "classnames";

const Navbar = ({ onClickButton, isOpen }) => {

    const handlerClick = (event) => {
        console.log("###: Navbar");
        event.preventDefault();
        onClickButton && onClickButton();
    };

    return (
        <nav className={s.root}>
            <div className={s.navWrapper}>
                <p className={s.brand}>
                    LOGO
                </p>
                <a href="##" className={cn(s.menuButton, {[s.active]: isOpen})} onClick={handlerClick}>
                    <span />
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
