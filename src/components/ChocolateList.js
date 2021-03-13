import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as dotenv from 'dotenv';
import {
  Container,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  TextField,
  IconButton,
  makeStyles,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop:30,
    
  },
  form:{
    paddingTop:30,
    fontSize:28
  },
  card: {
    width: 345,
    margin: 20,
  },
  content: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}))

const ChocolateList = () => {
  const classes = useStyles()
  const [recipeList, setRecipeList] = useState([])
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  const handleClickDeleteOpen = (recipe) => {
    //console.log(movie.movie._id)
    setSelectedRecipe(recipe.recipe)
    setDeleteOpen(true)
  }

  const handleCloseDelete = () => {
    setDeleteOpen(false)
  }

  const handleDelete =  async () => {
    setDeleteOpen(false)
    console.log(selectedRecipe._id)
    try {
      await axios.delete(`http://localhost:5000/recipe/delete`, {
        data: {
          recipeId: selectedRecipe._id
        }
      })
      fetchRecipes()
    } catch (err) {
      console.error(err)
    }
  }

  const fetchRecipes = async () => {
    try {
      const recipes = await axios.get(`http://localhost:5000/recipe`)
      setRecipeList(recipes.data)
      console.log(recipes.data)
    } catch (err) {
      console.error(err)
    }
  }


  useEffect(() => {
    fetchRecipes()
  }, [])

  return (
    <>
      <form className={classes.form}>
        <TextField placeholder='Search' />
        <IconButton aria-label='search'>
          <SearchIcon />
        </IconButton>
        <IconButton aria-label='add recipe'>
      <AddCircleIcon/>
        </IconButton>
      </form>
      <Container className={classes.root}>
        This is chocolate list
        {recipeList.map((recipe) => {
          return (
            <Card className={classes.card} key={recipe._id}>
              <CardMedia
                component='img'
                height='300'
                className={classes.media}
                image={recipe.image}
                title={recipe.title}
              ></CardMedia>
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  {recipe.title}
                </Typography>
                <Box className={classes.content}>
                  <Typography variant='subtitle1' color='textSecondary'>
                    Servings: {recipe.servings}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    Time to make: {recipe.time}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <IconButton aria-label='edit'>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label='delete' onClick={() => handleClickDeleteOpen({recipe})}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          )
        })}
      </Container>
      <Dialog open={deleteOpen} onClose={handleCloseDelete}>
        <DialogTitle>Delete Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this recipe?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ChocolateList
