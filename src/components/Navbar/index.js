import s from "./style.module.css";
import cn from "classnames";

const Navbar = ({ onClickButton, isOpen, bgActive = false }) => {
    return (
        <nav id={s.navbar} className={cn(s.root, {[s.bgActive]: bgActive})}>
            <div className={s.navWrapper}>
                <p className={s.brand}>
                    LOGO
                </p>
                <div className={cn(s.menuButton, {[s.active]: isOpen})} onClick={onClickButton}>
                    <span />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
