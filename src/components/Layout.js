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

  const logContext = useContext(LogContext)

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  // const handleDialogToggle = () => {
  //   setLoginOpen(!loginOpen)
  // }

  const handleLog = () =>{
    
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
          <NavLink activeStyle={{ fontWeight:"bold", color:"red"}}to='/chickenlist' className={classes.navSpacing}>
            Chicken Recipes
          </NavLink>
          <NavLink activeStyle={{ fontWeight:"bold", color:"red"}}to='/recipes' className={classes.navSpacing}>
            Chocolate Recipes (NodeJS)
          </NavLink>
          <NavLink activeStyle={{ fontWeight:"bold", color:"red"}}to='/graphql' className={classes.navSpacing}>
            GraphQL 
          </NavLink>
          
          <NavLink activeStyle={{ fontWeight:"bold", color:"red"}}to='/lowcarb' className={classes.navSpacing}>
          Low-Carb
          </NavLink>
          <NavLink activeStyle={{ fontWeight:"bold", color:"red"}}to='/search' className={classes.navSpacing}>
            Search All Recipes
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
          <NavLink to='/lowcarb' className={classes.navSpacing} onClick={handleDrawerToggle}>
           LowCarb Recipes
          </NavLink>
          </ListItem>

          <ListItem>
          <NavLink to='/lowcarb' className={classes.navSpacing} onClick={handleDrawerToggle}>
           Graphql Tab
          </NavLink>
          </ListItem>
          <ListItem>
          <NavLink to='/search' className={classes.navSpacing} onClick={handleDrawerToggle}>
           Search All Recipes
          </NavLink>
          </ListItem>
          
        </List>
      </Drawer>
      <Login open={loginOpen} onClose={handleLog}/>
    </div>
  )
}