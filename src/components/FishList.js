import React, {useState, useEffect} from 'react';
import axios from 'axios';
import RecipeView from '../views/RecipeView';
import {Card, makeStyles, Button, FormControl} from '@material-ui/core';


const useStyles = makeStyles (() => ({
  root: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: '#C7D3D4FF',
    color: '#603f83ff',
  },
  media: {
    height: 40,
  },
  spacing: 8,
}));

const ChickenList = () => {
  const APP_ID = 'c9f6666e';
  const APP_KEY = '66d96ebe2ee152f28bed15343c6a769c';
  const classes = useStyles ();

  const [recipeData, setRecipeData] = useState ([]);

  useEffect (() => {
    const fetchRecipes = () => {
      axios
        .get (
          `https://api.edamam.com/search?q=fish&app_id=${APP_ID}&app_key=${APP_KEY}`,
          {}
        )
        .then (function (response) {
          console.log (response.data.hits);
          setRecipeData (response.data.hits)
        })
        .catch (function (error) {
          console.log (error);
        });
    };
    fetchRecipes ();
  }, []);

  return (
    <div className="app">
        {/* <FormControl className="search-form">
          <input className="search-bar" type="text" />
          <Button color='primary'className="search-button" type="submit">Search</Button>
        </FormControl> */}
		{recipeData.map(recipe =>(
			<RecipeView title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image}/>
		))}
      </div>
    
  );
};

export default ChickenList;
