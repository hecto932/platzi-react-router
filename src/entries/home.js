import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Map as map } from 'immutable'
import reducer from '../reducers/index';

import Home from '../pages/components/home';
import Videos from '../pages/containers/videos';
import Contact from '../pages/components/contact';
import NotFound from '../pages/components/not-found';

import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../pages/components/header';

const logger_ = ({ getState, dispatch }) => next => action => {
  console.log('vamos a enviar esta accion', action)
  const value = next(action)
  console.log('este es mi nuevo estado', getState().toJS())
  return value
}

const store = createStore(
  reducer,
  map({}),
  composeWithDevTools(
    applyMiddleware(
      logger,
      thunk
    )
  )
)

console.log(store.getState())

const homeContainer = document.getElementById('home-container')


render(
  <BrowserRouter>
    <Provider store={store}>
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/videos" component={Videos} />
          <Redirect from="/v" to="/videos" />
          <Route exact path="/contacto" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    </Provider>
  </BrowserRouter>
  , homeContainer
)