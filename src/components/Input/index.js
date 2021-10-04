import cn from "classnames";
import s from "./style.module.css";

const Input = ({ required, value, type = "text", label, name, onChange }) => {
    const handlerChange = (e) => {
        onChange && onChange(e.target.value);
    };

    return (
        <div className={s.root}>
            <input 
                value={value}
                type={type} 
                className={cn(s.input, {[s.valid]: value})}
                required={required}
                name={name}
                onChange={handlerChange}
            />
            <span className={s.highlight}></span>
            <span className={s.bar}></span>
            <label 
                className={s.label}
            >
                {label}
            </label>
        </div>
    );
};

export default Input;
