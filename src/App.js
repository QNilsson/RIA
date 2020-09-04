import React, { Component } from 'react';
import Planets from './Planet/Planets'
import './App.css'
import endor from './images/endor.jpg'


//class-based component
class App extends Component {
  render() {
    return (

      <div className="App">
        <h1>Welcome to Star Tours</h1>
        <h3>#1 in the Universe for Vacation Destinations</h3>
        <p>We are currently touring <strong>61</strong> different planets. Scroll down to plan your perfect vacation!</p>
       <div>
         <div class="row">
           <div class="column">
             <img src={require('./images/crait.jpg')}></img>
           </div>
           <div class="column">
             <img src={require('./images/tatooine.jpg')}></img>
           </div>
           <div class="column">
             <img src={require('./images/endor.jpg')}></img>
           </div>
           <div class="column">
             <img src={require('./images/hoth.jpg')}></img>
           </div>
         </div>
       </div>
        <Planets />
      </div>

    );
  }
}

export default App;
