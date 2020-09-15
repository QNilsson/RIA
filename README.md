This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
## Netlify Link:
https://awesome-minsky-9b2d2f.netlify.app/

## Api Used: Swapi Star Wars Api

## One functional component
```javascript
function() Planets {
	return()
}
```
## One class based component
```javascript
class Population extends Component{
	render()
	return()
}
```
## Awesome "Star Tours" Title
## List of planets 
```javascript
const planets = PlanetData;
```
A list of the most popular planets based off of their climates
```javascript
const mild = planets.filter(planet => planet.climate.includes("temperate")).slice(0,5)
```
A listing of the least populated planet\
```javascript
const leastPop = planets.reduce ((acc, planet) => {
  return acc.population < planet.population ? acc : planet;
});
```
A list of the most populated planets and how many resides there are

```javascript
planets.map((planet, index) =>{
if(planet.population > 900000 && planet.population != "unknown")
```





