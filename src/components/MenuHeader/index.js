import { useState } from "react";
import {NotificationManager} from 'react-notifications';
import { useDispatch } from "react-redux";
import { Email, Password } from "../../store/home";

import Menu from "../Menu";
import Navbar from "../Navbar";
import Modal from "../Modal";
import LoginForm from "../LoginForm";
import { getUserUpdateAsync } from "../../store/user";

const MenuHeader = ({ bgActive }) => {
	const [isOpen, setOpen] = useState(null);
	const [isOpenModal, setOpenModal] = useState(false);

	const dispatch = useDispatch();

	const handlerChangePage = () => {
		setOpen(prevState => !prevState);
	};

	const handlerClickLogin = () => {
		setOpenModal(prevState => !prevState);
		dispatch(Email(""));
        dispatch(Password(""));
	};

	const handlerSubmitLoginForm = async ({ email, password, isAuth }) => {
		const requestOptions = {
			method: "POST",
			body: JSON.stringify({
				email,
				password,
				returnSecureToken: true,
			}),
		};

		if (isAuth) {
			const responce = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBnsCx9TO1kFkw9BVFzVs4oIQMJ0zI9mL8", requestOptions).then(res => res.json());
			
			if (responce.hasOwnProperty("error")) {
				NotificationManager.error(responce.error.message, "Wrong!");
			} else {
				localStorage.setItem("idToken", responce.idToken);
				NotificationManager.success("Welcome!");
				dispatch(getUserUpdateAsync());
				handlerClickLogin();
			};
			
		} else {
			const responce = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBnsCx9TO1kFkw9BVFzVs4oIQMJ0zI9mL8", requestOptions).then(res => res.json());
			
			if (responce.hasOwnProperty("error")) {
				NotificationManager.error(responce.error.message, "Wrong!");
			} else {
				const pokemonsStart = await fetch("https://reactmarathon-api.herokuapp.com/api/pokemons/starter").then(res => res.json());

				for (const item of pokemonsStart.data) {
					await fetch(`https://pokemon-game-6459c-default-rtdb.firebaseio.com/${responce.localId}/pokemons.json?auth=${responce.idToken}`, 
						{
							method: "POST",
							body: JSON.stringify(item),
						});
				};
				NotificationManager.success("Success!");
			};
		};
	};

	return (
		<>
			<Menu 
				onClickButton={handlerChangePage} 
				isOpen={isOpen} />
			<Navbar 
				onClickButton={handlerChangePage} 
				isOpen={isOpen} 
				bgActive={bgActive}
				onClickLogin={handlerClickLogin} />
			<Modal 
				isOpen={isOpenModal}
				title="Log in"
				onCloseModal={handlerClickLogin}
			>
				<LoginForm
					onSubmit={handlerSubmitLoginForm}
				/>
			</Modal>
		</>
	)
};

export default MenuHeader;
