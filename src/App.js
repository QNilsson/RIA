import React, { Component, useState } from 'react';
import Planets from './Planet/Planets'
import Populations from './Population/Populations'
import './App.css'
import PlanetList from './Planet/PlanetList';



//class-based component
class App extends Component {
  render() {
    return (

      
      <div className="App">
        <h1 className="shine">Welcome to Star Tours</h1>
        <h3 className="shine">#1 in the Universe for Vacation Destinations</h3>
        <p>We are currently touring with 10 expert guides. Scroll down to plan your perfect vacation!</p>
        <hr></hr>
        <div>
         <div className="row-img">
           <div className="column-img">
             <img className="grow" src={require('./images/alderaan.jpg')}></img>
           </div>
           <div className="column-img">
             <img className="grow" src={require('./images/endor.jpg')}></img>
           </div>
           <div className="column-img">
             <img className="grow" src={require('./images/tatooine.jpg')}></img>
           </div>
           <div className="column-img">
             <img className="grow" src={require('./images/hoth.jpg')}></img>
           </div>
         </div>
       </div> 
        <PlanetList />
         <Populations /> 
      </div>

    );
  }
}

export default App;
