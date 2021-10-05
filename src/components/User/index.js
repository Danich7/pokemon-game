import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeUser, selectUserData } from "./../../store/user";
import {NotificationManager} from 'react-notifications';

import s from "./style.module.css";

const UserPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUserData);
    const history = useHistory();

    const handlerLogOut = () => {
        localStorage.removeItem("idToken");
        dispatch(removeUser());
        NotificationManager.success("Log Out!");
        history.replace("/");
    };

    return (
        <>
            <div className={s.content}>
                <div className={s.data}>
                    <b>Email:</b> {user.email}
                </div>
                <div className={s.data}>
                    <b>localId:</b> {user.localId}
                </div>
                <div className={s.data}>
                    <b>Created at:</b> {new Date(+user.createdAt).toLocaleDateString()}
                </div>
                <button 
                    onClick={handlerLogOut}
                    >
                    Log Out
                </button>
            </div>
        </>
    );
};

export default UserPage;
