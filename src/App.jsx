import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [divArray, setDivArray] = useState([]);
  const [winDialog, setWinDialog] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [loseDialog, setLoseDialog] = useState(false);

  const urls = [];

  while (urls.length < 12) {
    const randomNum = Math.ceil(Math.random() * 1025);
    if (!urls.includes(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)) {
      urls.push(`https://pokeapi.co/api/v2/pokemon/${randomNum}`);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          urls.map((url) => fetch(url).then((response) => response.json()))
        );
        const pokemonData = responses.map((pokemon) => ({
          name: capitalize(pokemon.name) + pokemon.name.slice(1),
          img: pokemon.sprites.front_default,
          clicked: false,
        }));
        setDivArray(pokemonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const checkAllTrue = () => {
      return divArray.every((obj) => obj.clicked === true);
    };

    checkAllTrue() ? setWinDialog(true) : setWinDialog(false);
  }, [divArray]);

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const randomizeArray = (obj) => {
    const updatedObj = markClicked(obj);
    const updatedArray = divArray.map((item) =>
      item === obj ? updatedObj : item
    );
    const newArray = shuffleArray(updatedArray);

    setDivArray(newArray);
    updateSore(obj);
  };

  const updateSore = (obj) => {
    if (obj.clicked === true) {
      if (score > highScore) {
        setHighScore(score);
      }
      setScore(0);
      resetDivArray();
      setLoseDialog(true);
    } else {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const resetDivArray = () => {
    setDivArray((prevArray) =>
      prevArray.map((obj) => ({ ...obj, clicked: false }))
    );
  };

  const markClicked = (obj) => {
    return { ...obj, clicked: true };
  };

  const shuffleArray = (array) => {
    const arrayCopy = [...array];
    const newArray = [];
    while (arrayCopy.length) {
      const randomNum = Math.floor(Math.random() * arrayCopy.length);
      newArray.push(arrayCopy.splice(randomNum, 1)[0]);
    }
    return newArray;
  };

  const closeWinDialog = () => {
    setWinDialog(false);
  };

  const closeLoseDialog = () => {
    setLoseDialog(false);
  };

  return (
    <>
      <div className="container">
        <p>score: {score}</p>
        <p>high score: {highScore}</p>
        <div className="card-container">
          {divArray.map((obj, index) => {
            return (
              <div
                key={index}
                className="card"
                onClick={() => randomizeArray(obj)}
              >
                <img src={obj.img} alt="" />
                <p className="pokeName">{obj.name}</p>
              </div>
            );
          })}
        </div>
        {winDialog && (
          <div className="dialog-container">
            <dialog open className="dialog">
              <p>You Win!</p>
              <button onClick={closeWinDialog}>Restart</button>
            </dialog>
          </div>
        )}
        {loseDialog && (
          <div className="dialog-container">
            <dialog open className="dialog">
              <button onClick={closeLoseDialog}>Restart</button>
            </dialog>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
