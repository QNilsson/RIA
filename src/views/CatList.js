import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CatView from '../components/CatView'
import { Card, makeStyles} from '@material-ui/core'



const useStyles = makeStyles(() =>({
	root:{
		width:'100%',
		maxWidth:600,
		backgroundColor: '#C7D3D4FF',
		color:'#603f83ff',
	},
	media: {
		height:40,
	},
	spacing: 8,
}))

const CatList = () =>{
	const classes = useStyles()

	const [catData, setCatData] = useState({
		cats:[],
	})

	useEffect(() =>{
		const fetchCats = () =>{
			axios
			.get("https://api.thecatapi.com/v1/breeds", {
				headers: { 'x-api-key': process.env.CAT_API_KEY}
			})
			.then(function (response){
				console.log(response.data)
				setCatData({
					cats: response.data
				})
			}).catch(function(error){
				console.log(error)
			})
		}
		fetchCats()
	},[])
		
	


return(
<div>
	<div className='column'>
		<h1>{catData.cats.length} Breeds of Cats!</h1>
		<Card  borderRadius="50%" m={2} borderBottm={2} className={classes.root}>
			{catData.cats.map((catMem) =>{
				return(
					<CatView 
					cat={catMem}
					key={catMem.name}>
					</CatView>
				)
			})}
		</Card>
	</div>
</div>
)
	}

	export default CatList