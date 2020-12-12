import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import RecipeView from '../views/RecipeView';
import {
  Card,
  makeStyles,
  FormControl,
  FormControlLabel,
  Slide,
  Switch,
} from '@material-ui/core';
import {Redirect} from 'react-router-dom';
import {LogContext} from '../contexts/LogContext';

const useStyles = makeStyles (() => ({
  root: {
    margin: 0,
    color: '#603f83ff',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    backgroundColor: '#f3e0dc',
  },
  head: {
    paddingTop: 10,
    paddingLeft: 50,
    paddingBottom: 10,
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

const ChickenList = () => {
  const classes = useStyles ();
  const apid = "c9f6666e";
  const apkey= "66d96ebe2ee152f28bed15343c6a769c";
  const APP_ID = process.env.REACT_APP_RECIPE_API_ID;
  const APP_KEY = process.env.REACT_APP_RECIPE_API_KEY;
  const [recipeData, setRecipeData] = useState ([]);
  const [checked, setChecked] = useState (false);
  const [lowCal, setLowCal] = useState (false);
  const url = `https://api.edamam.com/search?q=chicken&app_id=${apid}&app_key=${apkey}`;
  const {isLog} = useContext (LogContext);

  const handleChange = () => {
    setChecked (prev => !prev);
  };

  useEffect (() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get (url, {});

        console.log (response.data.hits);
        setRecipeData (response.data.hits);
      } catch (error) {
        console.log (error);
      }
    };
    fetchRecipes ();
  }, []);

  return isLog
    ? <div className={classes.root}>

        <div className={classes.head}>
          {' '}
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Show recipes"
          />
        </div>
        <div className={classes.main}>
          {recipeData.map ((recipe, key) => (
            <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
              <ul key={recipe.recipe.label} className={classes.ul}>
                <li className={classes.li}>
                  <Card className={classes.card}>
                    <RecipeView
                      title={recipe.recipe.label}
                      calories={recipe.recipe.calories}
                      ingredients={recipe.recipe.ingredients}
                      servings={recipe.recipe.yield}
                      image={recipe.recipe.image}
                    />
                  </Card>
                </li>
              </ul>
            </Slide>
          ))}

        </div>

      </div>
    : <Redirect to="/" />;
};

export default ChickenList;
