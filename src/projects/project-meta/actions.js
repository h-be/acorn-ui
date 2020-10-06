import { createZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import { PROJECTS_ZOME_NAME } from '../../holochainConfig'

const CREATE_PROJECT_META = 'create_project_meta'
const UPDATE_PROJECT_META = 'update_project_meta'
const FETCH_PROJECT_META = 'fetch_project_meta'

const createProjectMeta = instanceId =>
  createZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    CREATE_PROJECT_META
  )

const updateProjectMeta = instanceId =>
  createZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    UPDATE_PROJECT_META
  )

const fetchProjectMeta = instanceId =>
  createZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    FETCH_PROJECT_META
  )

export {
  CREATE_PROJECT_META,
  UPDATE_PROJECT_META,
  FETCH_PROJECT_META,
  createProjectMeta,
  updateProjectMeta,
  fetchProjectMeta,
}
