import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [divArray, setDivArray] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const urls = [];

  for (let i = 0; i < 12; i++) {
    const randomNum = Math.ceil(Math.random()*1025);
    urls.push(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(urls.map(url => fetch(url).then(response => response.json())));
        const pokemonData = responses.map(pokemon => ({ img: pokemon.sprites.front_default, clicked: false }));
        setDivArray(pokemonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const checkAllTrue = () => {
      return divArray.every(obj => obj.clicked === true)
    }

    checkAllTrue() ? setIsDialogOpen(true) : setIsDialogOpen(false);

  }, [divArray])

  const randomizeArray = (obj) => {
    const updatedObj = markClicked(obj);
    const updatedArray = divArray.map(item => (item === obj ? updatedObj : item));
    const newArray = shuffleArray(updatedArray);
    
    setDivArray(newArray);
    updateSore(obj);
  }

  const updateSore = (obj) => {
    if (obj.clicked === true) {
      if (score > highScore) {
        setHighScore(score);
      }
      setScore(0);
      resetDivArray();
    } else {
      setScore(prevScore => prevScore + 1);
    }
  }

  const resetDivArray = () => {
    setDivArray(prevArray => (
      prevArray.map(obj => ({...obj, clicked: false}))
    ))
  }

  const markClicked = (obj) => {
    return {...obj, clicked: true};
  }

  const shuffleArray = (array) => {
    const arrayCopy = [...array];
    const newArray = [];
    while (arrayCopy.length) {
      const randomNum = Math.floor(Math.random()*arrayCopy.length);
      newArray.push(arrayCopy.splice(randomNum, 1)[0]);
    }
    return newArray;
  }


  return (
    <>
      <div>
        <p>score: {score}</p>
        <p>high score: {highScore}</p>
        <div className="card-container">
          {divArray.map((obj, index) => {
            return <div key={index} className='card' onClick={() =>randomizeArray(obj)}>
              <img src={obj.img} alt="" />
            </div>
          }
          )}

        </div>
        {isDialogOpen && (
          <dialog open>
            <p>You Win!</p>
            <button>Restart</button>
          </dialog>
        )}
      </div>
    </>
  )
}

export default App
