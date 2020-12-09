import React from 'react';
import {makeStyles} from '@material-ui/core';
import RecipeView from '../views/RecipeView'

const useStyles = makeStyles (() => ({
	root: {
	  color: '#5c2018',
	  backgroundColor: '#f3e0dc',
	  margin: '0',
	  height: '100vh',
	  paddingTop: 20,
	},
	main: {
	  display: 'flex',
	  flexWrap: 'wrap',
	  backgroundColor: '#f3e0dc',
	},
	spacing: 8,
	card: {
	  borderColor: '#5c2018',
	  alignContent: 'center',
	  display: 'flex',
	  flexWrap: 'wrap',
	},
  
	ul: {
	  listStyleType: 'none',
	},
	li: {
	  display: 'flex',
	  flexWrap: 'wrap',
	  width: 280,
  
	  margin: 10,
	  textAlign: 'center',
	},
  }));

  const Favorites = ({title, calories, image, servings, ingredients}) => {
return(
<ul key={faveArray.recipe.recipe.label}className={classes.ul}>
      <li className={classes.li}>
      <Card className={classes.card}>
			<RecipeView title={recipe.recipe.label} calories={recipe.recipe.calories} ingredients={recipe.recipe.ingredients} servings={recipe.recipe.yield} image={recipe.recipe.image}/>
      </Card>
      </li>
      </ul>

)

  }

  export default Favorites;