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
  Typography,
  CardMedia,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import {Redirect} from 'react-router-dom';
import {LogContext} from '../contexts/LogContext';
import SearchIcon from '@material-ui/icons/Search'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'


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
  content:{
    display:'flex',
    justifyContent:'space-evenly'
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
 
  const [recipeList, setRecipeList] =useState([])
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const { isLog } = useContext (LogContext);

  const handleChange = () => {
    setChecked (prev => !prev);
  };

  const handleClickDeleteOpen = (recipe) =>{
    setSelectedRecipe(recipe.recipe)
    setDeleteOpen(true)
  }

  const handleCloseDelete = () =>{
    setDeleteOpen(false)
  }

  const handleDelete = async ( )=>{
    setDeleteOpen(false)
    console.log(selectedRecipe.label)
    try{
      await axios.delete(`http://localhost:5000/recipe/delete`, {
        data:{
          recipeLabel: selectedRecipe.label
        }
      })
      fetchRecipes()
    }catch(err){
      console.log(err)
    }
  }
  
  const fetchRecipes = async () =>{
    try{
      const recipes = await axios.get(`http://localhost:5000/recipe`)
      setRecipeList(recipes.data)
      console.log(recipes.data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() =>{
    fetchRecipes()
  },[])
  // useEffect (() => {
  //   const fetchRecipes = async () => {
  //     try {
  //       const response = await axios.get (`https://api.edamam.com/search?q=chicken&app_id=${apid}&app_key=${apkey}&to=30`, {
  //         headers:{
  //           // 'Content-Type': 'application/json'
  //           "Access-Control-Allow-Orign": "*",
  //           'Content-Type':'application/json'
            
  //           // "Access-Control-Allow-Headers": "Origin",
            
  //         } 
  //       });

  //       console.log (response.data.hits);
  //       setRecipeData (response.data.hits);
  //     } catch (error) {
  //       console.log ("error with function");
  //     }
  //   };
  //   fetchRecipes ();
  // }, []);

  return (
    isLog ? 
    <div className={classes.root}>

        <div className={classes.head}>
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label="Show recipes"
          />
        </div>
        <div className={classes.main}>
          {recipeList.map ((recipe, key) => (
            <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
              <ul key={recipe.recipe.label} className={classes.ul}>
                <li className={classes.li}>
                  <Card className={classes.card} key={recipe.label}>
                    <CardMedia
                    component='img'
                    height='300'
                    className={classes.media}
                    image={recipe.image}
                    title={recipe.title}></CardMedia>
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='h2'>{recipe.title}</Typography>
                      <Box className={classes.content}>
                        <Typography variant="subtitle1" color='textSecondary'>Calores: {recipe.calories}</Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <IconButton aria-label='edit'><EditIcon /></IconButton>
                      <IconButton aria-label="delete"><DeleteIcon/></IconButton>
                    </CardActions>
                  </Card>
                  {/* <Card className={classes.card}>
                    <RecipeView
                      title={recipe.recipe.label}
                      calories={recipe.recipe.calories}
                      ingredients={recipe.recipe.ingredients}
                      servings={recipe.recipe.yield}
                      image={recipe.recipe.image}
                      source={recipe.recipe.source}
                      carbs={recipe.recipe.totalNutrients}
                    />
                  </Card> */}
                  
                </li>
              </ul>
              <Dialog open={deleteOpen} onClose={handleCloseDelete}>
                <DialogTitle>Delete Recipe</DialogTitle>
                <DialogContent>
                  <DialogContentText>Are you sure you want to delete?</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDelete}>Cancel</Button>
                  <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
              </Dialog>
            </Slide>
          ))}

        </div>

      </div>
    : <Redirect to="/" />
  );
};

export default ChickenList;
