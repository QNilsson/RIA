import React, { useEffect, useState }from 'react';
import axios from 'axios';
import {makeStyles, List, Paper, ListItem, Card, ListItemAvatar} from '@material-ui/core';

import PlanetView from './PlanetView';
import '../Planet/Planet.css'

const useStyles = makeStyles (theme => ({
  root: {
    width: '645',
	  maxWidth: 360,
	  backgroundColor: theme.palette.background.paper,
	  spacing:8,
  },
  pos:{
	  marginBottom:12,
  },
}));

//const planets = PlanetData;

// const mild = planets
//   .filter (planet => planet.climate.includes ('temperate'))
//   .slice (0, 5);
// const frozen = planets.filter (planet => planet.climate.includes ('frozen'));
// const hot = planets.filter (planet => planet.climate.includes ('hot'));
// const desert = planets
//   .filter (planet => planet.climate.includes ('arid'))
//   .slice (0, 5);
// const tropical = planets.filter (planet =>
//   planet.climate.includes ('tropical')
// );

const PlanetList = () => {

	const classes=useStyles()

	const [planetData, setPlanetData] = useState({
		planets: []
	})

	const fetchPlanets = () =>{
		axios.get('https://swapi.py4e.com/api/people/')
		.then(function(response){
			//handle success
			console.log(response)
			setPlanetData({
				planets: response.data.results
			})
		})
	}
	useEffect(()=>{
		fetchPlanets()
	})
  return (
    <div>	<h1>{planetData.planets.length} Tour Guides</h1> 
    <div class="row"> 
    <div class="column">
	
		{/* <List dense className={classes.root}>
		{planetData.planets.map((plan) =>{
return(
	<p key={plan.name}>{plan.name}</p>
)
		})}
		</List> */}
		
		<List className={classes.root} >
      {planetData.planets.map (planet => {
        return <PlanetView plan={planet} key={planet.name}></PlanetView>
      })}
	  </List>
    </div>
    <div class="column">

    <List className={classes.root} >
      {planetData.planets.map (planet => {
        return <PlanetView plan={planet} key={planet.name}></PlanetView>
      })}
	  </List>
    </div>
    <div class="column">
  <List className={classes.root}>
    {planetData.planets.map(planet=>{
      return <PlanetView plan={planet} key={planet.name}></PlanetView>
    })}
  </List>
    </div>
  {/*end column*/}
    

    </div>

    

      {/* <h2>Our most popular destinations</h2>

      <div class="climate-section">
        <div class="section">
          <h2>Temperate Planets : {mild.length}</h2>
          {mild.map ((mildplanet, index) => {
            return (
              <p>
                {mildplanet.name}
              </p>
            );
          })}
        </div>
        <div class="section">
          <h2>Frozen Planets: {frozen.length}</h2>
          {frozen.map ((frozenplanet, index) => {
            return (
              <p>
                {frozenplanet.name}
              </p>
            );
          })}
        </div>
        <div class="section">
          <h2>Hot Planets: {hot.length}</h2>
          {hot.map ((hotplanet, index) => {
            return (
              <p>
                {hotplanet.name}
              </p>
            );
          })}
        </div>
        <div class="section">
          <h2>Desert Planets: {desert.length}</h2>
          {desert.map ((desertplanet, index) => {
            return <p>{desertplanet.name}</p>;
          })}
        </div>
        <div class="section">
          <h2>Tropical Planets: {tropical.length}</h2>
          {tropical.map ((tropicalplanet, index) => {
            return <p>{tropicalplanet.name}</p>;
          })}
        </div>
      </div> */}

    </div>
  );
};

export default PlanetList;
