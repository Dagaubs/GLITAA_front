import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore, {options} from './configureStore';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
//var setDefaultBrowser = require('set-default-browser');
 
//setDefaultBrowser("chrome");

export const url = "http://localhost:8080";

//const store = configureStore(options);
const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
