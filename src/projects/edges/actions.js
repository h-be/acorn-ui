/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

import { createZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import { PROJECTS_ZOME_NAME } from '../../holochainConfig'

/* action creator functions */

const PREVIEW_EDGES = 'preview_edges'
const CLEAR_EDGES_PREVIEW = 'clear_edges_preview'
const CREATE_EDGE = 'create_edge'
const UPDATE_EDGE = 'update_edge'
const FETCH_EDGES = 'fetch_edges'
const ARCHIVE_EDGE = 'archive_edge'

const previewEdges = (instanceId, edges) => {
  return {
    type: PREVIEW_EDGES,
    payload: {
      instanceId,
      edges,
    },
  }
}

const clearEdgesPreview = instanceId => {
  return {
    type: CLEAR_EDGES_PREVIEW,
    payload: {
      instanceId,
    },
  }
}

const createEdge = instanceId =>
  createZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    CREATE_EDGE
  )

const updateEdge = instanceId =>
  createZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    UPDATE_EDGE
  )

const fetchEdges = instanceId =>
  createZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    FETCH_EDGES
  )

const archiveEdge = instanceId =>
  createZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    ARCHIVE_EDGE
  )

export {
  PREVIEW_EDGES,
  CLEAR_EDGES_PREVIEW,
  CREATE_EDGE,
  UPDATE_EDGE,
  FETCH_EDGES,
  ARCHIVE_EDGE,
  previewEdges,
  clearEdgesPreview,
  createEdge,
  updateEdge,
  fetchEdges,
  archiveEdge,
}
