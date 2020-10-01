import React, {Component} from 'react';
import PlanetData from '../data/planets.json';
import axios from 'axios'
import { makeStyles } from '@material-ui/core';
import List from '@material-ui/core';
import ListItem from '@material-ui/core'
import '../../src/App.css'

const planets = PlanetData;

//function to find least populated planet
const leastPop = planets.reduce ((acc, planet) => {
  return acc.population < planet.population  ? acc : planet;
});


const mostPop = planets.reduce ((acc, planet) => {
  return acc.population > planet.population  ? acc : planet;
});

class Population extends Component {
  render () {
    return (
      <div className="pop-section">

        <h3>Looking for some peace and quiet?</h3>
        <h4>
          Visit {leastPop.name}, it has only {leastPop.population} residents
        </h4>
        <h4>Probably because of its {leastPop.terrain} landscape</h4>
        <hr />

        <h3>Want to experience big city life?</h3>
        <h4>Try out these planets: {}</h4>

		
			{
				planets.map((planet, index) =>{
					if(planet.population > 900000 && planet.population != "unknown")
					return (
						<div className="card">
							<div className="container">
							<h3>{planet.name}:</h3>
							<p>hosts {planet.population} residents</p>
							 
						
							</div> 
						
						</div>//end class card
						
					)
				})
			}

      </div>//end pop-setion
    );
  }
}

export default Population;
