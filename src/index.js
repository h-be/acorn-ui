/*
  This file is ENTRY POINT to the entire web application.
  Only code that gets called at some point from this file (via imports or otherwise)
  will get executed in the browser window.
  Try to keep it clean and minimal in this file, and outsource aspects to more
  modular code in separate files, imported here and called.
*/

// Library Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { connect } from '@holochain/hc-web-client'
import { holochainMiddleware } from '@holochain/hc-redux-middleware'

// Local Imports
import {
  DEFAULT_HOLOCHAIN_PORT,
  DEFAULT_HOLOCHAIN_HOST,
} from './holochainConfig'
import acorn from './reducer'
import { fetchAgents } from './agents/actions'
import { fetchGoals } from './goals/actions'
import { fetchEdges } from './edges/actions'
import { fetchGoalMembers } from './goal-members/actions'

import { fetchGoalVotes } from './goal-votes/actions'
import { whoami } from './who-am-i/actions'
import { fetchAgentAddress } from './agent-address/actions'
import App from './routes/App'

// this url should use the same port set up by the Holochain Conductor
const websocketUrl = `ws://${DEFAULT_HOLOCHAIN_HOST}:${DEFAULT_HOLOCHAIN_PORT}`
// attempts to form a websocket (two way messages) connection to a running
// Holochain Conductor
const connectOpts =
  process.env.NODE_ENV === 'development' ? { url: websocketUrl } : undefined
const hcWc = connect(connectOpts)

// holochainMiddleware takes in the hc-web-client websocket connection
// and uses it to facilitate the calls to Holochain
const middleware = [holochainMiddleware(hcWc)]

// This enables the redux-devtools browser extension
// which gives really awesome debugging for apps that use redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// acorn is the top-level reducer. the second argument is custom Holochain middleware
let store = createStore(
  acorn,
  /* preloadedState, */ composeEnhancers(applyMiddleware(...middleware))
)

// dispatch fetch goals, and fetch edges functions to pull in all the existing goals and edges
// on first render
function fetchChangingData() {
  store.dispatch(fetchAgents.create({}))
  store.dispatch(fetchEdges.create({}))
  store.dispatch(fetchGoals.create({}))
  store.dispatch(fetchGoalMembers.create({}))
  store.dispatch(fetchGoalVotes.create({}))
}
fetchChangingData()
// refetch this data every 3 seconds
setInterval(() => {
  fetchChangingData()
}, 3000)
store.dispatch(whoami.create({}))
store.dispatch(fetchAgentAddress.create({}))
/*
  store.subscribe(cb)
  store.getState()
  store.dispatch(action)
*/

// By passing the `store` in as a wrapper around our React component
// we make the state available throughout it
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react')
)
