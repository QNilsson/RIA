import React, { useState, useContext } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Drawer,
  List,
  ListItem,
  Button,
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu'
import { NavLink } from 'react-router-dom'

import Login from './Login'
import { LogContext } from '../contexts/LogContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
 
  navSpacing: {
    marginRight: '5rem',
    color: 'red',
    textDecoration: 'none',
  },
  list: {
    width: 250,
    backgroundColor: 'white',
    
  },
}))

export default function ButtonAppBar() {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  const logContext = useContext(LogContext)

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  // const handleDialogToggle = () => {
  //   setLoginOpen(!loginOpen)
  // }

  const handleLog = () =>{
    console.log(logContext.isLog)
    if(logContext.isLog){
      logContext.logout()
      setLoginOpen(false)
      return
    }
    if(!logContext.isLog){
      if(!loginOpen){
        setLoginOpen(true)
        return
      }
      setLoginOpen(false)
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position='static' color='dark'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <NavLink to='/chickenlist' className={classes.navSpacing}>
            Chicken Recipes
          </NavLink>
          <NavLink to='/fishlist' className={classes.navSpacing}>
            Fish Recipes
          </NavLink>
          {
          logContext.isLog ? <Button color='inherit' onClick={handleLog}>Log out</Button> :
          <Button color='inherit' onClick={handleLog}>Log In</Button>}
          
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={handleDrawerToggle}>
        <List className={classes.list}>
          <ListItem>
          <NavLink to='/chickenlist' className={classes.navSpacing} onClick={handleDrawerToggle}>
            Chicken Recipes
          </NavLink>
          </ListItem>
          <ListItem>
          <NavLink to='/fishlist' className={classes.navSpacing} onClick={handleDrawerToggle}>
            Fish Recipes
          </NavLink>
          </ListItem>
        </List>
      </Drawer>
      <Login open={loginOpen} onClose={handleLog}/>
    </div>
  )
}