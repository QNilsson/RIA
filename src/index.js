import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
ReactDOM.render(
	<React.StrictMode>
<BrowserRouter>
<App />
</BrowserRouter>
</React.StrictMode>,
document.getElementById('root'),
)
 registerServiceWorker();
 require('dotenv').config()
//for app to work faster and load offline
//ServiceWorker.unregister();
