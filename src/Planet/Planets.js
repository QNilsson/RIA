import React, { Component } from 'react'
import PlanetData from '../data/planets.json'
import axios from 'axios'
import { makeStyles } from '@material-ui/core';
import List from '@material-ui/core';
import ListItem from '@material-ui/core'

const planets = PlanetData;
const mild = planets.filter(planet => planet.climate.includes("temperate")).slice(0,5)
const frozen = planets.filter(planet => planet.climate.includes("frozen"))
const hot = planets.filter(planet => planet.climate.includes("hot"))
const desert = planets.filter(planet => planet.climate.includes("arid")).slice(0,5)
const tropical = planets.filter(planet => planet.climate.includes("tropical"))




function Planets() {//functional component (new, uses hooks)
	
	return(
		<div>
			<h2>Our most popular destinations</h2>
			

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
			</div>{/*end of climate-section*/}


			
			
		</div>
	)
};

export default Planets;