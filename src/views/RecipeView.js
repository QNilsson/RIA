import React, {useState, useEffect, Fragment} from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  Box,
  Button,
  Typography,
  Modal,
  makeStyles,
  AccordionActions,
} from '@material-ui/core';
import clsx from 'clsx';
import Fade from 'react-reveal/Fade';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Dialog, DialogOverlay, DialogContent} from '@reach/dialog';
import '@reach/dialog/styles.css';
import IngredientView from './IngredientsView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles ((theme) => ({
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
  expand:{
    transform: 'rotage(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen:{
    transform: 'rotate(180deg)'
  },
  buttonColor: {primary: 'grey', secondary: 'pink'},
}));

const RecipeView = ({
  title,
  calories,
  image,
  servings,
  ingredients,
  source,
  carbs,
}) => {
  const classes = useStyles ();
  const [showDialog, setShowDialog] = useState (false);
  const [favorited, setFavorite] = useState ();
  const [expanded, setExpanded] = useState(false);

  //ingredients
  const open = () => setShowDialog (true);
  const close = () => setShowDialog (false);
 
  const handleExpandClick = () =>{
    setExpanded(!expanded);
  }
  
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

      <IconButton className={clsx(classes.expand, {[classes.expandOpen]: expanded,})}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more">
          <ExpandMoreIcon/>
        </IconButton>
        <Collapse in={expanded} timeout ="auto" unmountOnExit>
          <Typography paragraph>Nutrient Info:</Typography>
          <Typography paragraph>
          {carbs.CA.label}: {carbs.CA.quantity.toFixed(0)}{carbs.CA.unit}<hr></hr>
          {carbs.CHOCDF.label}: {carbs.CHOCDF.quantity.toFixed(0)}{carbs.CHOCDF.unit}<hr></hr>
          {carbs.CHOLE.label}: {carbs.CHOLE.quantity.toFixed(0)}{carbs.CHOLE.unit}<hr></hr>
          {carbs.FAT.label}: {carbs.FAT.quantity.toFixed(0)}{carbs.FAT.unit}<hr></hr>
          {carbs.SUGAR.label}:{carbs.SUGAR.quantity.toFixed(0)}{carbs.SUGAR.unit}
          </Typography>
        </Collapse>

    

    </CardContent>
  );
};

export default RecipeView;
