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
      state.isGame = true
    },
    removePlayer(state) {
      state.name = ''
      state.level = ''
      state.timeStart = ''
    },
  },
})

export const { setPlayer, removePlayer } = gameSlice.actions
export const gameReducer = gameSlice.reducer
