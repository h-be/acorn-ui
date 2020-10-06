/*
  There should be an actions.js file in every
  feature folder, and it should start with a list
  of constants defining all the types of actions
  that can be taken within that feature.
*/

import { createZomeCallAsyncAction } from 'connoropolous-hc-redux-middleware'

import { PROJECTS_ZOME_NAME } from '../../holochainConfig'

/* action creator functions */

const CREATE_GOAL = 'create_goal'
const FETCH_GOALS = 'fetch_goals'
const ARCHIVE_GOAL = 'archive_goal'
const UPDATE_GOAL = 'update_goal'

const createGoal = instanceId =>
  createZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    CREATE_GOAL
  )
const fetchGoals = instanceId =>
  createZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    FETCH_GOALS
  )
const archiveGoal = instanceId =>
  createZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    ARCHIVE_GOAL
  )
const updateGoal = instanceId =>
  createZomeCallAsyncAction(
    instanceId,
    PROJECTS_ZOME_NAME,
    UPDATE_GOAL
  )

export {
  CREATE_GOAL,
  FETCH_GOALS,
  ARCHIVE_GOAL,
  UPDATE_GOAL,
  createGoal,
  fetchGoals,
  archiveGoal,
  updateGoal,
}
