import React, {useContext} from 'react';
import Image from '../images/image.jpg';
import {makeStyles} from '@material-ui/core';
import  {LogContext }from '../contexts/LogContext';


const useStyles = makeStyles (() => ({
  root: {
    color: '#5c2018',
    backgroundColor:'#f3e0dc',
    margin:'0',
    height:'100vh',
    padding:'0'
  },
  welcome:{
    height:'100vh',
    padding:'5'
  }
}));

const Welcome = () => {
  const classes = useStyles ();

  const {isLog} = useContext (LogContext);
  return (
    <div className={classes.root}>
      {isLog
        ? 
        <div className={classes.welcome}><h1>Welcome to Best Chicken & Fish Recipes!</h1>
        <img src={Image} alt="image"/></div>
        : <div><h2>Please Log In to Continue</h2></div>}
     
    </div>
  );
};

export default Welcome;
