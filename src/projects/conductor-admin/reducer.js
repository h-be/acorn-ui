import _ from 'lodash'
import { fetchProjectsDnas, fetchProjectsInstances } from './actions'

const defaultDnasState = {}
const defaultInstancesState = {}

function dnas(state = defaultDnasState, action) {
  const { payload, type } = action
  switch (type) {
    case fetchProjectsDnas.success().type:
      // rename 'hash' to 'address'
      const mapped = payload.map(r => {
        return {
          id: r.id,
          address: r.hash, // for some reason its called 'hash' here instead of 'address'
        }
      })
      // mapped is [ { key: val, address: 'asdfy' }, ...]
      const newDnaVals = _.keyBy(mapped, 'id')
      // combines pre-existing values of the object with new values from
      // Holochain fetch
      return {
        ...state,
        ...newDnaVals,
      }
    default:
      return state
  }
}

function instances(state = defaultInstancesState, action) {
  const { payload, type } = action
  switch (type) {
    case fetchProjectsInstances.success().type:
      // filter out non-projects based instances first
      const filteredForProjectDnas = payload.filter(instance =>
        instance.id.startsWith('_acorn_projects_instance_')
      )
      const newInstanceVals = _.keyBy(filteredForProjectDnas, 'id')
      // combines pre-existing values of the object with new values from
      // Holochain fetch
      return {
        ...state,
        ...newInstanceVals,
      }
    default:
      return state
  }
}

export { dnas, instances }
