import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../initState'

const gameSlice = createSlice({
  name: 'game',
  initialState: getInitialState().game,
  reducers: {
    setPlayer(state, action) {
      state.name = `${action.payload.name}`
      state.level = `${action.payload.level}`
      state.timeStart = `${Date.now()}`
    },
    refreshTimer(state){
      return {
        ...state,
        timeStart: `${Date.now()}`
      }
    },
    setTimeWin(state){
      return {
        ...state,
        timeWin: `${Date.now()}`
      }
    },
    removePlayer(state) {
      state.name = ''
      state.level = ''
      state.timeStart = ''
      state.timeWin = ''
    },
  },
})

export const { setPlayer, removePlayer, refreshTimer, setTimeWin } = gameSlice.actions
export const gameReducer = gameSlice.reducer
