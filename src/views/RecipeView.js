import React from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  makeStyles
} from '@material-ui/core';


import ChickenList from '../components/ChickenList';

const useStyles = makeStyles ({
  root: {
    width: '100%',
  },
  media: {
    width: '150px',
    height: '150px',
  },
});

const RecipeView = ({title, calories, image}) => {
  const classes = useStyles ();

  return (
    <CardContent>
      <CardMedia className={classes.media} image={image} />
      <Typography gutterBottom variant="h5" component="h2">
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        {Math.ceil (calories) + ' calories'}
      </Typography>
    </CardContent>
  );
};

export default RecipeView;
