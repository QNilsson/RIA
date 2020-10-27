import React, { useContext } from 'react'
import { Box, Dialog, TextField, Button, makeStyles } from '@material-ui/core';
import { Formik } from 'formik'
import * as Yup from 'yup';
import { LogContext } from '../contexts/LogContext'

const useStyles = makeStyles(() => ({
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 300,
    minWidth: 400,
    padding: 20,
  },
}))

const Login = (props) => {
  const classes = useStyles()
  const { open, onClose } = props

  const logContext = useContext(LogContext)

  const handleClose = () => {
    onClose(false)
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='Login Dialog'>
      <Formik
      initialValues={{
        email:'email@example.com',
        submit:null,
      }}
      validationScheme={Yup.object().shape({
        email:Yup.string()
        .email('Must be a valid email')
        .max(50)
        .required('Email is required'),
        user: Yup.string()
        .min(4, 'Username needs mininum of 4 letters')
        .max(16, 'Max username length is 16 letters')
        .required('UserName is required'),
        password: Yup.string()
        .min(8, 'Password is too short')
        .max(50, 'Password is too long')
        .required('Password is required'),

      })}
      onSubmit={ (values, {setErrors, setStatus, setSubmitting}) =>{
        try{
          logContext.login()
          console.log(values.email, values.password, values.user)
          handleClose()
        }catch(err){
          console.log(err)
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
        }) =>(
          <form noValidate autoComplete='off' onSubmit={handleSubmit} className={classes.dialogContent}>
            <h2>Sign In</h2>
            <TextField 
              autofocus
             label='User Name'
             type='text'
             name='username'
             variant='filled'
             margin='normal'
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.user}
             error={Boolean(touched.user && errors.user)}
             helperText={touched.user && errors.user}
             requiredfullWidth/>
             <TextField
             label='Email Address'
             type='email'
             name='email'
             variant='filled'
             margin='normal'
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
             error={Boolean(touched.email && errors.email)}
             helperText={touched.email && errors.email}
             required
             fullWidth
             />
             <TextField
             label='Password'
             type='password'
             variant='filled'
             margin='normal'
             placeholder='&*#$(%#'
             value={values.password}
             onChange={handleChange}
             onBlur={handleBlur}
             error={Boolean(touched.password && errors.password)}
             helperText={touched.password && errors.password}
             required
             fullWidth
             />

            <Box>
              <Button color='primary' variant='contained' onClick={handleClose}>Cancel</Button>
              <Button color='primary' variant='contained' type='submit' disabled={Boolean(errors.email || errors.password || errors.user)}>Login</Button>
            </Box>
          </form>
        )}
      </Formik>
      
    </Dialog>
  )
}

export default Login