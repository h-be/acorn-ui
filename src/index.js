/*
  This file is ENTRY POINT to the entire web application.
  Only code that gets called at some point from this file (via imports or otherwise)
  will get executed in the browser window.
  Try to keep it clean and minimal in this file, and outsource aspects to more
  modular code in separate files, imported here and called.
*/

// Library Imports
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { holochainMiddleware } from 'connoropolous-hc-redux-middleware'
import { cellIdToString } from 'connoropolous-hc-redux-middleware/build/main/lib/actionCreator'
import { AppWebsocket } from '@holochain/conductor-api'

// Local Imports
import { TEST_APP_ID, PROFILES_DNA_NAME } from './holochainConfig'
import acorn from './reducer'
import signalsHandlers from './signalsHandlers'
import { setProfilesCellId } from './cells/actions'
import { fetchAgents } from './agents/actions'
import { whoami } from './who-am-i/actions'
import { fetchAgentAddress } from './agent-address/actions'
import App from './routes/App'

// TODO: place this elsewhere
// and make it differentiate between production and
// development modes
const APP_URL_CONFIG = 'ws://localhost:8888'

const middleware = [holochainMiddleware(APP_URL_CONFIG)]

// This enables the redux-devtools browser extension
// which gives really awesome debugging for apps that use redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// acorn is the top-level reducer. the second argument is custom Holochain middleware
let store = createStore(
  acorn,
  /* preloadedState, */ composeEnhancers(applyMiddleware(...middleware))
)

// set up a "signal" or "events" listener, once
// there is a connection to the Holochain Conductor
// hcWebClient.then(({ onSignal }) => {
//   signalsHandlers(store, onSignal)
// })

AppWebsocket.connect(APP_URL_CONFIG).then(async client => {
  const info = await client.appInfo({ app_id: TEST_APP_ID })
  const [cellId, _] = info.cell_data.find(
    ([cellId, dnaName]) => dnaName === PROFILES_DNA_NAME
  )
  const cellIdString = cellIdToString(cellId)
  store.dispatch(setProfilesCellId(cellIdString))
  store.dispatch(fetchAgents.create({ cellIdString, payload: null }))
  store.dispatch(whoami.create({ cellIdString, payload: null }))
  store.dispatch(fetchAgentAddress.create({ cellIdString, payload: null }))
})

// store.dispatch(fetchProjectsDnas.create(null))
// store.dispatch(fetchProjectsInstances.create(null))

// By passing the `store` in as a wrapper around our React component
// we make the state available throughout it
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react')
)
