import React from 'react'
import PlanetData from '../data/planets.json'

const planets = PlanetData;
const mild = planets.filter(planet => planet.climate === "temperate")
const frozen = planets.filter(planet => planet.climate === "frozen")
const hot = planets.filter(planet => planet.climate === "hot")
const desert = planets.filter(planet => planet.climate === "arid")
const tropical = planets.filter(planet => planet.climate === "tropical")
function Planets() {//functional component (new, uses hooks)
	
	return(
		<div>
			<h2>What type of climate do you prefer?</h2>

			<h2>Temperate Planets : {mild.length}</h2>
			<h2>Frozen Planets: {frozen.length}</h2>
			<h2>Hot Planets: {hot.length}</h2>
			<h2>Desert Planets: {desert.length}</h2>
			<h2>Tropical Planets: {tropical.length}</h2>
		</div>
	)
};

export default Planets;