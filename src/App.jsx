import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const divArray = new Array(12).fill(null);

  return (
    <>
      <div>
        <div className="card-container">
          {divArray.map((element, index) => {
            return <div key={index} className='card'>{element}</div>
          }
          )}

        </div>
      </div>
    </>
  )
}

export default App
