import {ExploreOff} from '@material-ui/icons';
import React, {useState, createContext} from 'react';

export const LogContext = createContext ({
  isLog: false,
  login: () => {},
  logout: () => {},
});

const LogContextProvider = props => {
  //initially set is logged in to false
  const [isLogged, setIsLogged] = useState (false);

  const loginHandler = () => {
    //when login button is pushed
    setIsLogged (true);
  };
  const logoutHandler = () => {
    //when logout button is pushed
    setIsLogged (false);
  };

  return (
    <LogContext.Provider
      value={{
        login: loginHandler,
        logout: logoutHandler,
        isLog: isLogged,
      }}
    >
      {props.children}
    </LogContext.Provider>
  );
};

export default LogContextProvider;