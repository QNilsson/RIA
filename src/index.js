import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css'
import App from './App';
import * as dotenv from 'dotenv';
import cors from 'cors';
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
 dotenv.config()
//for app to work faster and load offline
//ServiceWorker.unregister();


