import React, {Component, useState} from 'react';
import ChickenList from './components/ChickenList';
import ChocolateList from './components/ChocolateList';
import LowCarb from './components/LowCarb'
import Search from './components/Search';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import GraphQL from './components/GraphQL';
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
        <Route path="/recipes" component={ChocolateList} exact/>
        <Route path="/graphql" component={GraphQL} exact/>
        <Route path="/lowcarb" component={LowCarb} exact/>
        <Route path="/search" component={Search} exact/>
        <Route path='/' exact component={Welcome}/>
      </Switch>

     
     

    </div>
    </LogContextProvider>
  );
}

export default App;
