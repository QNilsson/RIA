import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import RecipeView from '../views/RecipeView';
import {Card, makeStyles, FormControl, FormControlLabel, Slide, Switch} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { LogContext} from '../contexts/LogContext';
import { Login } from '../components/Login';


const useStyles = makeStyles (() => ({
  root: {
    margin:0,
    color: '#603f83ff',
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'flex-start',
    overflow:'hidden',
    backgroundColor:'#f3e0dc',
   
  },
  head:{
   paddingTop: 10,
   paddingLeft:50,
   paddingBottom:10

  },
  main:{
    display:'flex',
    flexWrap:'wrap',
   
  },
  spacing: 8,
  card:{
    borderColor:'#5c2018',
    maxWidth:400,
    maxHeight:400,
    alignContent:'center'
  },

  ul:{
   
    listStyleType:'none',
    
  },
  li:{
    width:280,
    margin:10,
    textAlign:'center'
  }

}));



const ChickenList = () => {
  const APP_ID = 'c9f6666e';
  const APP_KEY = '66d96ebe2ee152f28bed15343c6a769c';
  const classes = useStyles ();

  const [recipeData, setRecipeData] = useState ([]);
  const [checked, setChecked] = useState(false);

  const { isLog } = useContext(LogContext)

  const handleChange = () =>{
    setChecked((prev) => !prev);
  }
  

  useEffect (() => {
    const fetchRecipes = () => {
      axios
        .get (
          `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`,
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
    isLog ?
    <div className={classes.root}>
        {/* <FormControl className="search-form">
          <input className="search-bar" type="text" />
          <Button color='primary'className="search-button" type="submit">Search</Button>
        </FormControl> */}
        <div className={classes.head}> <FormControlLabel control={<Switch checked={checked} onChange={handleChange}/>}
      label="Show recipes"/></div>
     <div className={classes.main}>
  {recipeData.map(recipe =>(
     <Slide direction="up" in={checked}mountOnEnter unmountOnExit>
      <ul elevation={4} className={classes.ul}>
      <li className={classes.li}>
      <Card className={classes.card}>
			<RecipeView title={recipe.recipe.label} calories={recipe.recipe.calories} ingredients={recipe.recipe.ingredients} servings={recipe.recipe.yield} image={recipe.recipe.image}/>
      </Card>
      </li>
      </ul>
       </Slide> 
	
     
     
		))}
    </div>
  
      </div>
      : <Redirect to="/"/>
    
  );
};

export default ChickenList;
