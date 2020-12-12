import React, {useContext} from 'react';
import {Box, Dialog, TextField, Button, makeStyles} from '@material-ui/core';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {AuthContext} from '../contexts/AuthContext';

const useStyles = makeStyles (() => ({
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 300,
    minWidth: 400,
    padding: 20,
  },
  spacing: {
    margin: '1rem',
  },
}));

const Login = props => {
  const classes = useStyles ();
  const {open, onClose} = props;

  const authContext = useContext (AuthContext);
  const {signInWithGoogle, signInWithEmailAndPassword } = authContext;

  const handleGoogleClick = async () => {
    try {
       await signInWithGoogle();
      console.log("you clicked google button")
      handleClose ();
    } catch (error) {
      console.error (error);
    }
  }

  const handleClose = () => {
    onClose (false);
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="Login Dialog">
      <Button
        className={classes.googleButton}
        fullWidth
        onClick={handleGoogleClick}
        size="large"
        variant="contained"
      >
        <img
          alt="Google"
          classname={classes.provider}
          src="/static/images/google.svg"
        />
      </Button>
      <Formik
        initialValues={{
          user: '',
          email: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object ().shape ({
          user: Yup.string ()
            .min (4, 'Minimum of 4 characters')
            .max (16, 'Max of 15 characters')
            .required ('UserName is required'),
          email: Yup.string ()
            .email ('Must be a valid email')
            .max (50)
            .required ('Email is required'),
          password: Yup.string ()
            .min (8, 'Password needs at least 8 characters')
            .max (50, 'Max is 20 characters')
            .required ('Password is required'),
        })}
        onSubmit={ async (values, {setErrors, setStatus, setSubmitting}) => {
          try {
            await signInWithEmailAndPassword(values.email, values.password)
            console.log (values.email, values.password);
            handleClose ();
          } catch (err) {
            console.log (err)
            setStatus({success: false})
            setErrors({submit:err.message})
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
            autoComplete="off"
            onSubmit={handleSubmit}
            className={classes.dialogContent}
          >
            <h2>Sign In</h2>
            <TextField
              autoFocus
              label="User Name"
              type="user"
              name="user"
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.user}
              error={Boolean (touched.user && errors.user)}
              helperText={touched.user && errors.user}
              requiredfullWidth
            />
            <TextField
              label="Email Address"
              type="email"
              name="email"
              variant="outlined"
              margin="normal"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={Boolean (touched.email && errors.email)}
              helperText={touched.email && errors.email}
              required
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              variant="outlined"
              margin="normal"
              placeholder="&*#$(%#"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean (touched.password && errors.password)}
              helperText={touched.password && errors.password}
              required
              fullWidth
            />

            <Box>
              <Button
                className={classes.spacing}
                color="secondary"
                variant="outlined"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                variant="outlined"
                type="submit"
                disabled={Boolean (
                  errors.email || errors.password || errors.user
                )}
              >
                Login
              </Button>
            </Box>
          </form>
        )}
      </Formik>

    </Dialog>
  );
};

export default Login;
