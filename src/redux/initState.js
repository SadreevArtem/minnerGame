export const REDUX_LS_KEY = "REDUX_LS_KEY";

const initialState = {
  game: {
    name: "",
    level: "",
    timeStart: "",
    timeWin: "",
  },
  winners: [
    { name: "Bob", 
      level: 8, 
      time: 80 
    },
    {
      name: "Ivan",
      level: 8,
      time: 85,
    },
    {
      name: "Boris",
      level: 16,
      time: 99,
    },
    {
      name: "Lena",
      level: 16,
      time: 102,
    },
  ],
};

export const getInitialState = () => {
  const stateLS = localStorage.getItem(REDUX_LS_KEY);
  return stateLS ? JSON.parse(stateLS) : initialState;
};
