import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  //currentUser: null, //since in the beginning we will have null users

  //Now this time it will read user from our local storage 
  //so we will have to transform it into an object
  //so make use of parse
  //and if no user then just return null

  currentUser: JSON.parse(localStorage.getItem("user")) || null,

};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  //so whenever i am going to change my currentuser i will assign it to local storage
  //so now when we refresh our page it's not going to be null anymore
  //it will read user from our local Storage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  },[state.currentUser])

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};