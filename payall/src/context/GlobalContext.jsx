
import React, { useReducer } from "react";


const initialState = {
  childAddress: "",
};

export const GlobalContext = React.createContext(initialState);


const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CHILD_ADDRESS":
      return {
        ...state,
        childAddress: action.payload.childAddress,
      };
    default:
      return state;
  }
};


const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

