import React from 'react';
import Image from '../images/image.jpg';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles (() => ({
  root: {
   color:'red'
  },
}));
const Welcome = () => {
  const classes = useStyles ();
  return (
    <div className={classes.root}>
      <h1>Welcome to Best Chicken & Fish Recipes!</h1>
      <h2>Please Log In to Continue</h2>
      <img src={Image} alt="fish chicken" />
    </div>
  );
};

export default Welcome;
