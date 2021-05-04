# DGM4790 Final Project Requirements

### 1. Effectively use conditional logic, JavaScript array methods, and front-end framework elements to render large lists on the web client
```javascript
<Container className={classes.root}>
        {recipeList.map((recipe) => {
          
          return (
            <Fragment>
          <Fade bottom>
            <Card className={classes.card} key={recipe.id}>
              <CardMedia
                component='img'
                height='300'
                className={classes.media}
                image={recipe.image}
                title={recipe.title}
              ></CardMedia>
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  {recipe.title}
                </Typography>
                <Box className={classes.content}>
                  <Typography variant='subtitle1' color='textSecondary'>
                    Servings: {recipe.servings}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    Ready in: {recipe.readyInMinutes} minutes
                  </Typography>
                </Box>
                <Box className={classes.source}>
                <Typography variant='subtitle1' color='textSecondary'>Source:</Typography>
                <Typography className={classes.sourceText}variant='caption' color='secondary'>
                    <a href={recipe.sourceUrl} target="_blank">Go to Source</a>
                    </Typography>
                </Box>
              </CardContent>
           
```
### 2. Work with the proper libraries (e.g. VueJS, React) to create and manage the front-end portion of your project using a real development toolset.
Project is built with react 

### 3. Work with NPM and NodeJS to create and manage the back-end portion of your project.
Created and managed with NPM. Used NodeJS for part of the back-end as well.

### 4. Seed" script provides way to populate the datastore after the Docker install and launch
https://github.com/QNilsson/Graphql/blob/72b2f595801cc1bc1d1371ad95b12b4b18292598/prisma/seed.js#L1-L2

### 5. Properly use Git for your source version control with an established record of at least 4 days of commits each week from February 19th through April 30th.

### 6. Present a User Interface route or "page" that allows the user to:
1. CREATE a meaningful (at least 5 data fields) resource through a REST endpoint that is stored in the datastore
        https://github.com/QNilsson/DGM4790Node/blob/master/controllers/recipe.controller.js#L12-22 
2. Read or GET meaningful data from 3 different REST endpoints
        https://github.com/QNilsson/DGM4790Node/blob/master/controllers/recipe.controller.js#L4-10
        https://github.com/QNilsson/DGM4790Node/blob/master/controllers/recipe.controller.js#86-96
        https://github.com/QNilsson/DGM4790Node/blob/master/controllers/recipe.controller.js#99-110
3. UPDATE at least 1 portion of meaningful data through the appropriate endpoint
        https://github.com/QNilsson/DGM4790Node/blob/master/controllers/recipe.controller.js#47-65
4. DELETE some resource via the proper endpoint
        https://github.com/QNilsson/DGM4790Node/blob/master/controllers/recipe.controller.js#L68-82



#### Front-End Netlify Link: https://serene-einstein-be8031.netlify.app/recipes
#### Heroku Link for NodeJS Server: https://quinn-node-server.herokuapp.com/recipe
#### Link for Graphql server in progress

## To access startup instructions for NodeJs server, go here:
#### CRUD server Github URL: https://github.com/QNilsson/DGM4790Node

## For startup instructions for Graphql server, go here:
#### Graphql server Github URL: https://github.com/QNilsson/graphql
