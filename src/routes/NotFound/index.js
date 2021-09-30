import { useHistory } from "react-router";

import cat from "../../assets/cat.jpg";
import s from "./style.module.css";

const NotFound = () => {
    const history = useHistory();

    const handlerClick = () => {
        history.push("/");
    };

    return (
        <>
            <h1 className={s.title}>404 Not Found</h1>
            <img className={s.image} src={cat} alt="" />
            <button className={s.button} onClick={handlerClick}>HOME PAGE</button>
        </>
    );
};

export default NotFound;
