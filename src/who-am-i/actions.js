/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

import { createHolochainZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import { PROFILES_INSTANCE_NAME, PROFILES_ZOME_NAME } from '../holochainConfig'

/* action creator functions */

const whoami = createHolochainZomeCallAsyncAction(
  PROFILES_INSTANCE_NAME,
  PROFILES_ZOME_NAME,
  'whoami'
)

const createWhoami = createHolochainZomeCallAsyncAction(
  PROFILES_INSTANCE_NAME,
  PROFILES_ZOME_NAME,
  'create_whoami'
)

const updateWhoami = createHolochainZomeCallAsyncAction(
  PROFILES_INSTANCE_NAME,
  PROFILES_ZOME_NAME,
  'update_whoami'
)
const updateStatus = createHolochainZomeCallAsyncAction(
  PROFILES_INSTANCE_NAME,
  PROFILES_ZOME_NAME,
  'update_status'
)

export { whoami, createWhoami, updateWhoami, updateStatus }
