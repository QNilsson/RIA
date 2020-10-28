import React, {useContext} from 'react';
import Image from '../images/image.jpg';
import {makeStyles} from '@material-ui/core';
import  {LogContext }from '../contexts/LogContext';

const useStyles = makeStyles (() => ({
  root: {
    color: 'red',
  },
}));

const Welcome = () => {
  const classes = useStyles ();

  const {isLog} = useContext (LogContext);
  return (
    <div className={classes.root}>
      {isLog
        ? <h1>Welcome to Best Chicken & Fish Recipes!</h1>
        : <h2>Please Log In to Continue</h2>}
     
    </div>
  );
};

export default Welcome;
