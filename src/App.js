import React, {Component, useState} from 'react';
import ChickenList from './components/ChickenList';
import FishList from './components/FishList';
import RecipeView from './views/RecipeView';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import {Route, Switch} from 'react-router-dom';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import { SvgIcon } from '@material-ui/core';

//function-based component
function App () {
  return (
    <div className="App">
      <Layout/>
      
      <Switch>
        <Route path="/chickenlist" component={ChickenList} exact/>
        <Route path="/fishlist" component={FishList} exact/>
        <Route path='/' exact component={Welcome}/>
      </Switch>

     
     

    </div>
  );
}

export default App;
