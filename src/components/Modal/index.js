import { useEffect, useRef } from "react";

import cn from "classnames";
import s from "./style.module.css";

const Modal = ({ isOpen, title, children, onCloseModal }) => {
    const modalEl = useRef();

    useEffect(() => {
        document.querySelector("body").style.overflow = isOpen ? "hidden" : null;
    }, [isOpen]);

    const hanlderCloseModal = () => {
        onCloseModal && onCloseModal(false);
    };

    const handlerClickRoot = (event) => {
        if (!modalEl.current.contains(event.target)) {
            hanlderCloseModal();
        };
    };

    return (
        <div 
            className={cn(s.root, {[s.open]: isOpen})}
            onClick={handlerClickRoot}
        >
            <div 
                className={s.modal}
                ref={modalEl}
            >
                <div className={s.head}>
                    { title }
                    <span 
                        className={s.btnClose}
                        onClick={hanlderCloseModal}>
                    </span>
                </div>
                <div className={s.content}>
                    { children }
                </div>
            </div>
        </div>
    );
};

export default Modal;
