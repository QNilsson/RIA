import React from 'react';
import RecipeView from './RecipeView';

const IngredientView = ({ingredients}) =>{
	return ingredients.map(ingredient =>{
		return(
			<ul className="ingredient-list">
				<li classname="ing-text">{ingredient.text}</li>
				
			</ul>
		)
	})
};

export default IngredientView;