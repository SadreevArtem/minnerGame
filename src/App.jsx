import { NavLink } from 'react-router-dom'
import './App.css'
import bombLogo from './resources/mine.svg'
import { NewGame } from './components/NewGame/NewGame'

function App() {
  return (
    <div className="App">
      <div className='wr d-flex flex-column h-100 justify-content-center align-items-center'>
        <h1 className='logo'>MINNER</h1>
        <img src={bombLogo} alt="bomb" />
        <NewGame />
        <NavLink to="leaders">
          <button type="button" className="btn my-3 btn-warning">Лидеры игры</button>
        </NavLink>
      </div>
    </div>
  )
}

export default App
