/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

import { createHolochainZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import { PROJECTS_ZOME_NAME } from '../../holochainConfig'

/* action creator functions */
const ADD_MEMBER_OF_GOAL = 'add_member_of_goal'
const FETCH_GOAL_MEMBERS = 'fetch_goal_members'
const ARCHIVE_MEMBER_OF_GOAL = 'archive_member_of_goal'

const addMemberOfGoal = instanceId =>
  createHolochainZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    ADD_MEMBER_OF_GOAL
  )
const archiveMemberOfGoal = instanceId =>
  createHolochainZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    ARCHIVE_MEMBER_OF_GOAL
  )
const fetchGoalMembers = instanceId =>
  createHolochainZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    FETCH_GOAL_MEMBERS
  )

export {
  ADD_MEMBER_OF_GOAL,
  FETCH_GOAL_MEMBERS,
  ARCHIVE_MEMBER_OF_GOAL,
  addMemberOfGoal,
  fetchGoalMembers,
  archiveMemberOfGoal,
}
