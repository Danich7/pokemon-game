import { ReactComponent as LoginSVG}  from "./../../assets/login.svg";
import { ReactComponent as UserSVG}  from "./../../assets/user.svg";
import { useSelector } from "react-redux";
import { selectLocalID, selectUserLoading } from "./../../store/user";
import { Link } from "react-router-dom";

import cn from "classnames";

import s from "./style.module.css";


const Navbar = ({ onClickButton, isOpen, bgActive = false, onClickLogin }) => {
    const isLoadingUser = useSelector(selectUserLoading);
    const localId = useSelector(selectLocalID);

    return (
        <nav id={s.navbar} className={cn(s.root, {[s.bgActive]: bgActive})}>
            <div className={s.navWrapper}>
                <div className={s.brand}>
                    LOGO
                </div>
                <div className={s.loginAndMenu}>
                    {(!isLoadingUser && !localId) && (
                        <div 
                            className={s.loginWrap}
                            onClick={onClickLogin}
                            >
                            <LoginSVG />
                        </div>
                    )}
                    {(!isLoadingUser && localId) && (
                        <Link
                            className={s.loginWrap}
                            to="/login"
                            >
                            <UserSVG />
                        </Link>
                    )}
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
