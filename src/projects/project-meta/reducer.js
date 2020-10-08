import _ from 'lodash'
import {
  createProjectMeta,
  fetchProjectMetas,
  fetchProjectMeta,
  updateProjectMeta,
  archiveProjectMeta,
} from './actions'
import { isCrud, crudReducer } from '../../crudRedux'

const defaultState = {}

export default function (state = defaultState, action) {
  const { payload, type } = action

  // start out by checking whether this a standard CRUD operation
  if (
    isCrud(
      action,
      createProjectMeta,
      fetchProjectMetas,
      updateProjectMeta,
      archiveProjectMeta
    )
  ) {
    return crudReducer(
      state,
      action,
      createProjectMeta,
      fetchProjectMetas,
      updateProjectMeta,
      archiveProjectMeta
    )
  }

  switch (type) {
    case fetchProjectMeta.success().type:
      const cellId = action.meta.cell_id
      return {
        ...state,
        [cellId]: {
          ...payload.entry,
          address: payload.address,
        },
      }
    // DEFAULT
    default:
      return state
  }
}
