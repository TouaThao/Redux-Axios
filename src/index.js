import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

const firstReducer = (state, action) => {
    console.log(`Hey!!! I'm a reducer.`, action);
    return {};
}

const secondReducer = (state, action) => {
    console.log(`Second reducer.`);
    return {};
}

const storeInstance = createStore(
    // This is a reducer. It's called when the page loads or
    // dispatch is called.
    combineReducers({
        firstReducer,
        secondReducer
    })
);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
