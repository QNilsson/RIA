import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import RecipeView from '../views/RecipeView';
import {
  Card,
  makeStyles,
  Button,
  FormControl,
  Fade,
  FormControlLabel,
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

const ChocolateList = () => {
  const apid = 'c9f6666e';
  const apkey = '66d96ebe2ee152f28bed15343c6a769c';
  const APP_ID = process.env.REACT_APP_RECIPE_API_ID;
  const APP_KEY = process.env.REACT_APP_RECIPE_API_KEY;
  const classes = useStyles ();

  const [recipeData, setRecipeData] = useState ([]);
  const [checked, setChecked] = useState (false);

  const {isLog} = useContext (LogContext);

  const handleChange = () => {
    setChecked (prev => !prev);
  };

  useEffect (() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get (
          `https://api.edamam.com/search?q=chocolate&app_id=${apid}&app_key=${apkey}`,
          {
            headers: {
              // 'Content-Type': 'application/json'
              'Access-Control-Allow-Orign': '*',
              'Content-Type': 'application/json',

              // "Access-Control-Allow-Headers": "Origin",
            },
          }
        );

        console.log (response.data.hits);
        setRecipeData (response.data.hits);
      } catch (error) {
        console.log ('error with function');
      }
    };
    fetchRecipes ();
  }, []);

  return isLog
    ? <div className={classes.root}>
        {/* <FormControl className="search-form">
          <input className="search-bar" type="text" />
          <Button color='primary'className="search-button" type="submit">Search</Button>
        </FormControl> */}
        <div className={classes.head}>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Show Recipes"
          />
          {' '}
        </div>
        <div className={classes.main}>
          {recipeData.map (recipe => (
            <Fade in={checked}>
              <ul elevation={4} className={classes.ul}>
                <li className={classes.li}>
                  <Card className={classes.card}>
                    <RecipeView
                      title={recipe.recipe.label}
                      ingredients={recipe.recipe.ingredients}
                      calories={recipe.recipe.calories}
                      servings={recipe.recipe.yield}
                      image={recipe.recipe.image}
                      source={recipe.recipe.source}
                      carbs={recipe.recipe.totalNutrients}
                    />
                  </Card>
                </li>
              </ul>
            </Fade>
          ))}
        </div>
      </div>
    : <Redirect to="/" />;
};

export default ChocolateList;
