/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

import { createHolochainZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import { PROJECTS_ZOME_NAME } from '../../holochainConfig'

/* action creator functions */

const CREATE_EDGE = 'create_edge'
const FETCH_EDGES = 'fetch_edges'
const ARCHIVE_EDGE = 'archive_edge'

const createEdge = instanceId =>
  createHolochainZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    CREATE_EDGE
  )

const fetchEdges = instanceId =>
  createHolochainZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    FETCH_EDGES
  )

const archiveEdge = instanceId =>
  createHolochainZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    ARCHIVE_EDGE
  )

export {
  CREATE_EDGE,
  FETCH_EDGES,
  ARCHIVE_EDGE,
  createEdge,
  fetchEdges,
  archiveEdge,
}
