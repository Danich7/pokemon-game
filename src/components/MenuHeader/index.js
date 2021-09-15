import { useState } from "react";

import Menu from "../Menu";
import Navbar from "../Navbar";

const MenuHeader = () => {

	const [isOpen, setOpen] = useState(undefined);

	const handlerChangePage = () => {
		setOpen(!isOpen);
	};

	return (
		<>
			<Menu isOpen={isOpen} />
			<Navbar onClickButton={handlerChangePage} isOpen={isOpen} />
		</>
	)
};

export default MenuHeader;
