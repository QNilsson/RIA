import React, {useState, useEffect} from 'react';
import axios from 'axios';
import RecipeView from '../views/RecipeView';
import {Card, makeStyles, Button, FormControl} from '@material-ui/core';


const useStyles = makeStyles (() => ({
  root: {
    margin:10,
    
    color: '#603f83ff',
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'flex-start',
    overflow:'hidden',
   
  },

  spacing: 8,
  card:{
    backgroundColor:'lightblue',
  },

  ul:{
    // maxWidth:1200,
    listStyleType:'none',
    // display:'flex'
    // margin:'0 auto',
    // flexDirection:'row',
    // flexWrap:'wrap',
    // justifyContent:'space-around'
  },
  li:{
    width:400,
    margin:10
  }

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
    <div className={classes.root}>
        {/* <FormControl className="search-form">
          <input className="search-bar" type="text" />
          <Button color='primary'className="search-button" type="submit">Search</Button>
        </FormControl> */}
		{recipeData.map(recipe =>(
      <ul className={classes.ul}>
      <li className={classes.li}>
      <Card className={classes.card}>
			<RecipeView title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image}/>
      </Card>
      </li>
      </ul>
		))}
      </div>
    
  );
};

export default ChickenList;
