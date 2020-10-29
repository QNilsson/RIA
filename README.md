This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
## Netlify Link:
https://awesome-minsky-9b2d2f.netlify.app/

## Api Used: Edamam Recipe API

## Only Functional components
```javascript
const ChickenList = () => {
	return()
}

const FishList = () => {
	return()
}

```
## Components handled with useState
```javascript
  const [recipeData, setRecipeData] = useState ([]);
```
## Use Effect for side effects like getting the recipe data
```javascript
 useEffect (() => {
    const fetchRecipes = () => {
      axios
        .get (
          `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`,
          {}
        )
        .then (function (response) {
          console.log (response.data.hits);
          setRecipeData (response.data.hits)
         
        })
        .catch (function (error) {
          console.log (error);
        });
    };
    fetchRecipes ();
  }, []);
```
## Use Context to authorize and store user log in
```javascript
export const LogContext = createContext ({
  isLog: false,
  login: () => {},
  logout: () => {},
});
```
## Use Formik and Yup for form validation
```javascript
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
```
## Using @materiaul-ui core for styling
```javascript
import { makeStyles, Card, CardContent, CardActionArea, Button Box}
```






