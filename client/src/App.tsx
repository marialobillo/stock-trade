
import './App.css'
import { isSetup } from './helpers/authHelpers'

function App() {


  const handleClick = () => {
    isSetup();
    console.log('click me now!!');
  }
  return (
    <>
      <h2>Hello Stock trade app</h2>
      <button onClick={handleClick}>click me!</button>
    </>
  )
}

export default App
