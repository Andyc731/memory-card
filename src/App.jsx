import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [divArray, setDivArray] = useState([]);

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

  const randomizeArray = (obj) => {
    const updatedObj = markClicked(obj);
    const updatedArray = divArray.map(item => (item === obj ? updatedObj : item));
    const newArray = shuffleArray(updatedArray);
    
    console.log(newArray);
    setDivArray(newArray);
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
        <div className="card-container">
          {divArray.map((obj, index) => {
            return <div key={index} className='card' onClick={() =>randomizeArray(obj)}>
              <img src={obj.img} alt="" />
            </div>
          }
          )}

        </div>
      </div>
    </>
  )
}

export default App
