import React from 'react';
import { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
export const Context = createContext({
  isAuth: false,
  setIsAuth: () => {},
  isAuthAdmin: false,
  setIsAuthAdmin: () => {},
  user: {},
  setUser: () => {},

});

const AppWrapper = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthAdmin, setIsAuthAdmin] = useState(false);
  const [user, setUser]  =  useState({});

  return (
    <Context.Provider value ={{ isAuth, setIsAuth, isAuthAdmin, setIsAuthAdmin, user, setUser}}>
      <App />

    </Context.Provider>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);