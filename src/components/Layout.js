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
import { AuthContext } from '../contexts/AuthContext'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding:30
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
    backgroundColor: '#d4a59a',
    
  },
  title: {
    flexGrow: 1,
  },
 
  navSpacing: {
    marginRight: '5rem',
    color: '#5c2018',
    textDecoration: 'none',
  },

  list: {
    width: 250,
    backgroundColor: '#d4a59a',
  },
}))

export default function ButtonAppBar() {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  const authContext = useContext(AuthContext)

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  // const handleDialogToggle = () => {
  //   setLoginOpen(!loginOpen)
  // }

  const handleAuth = () =>{
    
    if(authContext.isAuthenticated){
      authContext.logout()
      setLoginOpen(false)
      return
    }
    if(!authContext.isAuthenticated){
      if(!loginOpen){
        setLoginOpen(true)
        return
      }
      setLoginOpen(false)
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position='absolute' color='light'>
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
          
          <NavLink to='/search' className={classes.navSpacing}>
            Search All Recipes
          </NavLink>
          <NavLink to='/favorites' className={classes.navSpacing}>
            Favorites
          </NavLink>


         

          {
          authContext.isLog ? <Button color='inherit' onClick={handleAuth}>Log out</Button> :
          <Button color='inherit' onClick={handleAuth}>Log In</Button>}
          
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
        
          <ListItem>
          <NavLink to='/search' className={classes.navSpacing} onClick={handleDrawerToggle}>
           Search All Recipes
          </NavLink>
          </ListItem>
          <ListItem>
          <NavLink to='/favorites' className={classes.navSpacing} onClick={handleDrawerToggle}>
           Favorites
          </NavLink>
          </ListItem>
        </List>
      </Drawer>
      <Login open={loginOpen} onClose={handleAuth}/>
    </div>
  )
}