import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import configureStore, {options} from './configureStore';
import { Provider } from 'react-redux';

const store = configureStore(options);
ReactDOM.render(
    <Provider store={store}>
            <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();
