import React from 'react'
import PlanetData from '../data/planets.json'

const planets = PlanetData;
const mild = planets.filter(planet => planet.climate === "temperate")
const frozen = planets.filter(planet => planet.climate === "frozen")
const hot = planets.filter(planet => planet.climate === "hot")
const desert = planets.filter(planet => planet.climate === "arid")
const tropical = planets.filter(planet => planet.climate === "tropical")
const people = planets.filter(planet => planet.residents);
function Planets() {//functional component (new, uses hooks)
	
	return(
		<div>
			<h2>What type of climate do you prefer?</h2>

			<button class="grow">Temperate</button>
			<button class="grow">Frozen</button>
			<button class="grow">Desert</button>
			<button class="grow">Tropical</button>


			<h2>Temperate Planets : {mild.length}</h2>
			{
				mild.map((mildplanet, index) =>{
					return (
						<p>
							{mildplanet.name}
						</p>
					)
				})
			}
			<h2>Frozen Planets: {frozen.length}</h2>
			{
				frozen.map((frozenplanet, index) =>{
					return(
						<p>
							{frozenplanet.name}
						</p>
					)
				})
			}
			<h2>Hot Planets: {hot.length}</h2>
			{
				hot.map((hotplanet, index) =>{
					return(
						<p>
							{hotplanet.name}
						</p>
					)
				})
			}
			<h2>Desert Planets: {desert.length}</h2>
			{
				desert.map((desertplanet, index) =>{
					return(
						<p>{desertplanet.name}</p>
					)
				})
			}
			<h2>Tropical Planets: {tropical.length}</h2>
			{
				tropical.map((tropicalplanet,index)=>{
					return(
						<p>{tropicalplanet.name}</p>
					)
				})
			}
			<h2>Residents: {people.length}</h2>
		</div>
	)
};

export default Planets;