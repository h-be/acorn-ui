import { PROJECTS_ZOME_NAME } from '../holochainConfig'

const typeSuccess = (actionType, fnName) =>
  actionType.endsWith(`${PROJECTS_ZOME_NAME}/${fnName}_SUCCESS`)

const typeFailure = (actionType, fnName) =>
  actionType.endsWith(`${PROJECTS_ZOME_NAME}/${fnName}_FAILURE`)

const instanceIdFromActionType = actionType => actionType.split('/')[0]

export { typeSuccess, typeFailure, instanceIdFromActionType }
