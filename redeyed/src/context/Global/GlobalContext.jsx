
  import React, { useReducer } from "react";

  
const initialState = {
  globalMessage: "",
  toastStatus: "success",
  isOpen: true,
  path: "",
  projectRow: null
};

export const GlobalContext = React.createContext(initialState);


/**
 * @typedef {Object} GlobalState
 * @property {string} globalMessage - Toast Message.
 * @property {"success"| "error" | "warning"} toastStatus - Toast State - "success" | "error" | "warning".
 * @property {boolean} isOpen 
 * @property {string} path
 * @property {any} projectRow
 */

/**
 * The Value of the Global State .
 * @param {GlobalState} initialState
 */


const reducer = ( state, action ) => {
  switch ( action.type ) {
    case "SNACKBAR":
      return {
        ...state,
        globalMessage: action.payload.message,
        toastStatus: action.payload.toastStatus
      };
    case "SETPATH":
      return {
        ...state,
        path: action.payload.path,
      };
    case "OPEN_SIDEBAR":
      return {
        ...state,
        isOpen: action.payload.isOpen,
      };
    case "SET_PROJECT_ROW":
      return {
        ...state,
        projectRow: action.payload,
      };

    default:
      return state;
  }
};

/**
* @param {"success"| "error" | "warning"} toastStatus
* @param {any} dispatch
* @param {string} message
* @param {number} timeout
 */

export const showToast = ( dispatch, message, timeout = 3000, toastStatus = "success" ) => {
  dispatch( {
    type: "SNACKBAR",
    payload: {
      message,
      toastStatus
    },
  } );

  setTimeout( () => {
    dispatch( {
      type: "SNACKBAR",
      payload: {
        message: "",
      },
    } );
  }, timeout );
};

export const setGlobalProjectRow = ( dispatch, data ) => {
  dispatch( {
    type: "SET_PROJECT_ROW",
    payload: data,
  } );

};


const GlobalProvider = ( { children } ) => {
  const [ state, dispatch ] = useReducer( reducer, initialState );
  // React.useEffect(() => {

  // }, []);

  return (
    <GlobalContext.Provider
      value={ {
        state,
        dispatch,
      } }
    >
      { children }
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

