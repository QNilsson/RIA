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
  Input
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import { Formik } from 'formik';
import * as Yup from 'yup'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop:30,
    backgroundColor:'#f3e0dc'
    
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
  const [editOpen, setEditOpen] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState({title: ''})
  const baseURI="https://spoonacular.com/recipeImages/"
  //TODO
  //baseURI can go before image string to get acutal image

  const handleInput = (event) => {
    debounce(event.target.value)
  }

  const handleClickDeleteOpen = (recipe) => {
    console.log(recipe.recipe._id)
    console.log("above is recipe.recipe._id")
    setSelectedRecipe(recipe.recipe)
    console.log("This is SelectedRecipe")
    setDeleteOpen(true)
  }

  const handleCloseDelete = () => {
    setDeleteOpen(false)
  }

  const handleClickEditOpen = (recipe) =>{
    setSelectedRecipe(recipe.recipe)
    setEditOpen(true)
  }
  
  const handleCloseEdit = () =>{
    setEditOpen(false)
  }

  const handleUpdate = async (values) =>{
    try{
      const result = await axios.put(`http://localhost:5000/recipe/update`, {
        data:{
          recipeId:values.id,
          title:values.title,
          image:values.image,
          servings:values.servings,
          time:values.time
        },
      })
      if(result.status === 200){
        fetchRecipes()
        console.log("sucessfully updated")
      }
    }catch(err){
      console.log(err)
      console.log("fail")
    }
  }

  const handleDelete =  async () => {
    setDeleteOpen(false)
    console.log(selectedRecipe._id)
    console.log("below is selectedRecipe._id on react app")
    console.log(selectedRecipe._id)

    
    try {
      await axios.delete(`http://localhost:5000/recipe/delete`,{
        data: {
          recipeId: selectedRecipe._id
        }
      })
      fetchRecipes()
    } catch (err) {
      console.error(err)
      console.log(selectedRecipe._id)
      console.log("above is selectedRecipe._id in error")
      console.log("There was an error")
    }
  }

  const fetchRecipes = async () => {
    try {
      const recipes = await axios.get(`http://localhost:5000/recipe`)
      setRecipeList(recipes.data)
      
    } catch (err) {
      console.error(err)
    }
  }


  useEffect(() => {
    fetchRecipes()
  }, [])

  return (
    <>
      <form>
        <Input placeholder='Search' />
        <IconButton aria-label="search" >
          <SearchIcon/>
        </IconButton>
      </form>
      <Container className={classes.root}>
        {recipeList.map((recipe) => {
          return (
            <Card className={classes.card} key={recipe._id}>
              <CardMedia
                component='img'
                height='300'
                className={classes.media}
                image={baseURI + recipe.image}
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
                    Ready in: {recipe.time} minutes
                  </Typography>
                </Box>
              </CardContent>
              <CardActions>
                <IconButton aria-label='edit' onClick={() => handleClickEditOpen({recipe})}>
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
      <Dialog
        open={editOpen}
        onClose={handleCloseEdit}
        aria-labelledby='edit-dialog-title'
      >
        <Formik
          initialValues={{
            title: selectedRecipe?.title,
            servings: selectedRecipe?.servings,
            image: selectedRecipe?.image,
            time: selectedRecipe?.time,
            id:selectedRecipe?._id,
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string('Enter recipe title.').required(
              'Recipe title is required',
            ),
            servings: Yup.number('servings'),
            image: Yup.string('Image URL'),
            
            id: Yup.string('ID').required('ID is required.'),
            time:Yup.number('Time til ready')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              await handleUpdate(values)
              handleCloseEdit()
            } catch (err) {
              console.error(err)
              setStatus({ success: false })
              setErrors({ submit: err.message })
              setSubmitting(false)
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              noValidate
              autoComplete='off'
              onSubmit={handleSubmit}
              className={classes.dialogContent}
            >
              <DialogTitle id='edit-dialog-title'>Edit Recipe</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Make changes below to the data about this recipe:
                </DialogContentText>
                <TextField
                  autoFocus
                  id='title'
                  name='title'
                  label='Recipe Title'
                  type='text'
                  fullWidth
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                />
                <Box className={classes.content}>
                  <TextField
                    autoFocus
                    name='servings'
                    id='servings'
                    label='Servings'
                    type='number'
                    value={values.servings}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.servings && errors.servings)}
                    helperText={touched.servings && errors.servings}
                  />
                </Box>
                <TextField
                  autoFocus
                  id='time'
                  name='time'
                  label='Time til ready'
                  type='number'
                  fullWidth
                  value={values.time}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.time && errors.time)}
                  helperText={touched.time && errors.time}
                />
               
                <Box className={classes.content}>
                  
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEdit} color='primary'>
                  Cancel
                </Button>
                <Button type='submit' color='primary'>
                  Save
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
      <Dialog open={deleteOpen} onClose={handleCloseDelete}>
        <DialogTitle>Delete Recipe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this recipe?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDelete} color='primary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ChocolateList
