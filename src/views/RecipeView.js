import React from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core';

import ChickenList from '../components/ChickenList';

const useStyles = makeStyles ({
  root: {
    width: '100%',
    display: 'inline-block',
    margin: '0 auto',
    alignContent:'center'
  },
  media: {
    width: '200px',
    height: '200px',
    alignContent: 'center',
  },
});

const RecipeView = ({title, calories, image, servings}) => {
  const classes = useStyles ();

  return (
    <CardContent className={classes.root}>
      <CardMedia className={classes.media} image={image} />
      <Typography gutterBottom variant="h5" component="h2">
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        {Math.ceil (calories) + ' calories'}
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">

        {servings} servings

      </Typography>
      <CardActions>
        <Button color="secondary" size="small" onClick={() => { alert('clicked')}}>Get Recipe</Button>
      </CardActions>

    </CardContent>
  );
};

export default RecipeView;
