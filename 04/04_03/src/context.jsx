import { createContext, useContext, useReducer, useEffect } from "react";

export const DashboardContext = createContext();

const initialState = {
  message: '',
  items: ['Learn React', 'Build Dashboard', 'Optimize Performance'],
  count: 60,
  time: new Date().toLocaleTimeString(),
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_MESSAGE':
      return { ...state, message: action.payload };
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, state.message.trim()],
        message: '',
      };
    case 'TICK':
      return { ...state, count: state.count > 0 ? state.count - 1 : 0 };
    case 'UPDATE_TIME':
      return { ...state, time: new Date().toLocaleTimeString() };
    default:
      return state;
  }
}


function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Clock
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'UPDATE_TIME' });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (state.count > 0) {
      const interval = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state.count]);

  return (
    <DashboardContext value={{ state, dispatch }}>
      {children}
    </DashboardContext>
  );
}
export default DashboardProvider;

