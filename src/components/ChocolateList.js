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

//CONSTANTS
const ChocolateList = () => {
  const classes = useStyles()
  const [recipeList, setRecipeList] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState({title: ''})
  const baseURI="https://spoonacular.com/recipeImages/"
  const heroku = "https://quinn-node-server.herokuapp.com"


  

  //FUNCTIONS
  const handleChange = (event) =>{
    setSearchValue(event.target.value);
  }

  const handleClickDeleteOpen = (recipe) => {
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

  const handleClickAddOpen = () =>{
    setAddOpen(true)
    console.log("setAddOpen is true")
  }
 const handleCloseAdd = () =>{
   setAddOpen(false)
 }

 const handleAdd = async (values ) =>{
   console.log("called handleAdd")
   try{
     const result = await axios.post(`${heroku}/recipe`, {
  
       image:values.image,
      title:values.title,
      servings:values.servings,
      time:values.time
      
  
     });
     if(result.status === 200){
       recipeList.unshift(result)
       fetchRecipes()
       console.log("recipe successfully added")
     }
   }catch(err){
     console.log(err)
     console.log("recipe failed to add")
   }
 }


  const handleUpdate = async (values) =>{
    try{
      const result = await axios.put(`${heroku}/recipe/update`, {
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
    console.log(`this is the selectedRecipe._id ${selectedRecipe._id}`)
    try {
      console.log(`This is in try statement recipe_id ${selectedRecipe._id}`)
      await axios.delete(`${heroku}/recipe/delete`,{
        data:{ recipeId: selectedRecipe._id} 
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
      const recipes = await axios.get(`${heroku}/recipe`)
      setRecipeList(recipes.data)
      console.log(recipes.data)
      
    } catch (err) {
      console.error(err)
    }
  }

  const fetchCrowd = async () =>{
    try{
      const recipes = await axios.get(`/crowd`)
      setRecipeList(recipes.data)
      console.log(recipes.data)
    }catch(err){
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
        <IconButton aria-label="add recipe">
          <AddCircleIcon onClick={() => handleClickAddOpen()}/>
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
      {/*--this begins ADD RECIPE dialog ==*/}
      <Dialog
        open={addOpen}
        onClose={handleCloseAdd}
        aria-labelledby='add-dialog-title'
      >
        <Formik
          initialValues={{
            title: "Your Title Here",
            servings: 23,
           
            time: 23,
            
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string('Enter recipe title.').required(
              'Recipe title is required',
            ),
            servings: Yup.number('servings'),
            image: Yup.string('Image URL'),
            
            
            time:Yup.number('Time til ready')
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              await handleAdd(values)
              console.log("tried handleAdd")
              handleCloseAdd()
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
              <DialogTitle id='edit-dialog-title'>Add Recipe</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Add Your Recipe Below
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
                <TextField
                  id="image"
                  name="image"
                  label="Image URL"
                  type="text"
                  fullWidth
                  value={values.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.image && errors.image)}
                  helperText={touched.image && errors.image}
                />
               
                <Box className={classes.content}>
                  
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseAdd} color='primary'>
                  Cancel
                </Button>
                <Button type='submit' color='primary' >
                  Add
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
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
              console.log("called handleUpdate")
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
