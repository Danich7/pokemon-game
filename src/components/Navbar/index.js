import cn from "classnames";
import s from "./style.module.css";

import { ReactComponent as LoginSVG}  from "./../../assets/login.svg";

const Navbar = ({ onClickButton, isOpen, bgActive = false, onClickLogin }) => {
    return (
        <nav id={s.navbar} className={cn(s.root, {[s.bgActive]: bgActive})}>
            <div className={s.navWrapper}>
                <div className={s.brand}>
                    LOGO
                </div>
                <div className={s.loginAndMenu}>
                    <div 
                        className={s.loginWrap}
                        onClick={onClickLogin}
                        >
                        <LoginSVG />
                    </div>
                    <div 
                        className={cn(s.menuButton, {[s.active]: isOpen})} 
                        onClick={onClickButton}>
                        <span />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
