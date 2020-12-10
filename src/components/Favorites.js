import React from 'react';
import {makeStyles, Card} from '@material-ui/core';
import RecipeView from '../views/RecipeView';



const useStyles = makeStyles (() => ({
  root: {
    color: '#5c2018',
    backgroundColor: '#f3e0dc',
    margin: '0',
    height: '100vh',
    paddingTop: 20,
  },
  main: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#f3e0dc',
  },
  spacing: 8,
  card: {
    borderColor: '#5c2018',
    alignContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
  },

  ul: {
    listStyleType: 'none',
  },
  li: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 280,

    margin: 10,
    textAlign: 'center',
  },
}));

const Favorites = ({faveArray}) => {
  const classes = useStyles ();
  return (
    <ul>
      <li className={classes.li}>
		  <h1>Hi</h1>
        {/* <Card className={classes.card}>
          <RecipeView faveArray={faveArray} />
        </Card> */}
      </li>
    </ul>
  );
};

export default Favorites;
