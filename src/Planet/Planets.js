import React from 'react'
import PlanetData from '../data/planets.json'

const planets = PlanetData;
const mild = planets.filter(planet => planet.climate.includes("temperate")).slice(0,5)
const frozen = planets.filter(planet => planet.climate.includes("frozen"))
const hot = planets.filter(planet => planet.climate.includes("hot"))
const desert = planets.filter(planet => planet.climate.includes("arid")).slice(0,5)
const tropical = planets.filter(planet => planet.climate.includes("tropical"))
const people = planets.filter(planet => planet.residents);





function Planets() {//functional component (new, uses hooks)
	
	return(
		<div>
			<h2>What type of climate do you prefer?</h2>

			<button 
			class="grow"
			>Temperate</button>
			<button class="grow">Frozen</button>
			<button class="grow">Desert</button>
			<button class="grow">Tropical</button>

			<div class="climate-section">
				<div class="section">
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
			</div>
			<div class="section">
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
			</div>
			<div class="section">
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
			</div>
			<div class="section">
			<h2>Desert Planets: {desert.length}</h2>
			{
				desert.map((desertplanet, index) =>{
					return(
						<p>{desertplanet.name}</p>
					)
				})
			}
			</div>
			<div class="section">
			<h2>Tropical Planets: {tropical.length}</h2>
			{
				tropical.map((tropicalplanet,index)=>{
					return(
						<p>{tropicalplanet.name}</p>
					)
				})
			}
			</div>
			</div>


			<h2>Residents: {people.length}</h2>
		</div>
	)
};

export default Planets;