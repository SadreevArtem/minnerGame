export const REDUX_LS_KEY = 'REDUX_LS_KEY'

const initialState = {
  game: {
    name: '',
    level: '',
    timeStart: '',
    isGame: false
  },
  winners: []
}

export const getInitialState = () => {
  const stateLS = localStorage.getItem(REDUX_LS_KEY)
  return stateLS ? JSON.parse(stateLS) : initialState
}