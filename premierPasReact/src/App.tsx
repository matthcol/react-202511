import { useState, type Dispatch, type FC, type SetStateAction } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// TODO: garder le bouton generique CounterClick et l'instantier 3 fois:
// - incr: +1
// - decr: -1
// - reset
// Ajouter un label en props

// type CounterProps = {
//   count: number,
//   setCount: Dispatch<SetStateAction<number>>
// }

type CounterProps = {
  label: string,
  updateCount: () => void
}

// function CounterClick({label, updateCount}: CounterProps) {
const CounterClick = ({label, updateCount}: CounterProps) => {
// const CounterClick: FC<CounterProps> = ({label, updateCount}) => {
  return (
    <>
      <button onClick={() => updateCount()}>
        {label}
      </button>
      <img src={reactLogo} alt="logo" />
    </>
  )
}

function App() {
  const [count, setCount] = useState(0)
  
  const incrCount = () => {
    const nextN = count + 1
    console.log("Increment counter:", nextN)
    // NB: maj state:
    //  - 1 - dans le contexte d'1 evenement
    //  - 2 - utiliser uniquement le setter du useState
    setCount(nextN)
  }
  
  const decrCount = () => {
    const nextN = count - 1
    console.log("Decrement counter:", nextN)
    setCount(nextN)
  }

  const resetCount = () => {
    const nextN = 0
    console.log("Reset counter:", nextN)
    setCount(nextN)
  }

  return (
    <>
      <h1>Course</h1>
      <div className="card">
        {count}
      </div>
      <div className="card">
        <CounterClick label="Incr" updateCount={incrCount} />
        <CounterClick label="Decr" updateCount={decrCount} />
        <CounterClick label="Reset" updateCount={resetCount} />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
