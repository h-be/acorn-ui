/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

import { createZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import {
  PROFILES_ZOME_NAME,
  cell_id,
} from '../holochainConfig'

/* action creator functions */

const whoami = createZomeCallAsyncAction(
  cell_id,
  PROFILES_ZOME_NAME,
  'whoami',
  cell_id[1]
)

const createWhoami = createZomeCallAsyncAction(
  cell_id,
  PROFILES_ZOME_NAME,
  'create_whoami',
  cell_id[1]
)

const updateWhoami = createZomeCallAsyncAction(
  cell_id,
  PROFILES_ZOME_NAME,
  'update_whoami',
  cell_id[1]
)

// TODO: remove me
const updateStatus = createZomeCallAsyncAction(
  cell_id,
  PROFILES_ZOME_NAME,
  'update_status',
  cell_id[1]
)

export { whoami, createWhoami, updateWhoami, updateStatus }
