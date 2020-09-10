import React, { Component, useState } from 'react';
import Planets from './Planet/Planets'
import './App.css'



//class-based component
class App extends Component {
  render() {
    return (

      
      <div className="App">
        <h1 class="shine">Welcome to Star Tours</h1>
        <h3 class="shine">#1 in the Universe for Vacation Destinations</h3>
        <p>We are currently touring your <strong>61</strong> different planets. Scroll down to plan your perfect vacation!</p>
        <hr></hr>
       <div>
         <div class="row">
           <div class="column">
             <img class="grow" src={require('./images/alderaan.jpg')}></img>
           </div>
           <div class="column">
             <img class="grow" src={require('./images/endor.jpg')}></img>
           </div>
           <div class="column">
             <img class="grow" src={require('./images/tatooine.jpg')}></img>
           </div>
           <div class="column">
             <img class="grow" src={require('./images/hoth.jpg')}></img>
           </div>
         </div>
       </div>
        <Planets />
      </div>

    );
  }
}

export default App;
