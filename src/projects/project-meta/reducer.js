import _ from 'lodash'
import {
  createProjectMeta,
  fetchProjectMetas,
  fetchProjectMeta,
  updateProjectMeta,
  archiveProjectMeta,
} from './actions'
// import { isCrud, crudReducer } from '../../crudRedux'

const defaultState = {}

export default function (state = defaultState, action) {
  const { payload, type } = action
  switch (type) {
    // act optimistically, because holochain is taking
    // 18 seconds for this call to respond
    case 'acorn_projects/create_project_meta':
      return {
        ...state,
        [action.meta.cellIdString]: {
          ...payload,
          address: 'temp' + Math.random(),
        },
      }
    case createProjectMeta.success().type:
    case fetchProjectMeta.success().type:
    case updateProjectMeta.success().type:
      return {
        ...state,
        [action.meta.cellIdString]: {
          ...payload.entry,
          address: payload.address,
        },
      }
    default:
      return state
  }
}
