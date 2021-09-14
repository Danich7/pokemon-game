import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Footer from "../../components/Footer";
import PokemonCard from "../../components/PokemonCard";
import MenuHeader from "../../components/MenuHeader";

import back from "../../assets/bg2.jpg";

import POKEMONS from "../../data/pokemon.json";
import s from "./style.module.css";

const HomePage = ({ onChangePage }) => {

	const handlerClickButton = (page) => {
		console.log("####: <HomePage />");
		onChangePage && onChangePage(page);
	};

	return (
		<>
			<MenuHeader />
			<Header
				title="This is new title" 
				descr="This is new Description!"
				onClickButton={handlerClickButton} />
			<Layout
				title="Rules"
				colorBg="lightgreen"
			>
				<p>
					In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3 grid.
					Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into the player's own color of red or blue.
					To win, a majority of the total ten cards played (including the one card that is not placed on the board) must be of the player's card color. To do this, the player must capture cards by placing a card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards touch will be compared. If the rank of the opponent's card is higher than the player's card, the player's card will be captured and turned into the opponent's color. If the player's rank is higher, the opponent's card will be captured and changed into the player's color instead.
				</p>

			</Layout>
			<Layout
				title="Cards"
			>
				<div className={s.flex}>
					{
						POKEMONS.map(item => <PokemonCard key={item.id} name={item.name} type={item.type} img={item.img} values={item.values} id={item.id} />)
					}
				</div>
			</Layout>
			<Layout
				title="This is new title"
				urlBg={back}
			>

			</Layout>
			<Footer />
		</>
	);
};

export default HomePage;
