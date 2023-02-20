import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import App from './App'
import { Game } from './components/Game/Game'
import { Leaders } from './components/Leaders/Leaders'
import { NotFound } from './components/NotFound/NotFound'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const router = createBrowserRouter([
  {
    path: "https://gitname.github.io/minnerGame/",
    element: <App />,
  },
  {
    path: "https://gitname.github.io/minnerGame/game",
    element: <Game />,
  },
  {
    path: "https://gitname.github.io/minnerGame/leaders",
    element: <Leaders />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)


