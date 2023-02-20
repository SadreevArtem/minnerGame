import { createSlice } from '@reduxjs/toolkit'
import { getInitialState } from '../../initState'

const winnerSlice = createSlice({
  name: 'winners',
  initialState: getInitialState().winners,
  reducers: {
    addWinner(state, action) {
      return [...state, action.payload]
    }
    },
  },
)

export const { addWinner } = winnerSlice.actions
export const winnerReducer = winnerSlice.reducer
