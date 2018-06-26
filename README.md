# Redux Intro

## Why Redux?

- As our React app grows, it's a pain to keep passing props down and down and down.
- Our `App.js` file is also growing out of control when two different components need the same data.

Redux makes it so we can pass information directly to where it is needed, instead of passing it through a bunch of components to get to where it needs to go.

Drawing of the `store` reaching out directly to where it is needed.

## Bare Bones React

Let's create our bare bones React App.

```
create-react-app redux-intro
```

Now let's remove everything inside of the `<div>` tags in `App.js`, move `App.js` to a `components/App` folder. Now remove everything except `index.js`, `App.js`, and `registerServiceWorker.js` from the `src` folder.

## Add Redux to Project

Redux has a lot of parts and things going on, but hang on for the ride while we set it up, and then we'll dive into the pieces.

### Install Redux

Redux is a thing unto itself. It's super popular in React, but you can use it with other things too. So we need to install two libraries: `redux` to do the things, and `react-redux` to connect react and redux together.

```
npm install redux react-redux --save
```

### Add Redux to Project

```JSX
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';

// This is creating the store
// The store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    // This is a reducer... we'll talk about it in a minute, hang on for a second
    () => {
        console.log(`Hey!!! I'm a reducer y'all!!!`);
    },
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
```

Woohoo! We added Redux! ...but it's not doing anything yet...

### Provide Redux Store to React App

In order to get Redux to do something, we need to *provide* that nice redux store to our react app. `react-redux` has just the thing for that!

```JSX
import { Provider } from 'react-redux';
```

We want our entire application to have access to the store, so we're going to wrap our entire `<App />` inside of the provider.

```JSX
ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
```

Woot! Now we have access to Redux... but we still haven't had it *DO* anything.

### Connect React Component to Redux

We know that our entire `<App />` has access to our store, so how to we actually use it?

Not every React component needs to be connected to Redux, but for the ones that do, we're going to use `connect` to do it.

For now, the biggest thing the `connect()` function does is it adds `.dispatch()` to `this.props`. `.dispatch` is how we can fire something off in redux (similar to an event). `.dispatch()` requires an object with a property `type`. This object is called an `action`. So this is called *dispatching an action*.

```JSX
import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <div>
        {/* Dispatching an action */}
        <button onClick={() => this.props.dispatch({ type: 'BUTTON_ONE' })}>Button One</button>
      </div>
    );
  }
}

export default connect()(App); // connect is a function... that returns a function! Currying!!
```

We've got a button that logs things!!! Redux is working!!!


## Reducers

A reducer is a function that runs every time an action is dispatched. Right now, we can see that's true by clicking the button. Every time it's clicked our reducer logs something.

Eventually, reducers are going to move to their own files so that this isn't so cluttered, so let's move it to a `const` outside of our `createStore`.

```JSX
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// This is our first reducer
const firstReducer = () => {
    console.log(`Hey!!! I'm a reducer y'all!!!`);
};

// This is creating the store
// The store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    firstReducer
);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
```

Let's create a second reducer and add it to our store. Hold up! If we try this, we get errors like crazy!

```JSX
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

const firstReducer = () => {
    console.log(`Hey!!! I'm a reducer y'all!!!`);
};

const secondReducer = () => {
    console.log(`I'm another reducer y'all!!!`);
};

// The store only accepts one reducer
const storeInstance = createStore(
    firstReducer,
    secondReducer
);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
```

First we get a weird, non-descriptive error:

```
TypeError: enhancer(...) is not a function
```

The real problem is that When you create a store, it can only take one reducer. We're trying to pass it two, and things break when we do this. But we want to reduce so many things! If only there was a way to combine our reducers into one! Redux gives us a way to do that called `combineReducers`!

```JSX
import { createStore, combineReducers } from 'redux';
```

And now we can write

```JSX
const firstReducer = () => {
    console.log(`Hey!!! I'm a reducer y'all!!!`);
};

const secondReducer = () => {
    console.log(`I'm another reducer y'all!!!`);
};

// The store only accepts one reducer
const storeInstance = createStore(
    combineReducers({
        firstReducer,
        secondReducer
    }),
);
```

Now we get a new error! Yay?

```
Uncaught Error: Reducer "firstReducer" returned undefined during initialization.
```

Now that we're using `combineReducers`, it's checking to make sure that our reducers are actually valid reducers. Ours are not. Reducers need to return something. We should start doing is returning a default state. This will make more sense in a second, but for now, know that we need to return something from our reducer. If state is null, let's default it to an empty object:

```JSX
const firstReducer = () => {
    console.log(`Hey!!! I'm a reducer y'all!!!`);
    return {};
};

const secondReducer = () => {
    console.log(`I'm another reducer y'all!!!`);
    return {};
};
```

This is still a little silly. A button that just runs every console log from every reducer? Let's see what Redux provides to our reducers and change it to this:

```JSX
const firstReducer = (state, action) => {
    console.log(`Hey!!! I'm a reducer y'all!!!`);
    return {};
};

const secondReducer = (state, action) => {
    console.log(`I'm another reducer y'all!!!`);
    return {};
};
```

And in `App.js` let's add another button:

```JSX
<button onClick={() => this.props.dispatch({ type: 'BUTTON_ONE' })}>Button One</button>
<button onClick={() => this.props.dispatch({ type: 'BUTTON_TWO' })}>Button Two</button>
```

- Exercise: add a reducer that logs `action`. What is the `action`? Where did it come from? How can you tell which button was clicked from inside of the reducer?