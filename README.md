This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
## Netlify Link:
https://loving-feynman-6ad039.netlify.app/recipes
Currently dont have working backend deployed

## Local Run Instructions:

1.open RIA folder<br>
run 'npm start'<br>

2. open Node file<br>
run 'npm run seed'<br>
run 'npm start'<br>

## Requirements

At least 3 endpoints to GET data

```javascript
recipeRouter.get('/', recipes) //router

//seed file
const seedMongo = async () => {
  await mongoose.connect (`${process.env.CONNECT_STRING}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const options = {
	method: 'GET',
	url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search',
	params: {query: 'chocolate'},
	headers: {
	  'x-rapidapi-key': `${process.env.RAPID_API_KEY}`,
	  'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
	  'Content-Type':'application/json',
	  "Access-Control-Allow-Methods":"GET,POST,PUT,DELETE, OPTIONS"
	}
  };
try{
	const response = await axios.request(options)
	await addRecipes(response.data.results)
	await mongoose.connection.close()
}catch(error){
	console.log(error)
}
}



recipeRouter.get('/id', getRecipeById)//router

//controller
export const getRecipeById = async(req, res) =>{
  const recipeID = req.body.recipeID
  try{
    const recipe = await Recipe.findById(recipeID)
    if(!recipe){
      return res.status(400).json({Message: 'reicpe not found'})
    }
    res.json(recipe)
  }catch(err){
    return res.status(400).json({Message: `invalid id ${err}`})
  }
}


recipeRouter.get('/fast', getFastRecipe)


```

At least 1 endpoint to UPDATE using PUT or PATCH

```javascript
recipeRouter.put('/update', updateRecipe) //router

//controller
export const updateRecipe = async (req, res) => {
  const recipeId = req.body.data.recipeId;
  console.log (recipeId);
  const updatedObj = {
    title: req.body.data.title,
    servings: req.body.data.servings,
    time: req.body.data.time,
    image: req.body.data.image,
  };
  try {
    const recipe = await Recipe.findByIdAndUpdate (recipeId, updatedObj, {
      new: true,
    });
    console.log (recipe);
    console.log ('success');
    res.status (200).json (recipe);
  } catch (err) {
    console.log ('error');
  }
};




```

At least 1 endpoint to CREATE and item via POST 

```javascript
recipeRouter.post('/', addRecipe)//router

//controller
//recipe adds at the bottom of the list right now...need to fix that
export const addRecipe = ((req, res) =>{
  console.log("want to add")
  const recipe = new Recipe({
    title:req.body.title,
    servings:req.body.servings,
    time:req.body.time,
    image:req.body.image
  })
  console.log(recipe)
  recipe.save()
  res.json(recipe)
})
```

Datastore will contain 25 items

Deployed to Production service

All code loaded to Github

Server URL: https://github.com/QNilsson/DGM4790Node

React URL : https://github.com/QNilsson/RIA

Descriptive ReadMe File





