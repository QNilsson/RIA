import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as dotenv from 'dotenv';
import { useQuery, useMutation, gql } from '@apollo/client';
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Input,
  Link
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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
  accordion:{
    display:'flex',
    flexWrap:'wrap',
    justifyContent:'flex-start',
    
  }
}))

const GqlList = () => {
  const classes = useStyles()
  
  const [searchValue, setSearchValue] = useState("")
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState({title: ''})
  // const baseURI="https://spoonacular.com/recipeImages/"
  


  
    //GQL MUTATIONS
    const ALL_RECIPES = gql`
    query{
      allRecipes{
        id
        title
        servings
        readyInMinutes
        image
        sourceUrl
      }
    }
    
    `

    const UPDATE_RECIPE = gql`
    mutation updateRecipe ($id: Int!, $title: String!, $readyInMinutes: Int!, $servings:Int!, $sourceUrl: String, $image:String! ){
    updateRecipe(id: $id,
      data:{
        title:$title,
        servings: $servings,
        readyInMinutes: $readyInMinutes,
        image: $image,
        sourceUrl: $sourceUrl
      }
      ){
        id
      }
    }
    `

    const CREATE_RECIPE = gql`
    mutation createRecipe ($id:Int!, $title:String!, $readyInMinutes: Int!, $servings:Int!, $sourceUrl: String, $image:String!){
      createRecipe(
        data: RecipeCreateInput
      ){
        id
        
      }
    }

    `

    const DELETE_RECIPE = gql`
    mutation deleteRecipe($id: Int!){
      deleteRecipe(id:$id){
        id
      }
    }

    `


  const { loading, error, data} = useQuery(ALL_RECIPES)
  const [updateRecipe] = useMutation(UPDATE_RECIPE)
  const [deleteRecipe] = useMutation(DELETE_RECIPE)
  const [createRecipe] = useMutation(CREATE_RECIPE)

  if(loading){
    return(
      <Container className={classes.root}>
        <Typography className={classes.messages}>Loading your recipes...</Typography>
      </Container>
    )
  }

  if(error){
    return(
      <Typography className={classes.messages}>{`${error.message}`}</Typography>
    )
  }

  const recipeList = data.allRecipes


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



  const handleUpdate = async (values) =>{
    try{
      updateRecipe({
      variables:{
        id: selectedRecipe.id,
        title: values.title,
        readyInMinutes: values.readyInMinutes,
        servings: values.servings,
        image: values.image,
        sourceUrl: values.sourceUrl
      }
    })}catch(err){
      console.log(err)
    }
    
  }

  const handleAdd = async (values) =>{
    createRecipe({
      variables:{
        id: values.id,
        title: values.title,
        readyInMinutes: values.readyInMinutes,
        servings: values.servings,
        image: values.image,
        sourceUrl: values.sourceUrl
      }
    })
  }

  const handleDelete =  async () => {
   setDeleteOpen(false)
   console.log(selectedRecipe.id)
   try{
     deleteRecipe({variables: { id:selectedRecipe.id}})
     console.log(`${selectedRecipe.title}` + " deleted")
     return recipeList
   }catch(err){
     console.error(err)
   }
  }



  return (
    <>
      <form>
        
        <IconButton aria-label="add recipe">
          <AddCircleIcon onClick={() => handleClickAddOpen()}/>
        </IconButton>
        
      </form>
      <Container className={classes.root}>
        {recipeList.map((recipe) => {
          return (
            <Card className={classes.card} key={recipe.id}>
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
                    Ready in: {recipe.readyInMinutes} minutes
                  </Typography>
                </Box>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Source</Typography>
                  </AccordionSummary>
                  <AccordionDetails flexWrap='wrap'>
                    <Typography flexWrap="wrap" variant='body2' color='textSecondary'>
                     {recipe.sourceUrl}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
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
            servings: 0,            
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string('Enter recipe title.').required(
              'Recipe title is required',
            ),
            servings: Yup.number('servings'),
            image: Yup.string('Image URL'),
            sourceUrl:Yup.string('Source URL here'),
            readyInMinutes:Yup.number('Time til ready'),
            id:Yup.number('Recipe ID here')
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
                  id='readyInMinutes'
                  name='time'
                  label='Time til ready'
                  type='number'
                  fullWidth
                  value={values.readyInMinutes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.readyInMinutes && errors.readyInMinutes)}
                  helperText={touched.readyInMinutes && errors.readyInMinutes}
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
                 <TextField
                  autoFocus
                  id='source'
                  name='sourceUrl'
                  label='Source URL'
                  type='text'
                  fullWidth
                  value={values.sourceUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.sourceUrl && errors.sourceUrl)}
                  helperText={touched.sourceUrl && errors.sourceUrl}
                />
                <TextField
                  autoFocus
                  id='id'
                  name='id'
                  label='Recipe ID'
                  type='number'
                  fullWidth
                  value={values.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.id && errors.id)}
                  helperText={touched.id && errors.id}
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
            sourceUrl: selectedRecipe?.sourceUrl,
            readyInMinutes: selectedRecipe?.readyInMinutes,
            
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string('Enter recipe title.').required(
              'Recipe title is required',
            ),
            servings: Yup.number('servings'),
            image: Yup.string('Image URL'),
            
           sourceUrl: Yup.string('Source Url'),
            readyInMinutes:Yup.number('Time til ready')
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
                  id='readyInMinutes'
                  name='readyInMinutes'
                  label='Time til ready'
                  type='number'
                  fullWidth
                  value={values.readyInMinutes}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.readyInMinutes && errors.readyInMinutes)}
                  helperText={touched.readyInMinutes && errors.readyInMinutes}
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
                 <TextField
                  autoFocus
                  id='source'
                  name='sourceUrl'
                  label='Source URL'
                  type='text'
                  fullWidth
                  value={values.sourceUrl}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.sourceUrl && errors.sourceUrl)}
                  helperText={touched.sourceUrl && errors.sourceUrl}
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
            Are you sure you want to delete this recipe {selectedRecipe.title}?
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

export default GqlList