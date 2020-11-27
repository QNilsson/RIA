import React, {Component, useState} from 'react';
import ChickenList from './components/ChickenList';
import FishList from './components/FishList';
import PastaList from './components/PastaList'
import RecipeView from './views/RecipeView';
import Search from './components/Search';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import {Route, Switch} from 'react-router-dom';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import { SvgIcon } from '@material-ui/core';
import LogContextProvider, { LogContext } from './contexts/LogContext';

//function-based component
function App () {
  return (
    <LogContextProvider>
    <div className="App">
      <Layout/>
      
      <Switch>
        <Route path="/chickenlist" component={ChickenList} exact/>
        <Route path="/fishlist" component={FishList} exact/>
        <Route path="/pastalist" component={PastaList} exact/>
        <Route path="/search" component={Search} exact/>
        <Route path='/' exact component={Welcome}/>
      </Switch>

     
     

    </div>
    </LogContextProvider>
  );
}

export default App;
