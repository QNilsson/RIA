import React from 'react'
import { Box, Dialog, TextField, Button, makeStyles } from '@material-ui/core';
import { SvgIcon } from '@material-ui/core';

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

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='Login Dialog'>
      <form noValidate autoComplete='off' className={classes.dialogContent}>
        <h2>Sign in</h2>
        <TextField
          id='email-input'
          label='Email Address'
          type='email'
          variant='filled'
          margin='normal'
          placeholder='example@gmail.com'
        />
        <TextField
          id='password-input'
          label='Password'
          type='password'
          variant='filled'
          margin='normal'
          placeholder='********'
        />
        <Box>
          <Button color='primary' onClick={handleClose}>Cancel</Button>
          <Button color='primary'>Login</Button>
        </Box>
      </form>
    </Dialog>
  )
}

export default Login