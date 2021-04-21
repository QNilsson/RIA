import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import App from './App';
import * as dotenv from 'dotenv';
// import cors from 'cors';
// import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql/',
	cache: new InMemoryCache(),
  })
  
ReactDOM.render (
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}><App /></ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById ('root')
);
serviceWorker.unregister ();
dotenv.config ();
//for app to work faster and load offline
//ServiceWorker.unregister();
