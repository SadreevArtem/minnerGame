import { configureStore } from '@reduxjs/toolkit'
import { REDUX_LS_KEY } from './initState'
import { gameReducer } from './slices/gameSlices/gameSlices'


export const store = configureStore({
  reducer: {
    game: gameReducer
    // winners: winnersReducer,
  },
})

store.subscribe(() => {
  localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()))
})
