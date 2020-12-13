import React, {useContext} from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {makeStyles} from '@material-ui/core';
import { LogContext} from '../contexts/LogContext';
import Gallery from 'react-photo-gallery';

const useStyles = makeStyles (() => ({
  root: {
    color: '#5c2018',
    backgroundColor: '#f3e0dc',
    margin: '0',
    height: '100vh',
    paddingTop: 20,
    transition: "transform .10s ease-in-out"
  },
  welcome: {
    backgroundColor: '#f3e0dc',
    paddingTop:30,
  
  },
  gallery:{
    paddingTop:30,
    padding:6
  },
  galleryphoto:{
    color:'red',
    '&:hover':{
      transform: "scale(.5, .5, 1)"
    }
  }
}));

const photos = [
  {
    src: 'https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    alt: 'food',
    width: 0.5,
    height: 0.5,
  },
  {
    src: 'https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    width: 2,
    height: 1.5,
  },
  {
    src: 'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    width: 1,
    height: 1.8,
  },
  {
    src: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    width: 0.5,
    height: 0.5,
    padding: 2,
  },
];
const photos2 = [
  {
    src: 'https://images.pexels.com/photos/239581/pexels-photo-239581.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    width: 2,
    height: 1.5,
  },

  {
    src: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    width: 2,
    height: 1,
  },

  {
    src: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    width: 2,
    height: 1.5,
  },
];
const photos3 = [
  {
    src: 'https://images.pexels.com/photos/3636958/pexels-photo-3636958.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    width: 2,
    height: 2.4,
  },
  {
    src: 'https://images.pexels.com/photos/3679973/pexels-photo-3679973.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    height: 1,
    width: 0.75,
  },
  {
    src: 'https://images.pexels.com/photos/3662136/pexels-photo-3662136.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    height: 1.4,
    width: 1.4,
  },
  {
    src: 'https://images.pexels.com/photos/3026805/pexels-photo-3026805.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    height: 1.5,
    width: 1.5,
  },
];

const Welcome = () => {
  const classes = useStyles ();

  const {isLog} = useContext (LogContext);
  return (
    <div className={classes.root}>
      {isLog
        ? <div className={classes.welcome}>
            <h1>Welcome to Best Recipes</h1>
            <div className={classes.gallery}>
              <Gallery className={classes.galleryphoto}photos={photos} />
              <Gallery photos={photos2} />
              <Gallery photos={photos3} />
            </div>

          </div>
        : <div className={classes.welcome}>
            <h2>Please Log In to Continue</h2>
          </div>}

    </div>
  );
};

export default Welcome;
