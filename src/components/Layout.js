import React, { useState } from 'react'
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
import { SvgIcon } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import { NavLink } from 'react-router-dom'

import Login from './Login'

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
  dem: {
    color: 'blue',
  },
  repub: {
    color: 'red',
  },
  navSpacing: {
    marginRight: '5rem',
    color: '#fff',
    textDecoration: 'none',
  },
  list: {
    width: 250,
    backgroundColor: '#00f'
  },
}))

export default function ButtonAppBar() {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleDialogToggle = () => {
    setLoginOpen(!loginOpen)
  }

  return (
    <div className={classes.root}>
      <AppBar position='static'>
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
          <Button color='inherit' onClick={handleDialogToggle}>Login</Button>
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
      <Login open={loginOpen} onClose={handleDialogToggle}/>
    </div>
  )
}