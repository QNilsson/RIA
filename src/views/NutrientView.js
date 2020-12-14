import React from 'react';
import RecipeView from './RecipeView';
import { makeStyles } from '@material-ui/core'




const useStyles = makeStyles ({
	root:{
		textAlign:'left'
	},
	list:{

	}
	
  });
const NutrientView = ({carbs}) =>{
	const classes = useStyles ();
	return carbs.map(carb =>{
		return(
			
			<ul className={classes.root}>
				<li classname={classes.list}>{carb.label}</li>
				
			</ul>
		)
	})
};

export default NutrientView;