import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Email, Password, emailState, passwordState } from "../../store/home";

import Input from "../Input";

import s from "./style.module.css";

const LoginForm = ({ onSubmit }) => {
    const emailRedux = useSelector(emailState);
    const passwordRedux = useSelector(passwordState);

    const [email, setEmail] = useState(emailRedux);
    const [password, setPassword] = useState(passwordRedux);
    const [isAuth, setIsAuth] = useState(false);
    
    const dispatch = useDispatch();

    useEffect(() => {
        setEmail(emailRedux);
    }, [emailRedux]);

    useEffect(() => {
        setPassword(passwordRedux);
    }, [passwordRedux]);

    const handlerSubmit = (e) => {
        e.preventDefault();

        onSubmit && onSubmit({
            email,
            password,
            isAuth,
        });

        dispatch(Email(""));
        dispatch(Password(""));
    };

    const handlerClickLogin = () => {
        setIsAuth(prev => !prev);
    };

    const handlerChangeEmail = (value) => {
        dispatch(Email(value));
    };

    const handlerChangePassword = (value) => {
        dispatch(Password(value));
    };

    return (
        <form onSubmit={handlerSubmit}>
            <div>
                <Input 
                    value={email}
                    name="email"
                    label="Email"
                    required
                    onChange={handlerChangeEmail}
                />
            </div>
            <div>
                <Input 
                    value={password}
                    name="password"
                    type="password"
                    label="Password"
                    required
                    onChange={handlerChangePassword}
                />
            </div>
            <div className={s.flex}>
                <button>
                    {
                        isAuth ? "Sign In" : "Sign Up"
                    }
                </button>
                <span 
                    className={s.question}
                    onClick={handlerClickLogin}
                    >
                    {
                        isAuth ? "Register?" : "Login?"
                    }
                </span>
            </div>
        </form>
    );
};

export default LoginForm;
