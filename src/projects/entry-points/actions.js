/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

import { createHolochainZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import { PROJECTS_ZOME_NAME } from '../../holochainConfig'

// Function Names, as per acorn-hc
const CREATE_ENTRY_POINT = 'create_entry_point'
const FETCH_ENTRY_POINTS = 'fetch_entry_points'
const ARCHIVE_ENTRY_POINT = 'archive_entry_point'

/* action creator functions */

const createEntryPoint = instanceId =>
  createHolochainZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    CREATE_ENTRY_POINT
  )

const fetchEntryPoints = instanceId =>
  createHolochainZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    FETCH_ENTRY_POINTS
  )

const archiveEntryPoint = instanceId =>
  createHolochainZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    ARCHIVE_ENTRY_POINT
  )

export {
  CREATE_ENTRY_POINT,
  FETCH_ENTRY_POINTS,
  ARCHIVE_ENTRY_POINT,
  createEntryPoint,
  fetchEntryPoints,
  archiveEntryPoint,
}
