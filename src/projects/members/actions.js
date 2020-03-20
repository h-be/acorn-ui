/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

import { createHolochainZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import { PROJECTS_ZOME_NAME } from '../../holochainConfig'

// SET because it could be brand new, or an update, but treat it the same way
const SET_MEMBER = 'set_member'
const FETCH_MEMBERS = 'fetch_members'

/* action creator functions */

const setMember = (instanceId, member) => {
  return {
    type: SET_MEMBER,
    payload: {
      instanceId,
      member,
    },
  }
}

const fetchMembers = instanceId =>
  createHolochainZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    FETCH_MEMBERS
  )

export { SET_MEMBER, FETCH_MEMBERS, setMember, fetchMembers }
