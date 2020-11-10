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
const IngredientView = ({ingredients}) =>{
	const classes = useStyles ();
	return ingredients.map(ingredient =>{
		return(
			
			<ul className={classes.root}>
				<li classname={classes.list}>{ingredient.text}</li>
				
			</ul>
		)
	})
};

export default IngredientView;