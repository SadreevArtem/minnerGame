import { configureStore } from '@reduxjs/toolkit'
import { REDUX_LS_KEY } from './initState'
import { gameReducer } from './slices/gameSlices/gameSlices'
import { winnerReducer } from './slices/winnersSlices/winnerSlice'


export const store = configureStore({
  reducer: {
    game: gameReducer,
    winners: winnerReducer,
  },
})

store.subscribe(() => {
  localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()))
})
