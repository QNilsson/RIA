import React, {useState} from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Box,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {Dialog, DialogOverlay, DialogContent} from '@reach/dialog';
import '@reach/dialog/styles.css';
import IngredientView from './IngredientsView';




const useStyles = makeStyles ({
  root: {
   width:'100%',
   display:'inline-block',
   alignContent:'center',
   margin:'auto',
   textAlign:'left'
  
  },
  media: {
    width:250,
    height:250,

  },
  content:{
    display:'flex',
    flexDirection:'column',
    flexWrap:'wrap'
    
  }
});

const RecipeView = ({title, calories, image, servings, ingredients}) => {
  const classes = useStyles ();

  const [showDialog, setShowDialog] = useState (false);
  const open = () => setShowDialog (true);
  const close = () => setShowDialog (false);

 

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
      </div>
      <CardActions>
        <Button color="secondary" size="small" onClick={open}>
          Ingredients List
        </Button>
        <Dialog isOpen={showDialog} onDismiss={close}>
    
          {<Box>
            {ingredients.map(ingredient => {
              
              <CardContent>
              <Typography variant="h5">{title}</Typography>
              <Typography variant="p" color="textSecondary">
               {ingredient.text}
              </Typography>
              <br />
              <Typography variant="p" color="textSecondary">
                {ingredient.weight}
              </Typography>
            </CardContent>
            })}
            
            <IngredientView ingredients={ingredients}/>
            <Button
              className={classes.spacing}
              color="secondary"
              variant="outlined"
              onClick={close}
            >
              Close
            </Button>

          </Box> }

        </Dialog>
        

      </CardActions>

    </CardContent>
  );
};

export default RecipeView;
