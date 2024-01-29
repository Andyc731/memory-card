import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [divArray, setDivArray] = useState([]);

  const urls = [];

  for (let i = 0; i < 12; i++) {
    const randomNum = Math.floor(Math.random()*1025);
    urls.push(`https://pokeapi.co/api/v2/pokemon/${randomNum}`)
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(urls.map(url => fetch(url).then(response => response.json())));
        const pokemonData = responses.map(pokemon => ({ img: pokemon.sprites.front_default }));
        setDivArray(pokemonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  console.log(divArray);

  
  // async function fetchAPI() {
  //   const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
  //   const json = await response.json();
  
  //   return json;
  // }

  // async function fetchImage(index) {
  //   const apiJSON = await fetchAPI();
  //   const response = await fetch(apiJSON.results[index].url)
  //   const json = await response.json();
    
  //   return json.sprites.front_default;
  // }

  // useEffect(() => {
  //   divArray.forEach(obj => {

  //   })
  //   fetch('https://pokeapi.co/api/v2/pokemon/1025')
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  // })

  // async function setImgSrc() {
  //   divArray.forEach((obj, index) => {
  //     fetchImage(index).then(imgURL => {
  //       obj.img = imgURL;
  //     })
  //   })
  // }

  // setImgSrc();

  return (
    <>
      <div>
        <div className="card-container">
          {divArray.map((obj, index) => {
            return <div key={index} className='card'>
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
