import React, {useState, useEffect, useContext, Fragment} from 'react';
import {
  Card,
  makeStyles,
  FormControl,
  Button,
  Input,
  Grow,
  Slide,
  Switch,
  InputBase,
} from '@material-ui/core';
import Fade from 'react-reveal/Fade';
import {LogContext} from '../contexts/LogContext';
import {Redirect} from 'react-router-dom';
import Axios from 'axios';
import RecipeView from '../views/RecipeView';
import Alert from '../components/Alert';

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

const Search = () => {
  const [query, setQuery] = useState ('');
  const [recipes, setRecipes] = useState ([]);
  const [alert, setAlert] = useState ('');
  const APP_ID = 'c9f6666e';
  const APP_KEY = '66d96ebe2ee152f28bed15343c6a769c';
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const classes = useStyles ();
  const {isLog} = useContext (LogContext);

  const getData = async () => {
    if (query !== '') {
      const result = await Axios.get (url);
      if (!result.data.more) {
        return setAlert ('No food with such name');
      }
      console.log (result);
      setRecipes (result.data.hits);
      setQuery ('');
      setAlert ('');
    } else {
      setAlert ('Please fill the form');
    }
  };

  const onChange = e => setQuery (e.target.value);

  const onSubmit = e => {
    e.preventDefault ();
    getData ();
  };

  return isLog
    ? <div className={classes.root}>
        <FormControl onSubmit={onSubmit}>
          {alert !== '' && <Alert alert={alert} />}
          <Input
            type="text"
            name="query"
            onChange={onChange}
            value={query}
            autoComplete="off"
            focused="false"
            size="medium"
            variant="outlined"
            placeholder="Search Food"
          />
          <Button
            color="secondary"
            size="medium"
            type="submit"
            variant="contained"
            onClick={onSubmit}
          >
            Search
          </Button>
        </FormControl>
        <div className={classes.main}>
          {recipes !== [] &&
            recipes.map ((recipe,key) => (
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
                    />
                  </Card>
                </li>
              </ul>
              </Fade>
              </Fragment>
            ))}
        </div>
      </div>
    : <Redirect to="/" />;
};

export default Search;
