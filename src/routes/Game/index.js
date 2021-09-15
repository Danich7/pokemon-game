const GamePage = ({ onChangePage }) => {

    const handlerClick = () => {
        onChangePage && onChangePage("app");
    };

    return (
        <div>
            This is Game Page!
            <button onClick={handlerClick}>
                End Game
            </button>
        </div>
    );
};

export default GamePage;