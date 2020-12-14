This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Netlify Link:

https://serene-einstein-be8031.netlify.app/

## Api Used: Edamam Recipe API

## Effectively use conditional logic and JavaScript array methods(e.g. Filter, Map, Reduce, Find) to render large lists.

```javascript
{
	recipes !== [] &&
		recipes.map((recipe, key) => (
			<Fragment>
				<Fade bottom>
					<ul key={recipe.recipe.label} className={classes.ul}>
						<li className={classes.li}>
							<Card className={classes.card}>
								<RecipeView
									title={recipe.recipe.label}
									calories={recipe.recipe.calories}
									ingredients={recipe.recipe.ingredients}
									servings={recipe.recipe.yield}
									image={recipe.recipe.image}
									source={recipe.recipe.source}
									carbs={recipe.recipe.totalNutrients}
								/>
							</Card>
						</li>
					</ul>
				</Fade>
			</Fragment>
		));
}
```



## Allow communication between components using props and the Context API.

```javascript
  const LogContextProvider = props => {
  //initially set is logged in to false
  const [isLogged, setIsLogged] = useState (false);

  const loginHandler = () => {
    //when login button is pushed
    setIsLogged (true);
  };
  const logoutHandler = () => {
    //when logout button is pushed
    setIsLogged (false);
  };
```

## Present a form for user input that provides useful form validation and feedback.

```javascript
<Dialog open={open} onClose={handleClose} aria-labelledby="Login Dialog">
      <Formik
        initialValues={{
          user: '',
          email: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object ().shape ({
          user: Yup.string ()
          .min (4, 'Minimum of 4 characters')
          .max (16, 'Max of 15 characters')
          .required ('UserName is required'),
          email: Yup.string ()
            .email ('Must be a valid email')
            .max (50)
            .required ('Email is required'),
          password: Yup.string ()
            .min (8, 'Password needs at least 8 characters')
            .max (50, 'Max is 20 characters')
            .required ('Password is required'),
        })}
        onSubmit={(values, {setErrors, setStatus, setSubmitting}) => {
          try {
            logContext.login ();
            console.log (values.email, values.password);
            handleClose ();
          } catch (err) {
            console.log (err);
          }
        }}
      >

```

## Create at least 5 custom components and use it within at least two of your other components.

```javascript
Alert.js;
ChickenList.js;
ChocolateList.js;
Layout.js;
Login.js;
LowCarb.js;
Search.js;
Welcome.js;
```

## Use a mix of CSS animations and Transition Component transitions to enhance some aspects of your project.

```javascript
<Fade in={checked}>
  <ul elevation={4} className={classes.ul}>

<Slide direction="up" in={checked} mountOnEnter unmountOnExit>
  <ul key={recipe.recipe.label} className={classes.ul}>

<Fragment>
    <Fade bottom>
    <ul key={recipe.recipe.label} className={classes.ul}>

<Collapse in={expanded} timeout ="auto" unmountOnExit>
    <Typography paragraph>Nutrient Info:</Typography>
    <Typography paragraph>
```

## Connect to a server using HTTP and display retrieved data.
```javascript 
const getData = async () => {
    if (query !== '') {
      const result = await axios.get (`https://api.edamam.com/search?q=${query}&app_id=${apid}&app_key=${apkey}`, {
        headers:{
          "Access-Control-Allow-Orign": "*",
            'Content-Type':'application/json'
            
        }
      });
```
## Provide at least 3 different routes with navigation between them using React Router.

```javascript
<Switch>
        <Route path="/chickenlist" component={ChickenList} exact/>
        <Route path="/chocolatelist" component={ChocolateList} exact/>
        <Route path="/lowcarb" component={LowCarb} exact/>
        <Route path="/search" component={Search} exact/>
        <Route path='/' exact component={Welcome}/>
      </Switch>
```
## Manage your application's state using Hooks and the Context API.
```javascript 
useEffect (() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get (
          `https://api.edamam.com/search?q=chocolate&app_id=${apid}&app_key=${apkey}`,
          {
            headers: {
              // 'Content-Type': 'application/json'
              'Access-Control-Allow-Orign': '*',
              'Content-Type': 'application/json',

              // "Access-Control-Allow-Headers": "Origin",
            },
          }
        );

        console.log (response.data.hits);
        setRecipeData (response.data.hits);
      } catch (error) {
        console.log ('error with function');
      }
    };
    fetchRecipes ();
  }, []);


  return isLog
    ? <div className={classes.root}>

```


## Encapsulate your code as React functional components.

```javascript
const ChickenList = () => {
	return()
}

const ChocolateList = () => {
	return()
}

const Search = () => {
  return()
}

```


## Structure, document, and deploy your final project code according to common industry practices.

## Work with command-line tools and NPM to create and manage your project within a real development toolset.
npm install
