import React, {useState, useEffect, Fragment} from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Box,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Fade from 'react-reveal/Fade';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Dialog, DialogOverlay, DialogContent} from '@reach/dialog';
import '@reach/dialog/styles.css';
import IngredientView from './IngredientsView';

const useStyles = makeStyles ({
  root: {
    width: '100%',
    display: 'inline-block',
    alignContent: 'center',
    margin: 'auto',
    textAlign: 'left',
  },
  media: {
    width: 250,
    height: 250,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  buttonColor: {primary: 'grey', secondary: 'pink'},
});

const RecipeView = ({title, calories, image, servings, ingredients, source}) => {
  const classes = useStyles ();
  const [showDialog, setShowDialog] = useState (false);
  const [favorited, setFavorite] = useState ();
  const faveArray = [];

  const open = () => setShowDialog (true);
  const close = () => setShowDialog (false);

  const add = value => {
    faveArray.push (value);
  };
  const handleLog = () => {
    if (favorited) {
      console.log ('UnFavorited');
      setFavorite (false);
      return;
    }
    if (!favorited) {
      console.log ('favorited');
      setFavorite (true);

      return;

      setFavorite (false);
    }
  };

  return (
    <CardContent className={classes.root}>
      <CardMedia className={classes.media} image={image} />
      <div className={classes.content}>
        <Typography gutterBottom variant="h6" component="h5">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {Math.ceil (calories) + ' calories'}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">

          {servings} servings

        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">

          source: {source} 

        </Typography>
      </div>
      <CardActions>
        <Button color="secondary" size="small" onClick={open}>
          Ingredients List
        </Button>
        {/* () =>setFavorite(true), */}
        <IconButton onClick={handleLog}>

          {favorited ? <FavoriteIcon /> : <FavoriteBorder />}
        </IconButton>

        <Dialog isOpen={showDialog} onDismiss={close}>
          <Fragment>
            <Fade bottom>
              {
                <Box>
                  {ingredients.map (ingredient => {
                    <CardContent elevation={4}>
                      <Typography variant="h5">{title}</Typography>
                      <Typography variant="p" color="textSecondary">
                        {ingredient.text}
                      </Typography>
                      <br />
                      <Typography variant="p" color="textSecondary">
                        {ingredient.weight}
                      </Typography>

                    </CardContent>;
                  })}

                  <IngredientView ingredients={ingredients} />
                  <Button
                    className={classes.spacing}
                    color="secondary"
                    variant="outlined"
                    onClick={close}
                  >
                    Close
                  </Button>

                </Box>
              }{' '}
            </Fade>
          </Fragment>

        </Dialog>

      </CardActions>

    </CardContent>
  );
};

export default RecipeView;
