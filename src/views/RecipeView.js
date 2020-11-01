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

import ChickenList from '../components/ChickenList';

const useStyles = makeStyles ({
  root: {
    width: '100%',
    display: 'inline-block',
    margin: '0 auto',
    alignContent: 'center',
  },
  media: {
    width: '200px',
    height: '200px',
    alignContent: 'center',
  },
});

const RecipeView = ({title, calories, image, servings}) => {
  const classes = useStyles ();

  const [showDialog, setShowDialog] = useState (false);
  const open = () => setShowDialog (true);
  const close = () => setShowDialog (false);

 

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
        <Button color="secondary" size="small" onClick={open}>
          Get Recipe (ingredients coming soon)
        </Button>
        <Dialog isOpen={showDialog} onDismiss={close}>

          <Box>
            <CardContent>
              <Typography variant="h5">{title}</Typography>
              <Typography variant="p" color="textSecondary">
                Whats upp
              </Typography>
              <br />
              <Typography variant="p" color="textSecondary">
                Whats upp
              </Typography>
            </CardContent>

            <Button
              className={classes.spacing}
              color="secondary"
              variant="outlined"
              onClick={close}
            >
              Close
            </Button>

          </Box>

        </Dialog>

      </CardActions>

    </CardContent>
  );
};

export default RecipeView;
