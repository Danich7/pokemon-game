import { useState } from "react";

import Menu from "../Menu";
import Navbar from "../Navbar";

const MenuHeader = ({ bgActive }) => {

	const [isOpen, setOpen] = useState(null);

	const handlerChangePage = () => {
		setOpen(prevState => !prevState);
	};

	return (
		<>
			<Menu onClickButton={handlerChangePage} isOpen={isOpen} />
			<Navbar onClickButton={handlerChangePage} isOpen={isOpen} bgActive={bgActive} />
		</>
	)
};

export default MenuHeader;
