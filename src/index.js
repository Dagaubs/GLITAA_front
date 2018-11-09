import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore, {options} from './configureStore';
import { Provider } from 'react-redux';

export const url = "http://localhost:8080";

//const store = configureStore(options);
const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
            <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
